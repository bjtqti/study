// JavaScript Document
$(document).ready(function(){
	listHeight();
	order_tc();
//	coupon_bg();
//	screening();
//	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var jiesuan_fix = $(".jiesuan_fix").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - jiesuan_fix });
}

function order_tc(){
	$(".tj_order").click(function(){
		$(".order_tc").show();
		$(".order_tc_bg").show();
	})
	$(".order_tc .sure_btn").click(function(){
		$(".order_tc").hide();
		$(".order_tc_bg").hide();
	})
}

//function coupon_bg(){
//	var coupon_input=$(".coupon_btn").attr("checked");
//	if(coupon_input){
//		$(this).parents(".coupon_list li").css({'background':'url(images/jiesuan/coupon_bg2.png) no-repeat center center','background-size':'100% 100%'});
//	}
//}





















