// JavaScript Document
$(document).ready(function(){
	listHeight();
	white_bgg();
	benefit_null();
	space();
//	screening();
//	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - footH});
}

function white_bgg(){
	$(document).ready(function(){
		$(".one-shop").find(".one-goods:last").append("<div class='white_bg'></div>");
		$(".one-shop").find(".one-goods:first .white_bg").css("top","6.2rem");
	})
	
}


//购物车结算
// 数量减
  $(".minus").click(function() {
    var t = $(this).parent().find('.am-num-text');
    t.val(parseInt(t.val()) - 1);
    if (t.val() <= 1) {
      t.val(1);
      $(this).parents(".one-goods").find(".minus").css({'background':'#fff url(images/shopping_trolley/jians.png) no-repeat center center','background-size':'40% 5%'});
    }
    TotalPrice();
  });
  // 数量加
  $(".plus").click(function() {
    var t = $(this).parent().find('.am-num-text');
    t.val(parseInt(t.val()) + 1);
    if (t.val() <= 1) {
      t.val(1);
      $(this).parents(".one-goods").find(".minus").css({'background':'#fff url(images/shopping_trolley/jians.png) no-repeat center center','background-size':'40% 5%'});
    }if(t.val() > 1){
	  $(this).parents(".one-goods").find(".minus").css({'background':'#fff url(images/shopping_trolley/jianb.png) no-repeat center center','background-size':"40% 5%"});
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

//删除提示
$(document).ready(function(){
		doubleBtn();
		closePop();
	});
	
	/* 弹出框双按钮 */
	function doubleBtn(){
		$(".delete").click(function(){
			$(".pop .con").hide();
			$(".pop .con_2").show();
			$(".pop").show();
			closePop();
		})
	}

	function closePop(){
		$(".pop_btn a").on("click",function(){
			$(".pop").hide();
		});
	}

function benefit_null(){
	var activity_hide=$(".activity_hide");
	var activity=$(".activity").hasClass("activity_hide");
	if(activity){
		$(activity_hide).parents(".one-shop").find(".one-goods").css("background","#fff");
	}
}

function space(){
	$(".one-shop").find(".one-goods:first").css("padding-top","1.2rem");
	$(".one-shop").find(".one-goods:last").css("padding-bottom","1.2rem");
	$(".activity").parents(".one-shop").find(".line").css({'background':'url(images/shopping_trolley/gwc_line.png) repeat-y 2.2rem top','background-size':'0.4%'});
}

//限制商品标题字数
//$(document).ready(function(){
//	$(".goods_info a").each(function(){
//		var maxwidth=21;
//		if($(this).text().length>maxwidth){
//		$(this).text($(this).text().substring(0,maxwidth));
//		$(this).html($(this).html()+"…");
//		}
//	});
//});

//QQ内置浏览器BOX padding-bottom：3rem，微信为0
$(document).ready(function(){
	var is_mqq=navigator.userAgent.indexOf('MQQBrowser') !== -1;
	if(is_mqq){
		$(".box").css("padding-bottom","3rem");
	}
	var ua = navigator.userAgent.toLowerCase();  
	if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		$(".box").css("padding-bottom","0rem");
	}
})


















