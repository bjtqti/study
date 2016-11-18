// JavaScript Document

$(document).ready(function(){
	selectCoupon();
	lineSet(".nav-btn");
});

function selectCoupon(){
	
	$(".checkboxRed input[checked=checked]").parents(".coupon").addClass("sel-check");
	
	$(".coupon").on("click",function(){
		$(".coupon").removeClass("sel-check");
		$(this).addClass("sel-check");
		$(this).find(".checkboxRed input").attr("checked",true);
	});
}
