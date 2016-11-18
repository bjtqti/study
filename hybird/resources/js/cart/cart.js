

function listHeight() {
  var winH = $(window).height();
  var footH = $("footer").height();
  $(".box").css({
    "height": winH - footH
  });
}

function space() {
  var shop = $(".one-shop");
  shop.find(".one-goods:first").css("padding-top", "1.6rem");
  shop.find(".one-goods:last").css("padding-bottom", "1.6rem");
}

/**
 * 绑定事件
 * @author <278500368@qq.com>
 */
function bindEvent() {
  $('.one-shop').on('click', function(e) {
    var target = e.target;
    var eventType = target.getAttribute('data-event');
    switch (eventType) {
      case 'del':
        new Dialog('确定删除该商品吗？',{
          onConfrim:function(){
            delGoodsFromCart(target);
          }
        });
        break;
      case 'plus':
        plusGoodsBuyed(target);
        break;
      case 'minus':
        minusGoodsBuyed(target);
        break;
      case 'check-cart':
        handleCheckCart(target);
        break;
      case 'check-goods':
        handleCheckGoods(target);
        break;
      case 'submit':
        handleSubmit(target);
        break;
      case 'disabled':
        handleDisabled();
        break;
      default:
        //console.log(target)
        break;
    }
  });
}
/**
 * 从购物车中删除一件商品
 * @author <278500368@qq.com>
 */
function delGoodsFromCart(target) {
  var node = findNodeByClass(target,'one-goods'),
      cart = node.getAttribute('data-cart'),
      arr = cart.split(',');
  requestAjax('/cart/deleteCartById.h',{
    cartId:arr[0],
    singleCode:arr[1]
  },function(res){
    location.reload();
  });
}
/**
 * 购物车加数量
 * @author <278500368@qq.com>
 */
function plusGoodsBuyed(target){
  var data = target.parentNode.getAttribute('data-num');
  data = data.split(',');
  var buyLimit = data[0],
      stockCount =  parseInt(data[2])||0,
      addCount = parseInt(data[3])||1,
      singleCode=data[4],
      input = $(target).parent().find('input'),
      buyed = input.val();
      nextBuyed = parseInt(buyed) + addCount;
  if(nextBuyed > stockCount){
    Dialog.tips('超出库存数');
    target.className='plus-disable';
    return;
  }
  if(nextBuyed > buyLimit){
    Dialog.tips('超出限购数');
    target.className='plus-disable';
    return;
  }
  target.className='plus';
  target.parentNode.children[0].className='minus';
  input.val(nextBuyed);
  var node = findNodeByClass(target,'one-shop');
  data = findCodeByShop(node);
  delayRequest(data,singleCode,nextBuyed,node);
}

/**
 * 购物车减数量
 * @author <278500368@qq.com>
 */
function minusGoodsBuyed(target){
  var data = target.parentNode.getAttribute('data-num');
  data = data.split(',');
  var minBuyCount = parseInt(data[1])||1,
      addCount = parseInt(data[3])||1,
      singleCode=data[4],
      input = $(target).parent().find('input'),
      buyed = input.val(),
      nextBuyed = parseInt(buyed) - addCount;
  if(nextBuyed < minBuyCount){
    Dialog.tips('不能低于起购数');
    target.className='minus-disable';
    return;
  }
  target.className='minus';
  target.parentNode.children[2].className='plus';
  input.val(nextBuyed);
  var node = findNodeByClass(target,'one-shop');
  data = findCodeByShop(node);
  delayRequest(data,singleCode,nextBuyed,node);
}

/**
 * ajax
 * @author <278500368@qq.com>
 */
function requestAjax(url,data,fn){
  $.ajax({
    url:baseRoot+url,
    type:'POST',
    dataType:'json',
    data:data,
    success:function(result){
      fn&&fn(result);
    }
  });
}

/**
 * 延后发出请求
 * 默认为500ms
 * @author <278500368@qq.com>
 */
function delayRequest(data,singleCode,buyed,node){
  if(!data.codes||!data.buyeds){
    return;
  }
  if(!delayRequest.stack){
    delayRequest.stack=[];
  }
  var stack = delayRequest.stack;
  var timerId=setTimeout(function(){
      stack.shift();
      if(stack.length===0){
          requestAjax('/cart/cartProductChange.h',{
            singleCodes:data.codes,
            singleQty:data.buyeds
          },function(res){
            updateCartInfo(node,res)
          });
          requestAjax('/cart/saveOrUpdateCart.h',{
            singleCode:singleCode,
            qty:buyed,
            figureUpFlag:false
          });
      }
  },500);
  stack.push(timerId);
}

/**
 * 查找具有指定样式的节点
 * @author <278500368@qq.com>
 */
function findNodeByClass(target,className){
  while (target.className !== 'box') {
    if(target.className===className){
      return target;
    }
    target = target.parentNode;
  }
  return target;
}

/**
 * 遍历当前购物车下的code和数量
 * @author <278500368@qq.com>
 */
function findCodeByShop(target){
  var codes = [];
  var buyeds = [];
  $(target).find('.one-goods').each(function(i,item){
    if(!item.querySelector('input').checked){
      return;
    }
    var data = item.getAttribute('data-cart').split(',');
    var value = $(item).find('input').eq(1).val();
    codes.push(data[1]);
    buyeds.push(value);
  });
  return {
    codes:codes.join(','),
    buyeds:buyeds.join(',')
  }
}

/**
 * 购物车全选按钮
 */
function handleCheckCart(target){
  var isChecked = target.checked;
  var node = findNodeByClass(target,'one-shop');
  $(node).find('.goods-check').each(function(i,item){
    item.checked = isChecked;
  });
  if(isChecked){
    var data = findCodeByShop(node);
    requestAjax('/cart/cartProductChange.h',{
      singleCodes:data.codes,
      singleQty:data.buyeds
    },function(res){
      updateCartInfo(node,res)
    });
  }else{
    updateCartInfo(node,null);
  }
}

/**
 * 商品选择按钮
 * @author <278500368@qq.com>
 */
function handleCheckGoods(target){
  var isChecked = target.checked,
      node = findNodeByClass(target,'one-shop'),
      goods = node.querySelectorAll('.one-goods');
  if(goods.length===1){
    node.querySelector('.goods-check').checked=isChecked;
  }
  var data = findCodeByShop(node);
  requestAjax('/cart/cartProductChange.h',{
    singleCodes:data.codes,
    singleQty:data.buyeds
  },function(res){
    updateCartInfo(node,res)
  });
}

/**
 *  更新购物车结算信息
 * @author <278500368@qq.com>
 */
function updateCartInfo(target,result){
  //console.log(target,result)
  var amountNode = $(target).children().last(),
      submitNode = amountNode.find('.jiesuan_btn'),
      priceNode = amountNode.find('.shop-total-amount');
  if(!result || !result.object){
    priceNode.text('0.00');
    submitNode.attr('data-event','disabled');
  }else{
    var totalPrice = formatPrice(result.object.salesTotalFee);
    priceNode.text(totalPrice);
    submitNode.attr('data-event','submit');
  }
}
 
/**
 *  结算按钮
 * @author <278500368@qq.com>
 */
function handleSubmit(target){
  Dialog.lock.show();
  var node = findNodeByClass(target,'one-shop');
  if($(target).parent().find('.shop-total-amount').text()==='0.00'){
    Dialog.tips('商品信息已过期');
    return false;
  }
  data = findCodeByShop(node);
  location.href=baseRoot+'/cart/confirmOrder.h?singleCodes='+data.codes+'&qtys='+data.buyeds;
}

/**
 * 禁用提交按钮
 */
function handleDisabled(){
  Dialog.tips('没有钩选商品');
}

// JavaScript Document
$(document).ready(function() {
  listHeight();
  space();
  bindEvent();
});