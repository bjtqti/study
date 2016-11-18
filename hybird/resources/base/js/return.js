// JavaScript Document
$(document).ready(function(){
	listHeight();
	space();
	goods_number();
	reason_select();
	more_goods();
	input_null();
//	screening();
//	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var foot_fix=$(".return_fix").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - foot_fix });
}

//购物车结算
// 数量减
  $(".minus").click(function() {
    var t = $(this).parent().find('.am-num-text');
    t.val(parseInt(t.val()) - 1);
    if (t.val() <= 1) {
      t.val(1);
      $(this).parents(".one-goods").find(".minus").css({'background':'#fff url('+baseRoot+'/resources/base/images/shopping_trolley/jians.png) no-repeat center center','background-size':'40% 5%'});
    }
    TotalPrice();
  });
  // 数量加
  $(".plus").click(function() {
	  
    var t = $(this).parent().find('.am-num-text');
    var returnNumber = $(this).parent().find('#returnNumber');
    if(t.val() == returnNumber.val()){
    	Dialog.tips('申请退货数量不得超过最大可退数量');
    	return;
    }
    t.val(parseInt(t.val()) + 1);
    
    //不能超过最大可退数量
    if (t.val() <= 1) {
      t.val(1);
      $(this).parents(".one-goods").find(".minus").css({'background':'#fff url('+baseRoot+'/resources/base/images/shopping_trolley/jians.png) no-repeat center center','background-size':'40% 5%'});
    }if(t.val() > 1){
	  $(this).parents(".one-goods").find(".minus").css({'background':'#fff url('+baseRoot+'/resources/base/images/shopping_trolley/jianb.png) no-repeat center center','background-size':"40% 5%"});
	}
    TotalPrice();
  });
  // 点击商品按钮
  $(".GoodsCheck").click(function() {
    var goods = $(this).closest(".one-shop").find(".GoodsCheck"); //获取本店铺的所有商品
    var goodsC = $(this).closest(".one-shop").find(".GoodsCheck:checked"); //获取本店铺所有被选中的商品
    var Shops = $(this).closest(".one-shop").find(".ShopCheck"); //获取本店铺的全选按钮
    if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
      Shops.prop('checked', true); //店铺全选按钮被选中
      if ($(".ShopCheck").length == $(".ShopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
        $("#AllCheck").prop('checked', true); //全选按钮被选中
        TotalPrice();
      } else {
        $("#AllCheck").prop('checked', false); //else全选按钮不被选中 
        TotalPrice();
      }
    } else { //如果选中的商品不等于所有商品
      Shops.prop('checked', false); //店铺全选按钮不被选中
      $("#AllCheck").prop('checked', false); //全选按钮也不被选中
      // 计算
      TotalPrice();
      // 计算
    }
  });
  // 点击店铺按钮
  $(".ShopCheck").change(function() {
    if ($(this).prop("checked") == true) { //如果店铺按钮被选中
      $(this).parents(".one-shop").find(".goods-check").prop('checked', true); //店铺内的所有商品按钮也被选中
      if ($(".ShopCheck").length == $(".ShopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
        $("#AllCheck").prop('checked', true); //全选按钮被选中
        TotalPrice();
      } else {
        $("#AllCheck").prop('checked', false); //else全选按钮不被选中
        TotalPrice();
      }
    } else { //如果店铺按钮不被选中
      $(this).parents(".one-shop").find(".goods-check").prop('checked', false); //店铺内的所有商品也不被全选
      $("#AllCheck").prop('checked', false); //全选按钮也不被选中
      TotalPrice();
    }
  });
  // 点击全选按钮
  $("#AllCheck").click(function() {
    if ($(this).prop("checked") == true) { //如果全选按钮被选中
      $(".goods-check").prop('checked', true); //所有按钮都被选中
      TotalPrice();
    } else {
      $(".goods-check").prop('checked', false); //else所有按钮不全选
      TotalPrice();
    }
    $(".ShopCheck").change(); //执行店铺全选的操作
  });

  function TotalPrice() {
    var allprice = 0; //总价
    $(".one-shop").each(function() { //循环每个店铺
      var oprice = 0; //店铺总价
      $(this).find(".GoodsCheck").each(function() { //循环店铺里面的商品
        if ($(this).is(":checked")) { //如果该商品被选中
          var num = parseInt($(this).parents(".one-goods").find(".am-num-text").val()); //得到商品的数量
          var price = parseFloat($(this).parents(".one-goods").find(".GoodsPrice").text()); //得到商品的单价
          var total = price * num; //计算单个商品的总价
          oprice += total; //计算该店铺的总价
        }
        $(this).closest(".one-shop").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
      });
      var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个店铺的总价
      allprice += oneprice; //计算所有店铺的总价
    });
    $("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
  }

function space(){
	$(".box").find(".one-shop:first").css("margin-top","0");
}
function goods_number(){
	$(".one-goods .goods-check").click(function(){
		var ss=$(".one-goods .goods-check:checked").length;
		$(".return_fix em span").html(ss);
	});
	$(".shop-total .goods-check").click(function(){
		var checked=$(".shop-total .goods-check").attr("checked");
		var ss2=$(".one-goods").length;
		if(checked){
			
			$(".return_fix em span").html(ss2);
		}else{
			$(".return_fix em span").html("0");
		}		
	});	
}

function reason_select(){
	$(".reason_list dd select").click(function(){
		$(this).toggleClass("select");
	})
}

function more_goods(){
//	$(".return_list_more").click(function(){
//		var hide=$(".return_goods").find(".return_list_hide").is(":hidden");
//		if(hide){
//			$(this).parent(".return_goods").find(".return_list_more em").html("收起商品");
//			$(this).parent(".return_goods").find(".return_list_more em").css({"background":"url(images/down-icon2.png) no-repeat right center","background-size":"20%"});
//			$(this).parent(".return_goods").find(".return_list_hide").fadeIn();
//		}else{
//			$(this).parent(".return_goods").find(".return_list_more em").html("显示全部");
//			$(this).parent(".return_goods").find(".return_list_more em").css({"background":"url(images/down-icon.png) no-repeat right center","background-size":"20%"});
//			$(this).parent(".return_goods").find(".return_list_hide").fadeOut();
//		}
//	})
	
	$(".return_list_more").click(function(){
		var hide=$(this).parents(".return_goods").find(".return_list_hide").is(":hidden");
		switch(hide){
			case true:
				$(this).parents(".return_goods").find(".return_list_more em").html("收起商品");
				$(this).parents(".return_goods").find(".return_list_more em").css({"background":"url(images/down-icon2.png) no-repeat right center","background-size":"20%"});
				$(this).parents(".return_goods").find(".return_list_hide").fadeIn();
				break;
			case false:
				$(this).parents(".return_goods").find(".return_list_more em").html("显示全部");
				$(this).parents(".return_goods").find(".return_list_more em").css({"background":"url(images/down-icon.png) no-repeat right center","background-size":"20%"});
				$(this).parents(".return_goods").find(".return_list_hide").fadeOut();
				break;
		}
	})
}

function input_null(){
	var sttt=$(".logistics_number").val();
	$(".logistics_number").focus(function(){
		$(".logistics_number_del").fadeIn();
	})
	$(".logistics_number").blur(function(){
		$(".logistics_number_del").fadeOut();
	})
	
	$(".logistics_number_del").click(function(){
		$(".logistics_number").attr("value","");
	});
	
}








