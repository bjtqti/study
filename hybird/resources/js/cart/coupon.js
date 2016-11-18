// JavaScript Document
// @author <278500368@qq.com>
var globalData = {};


/**
 * 绑定事件
 */
function bindEvent(){
	$('.box').on('click',function(event){
		var target = event.target;
		switch(target.getAttribute('data-event')){
			case 'submit':
				handleSubmit();
				break;
			case 'check':
				target = target.querySelector('input');
				handleCheck(target.value);
				break;
			case 'cancel':
				handleCancel();
				break;
			default:
				break;
		}
	});
}

/**
 * 选择券
 */
function handleCheck(couponNo){
	globalData.couponNo = couponNo;
}

/**
 * 不使用券
 */
function handleCancel(){
	globalData.couponNo = false;
}

/**
 * 提交用券
 */
function handleSubmit(){
	if(globalData.lock){
		return;
	}
	globalData.lock = true;
	var couponNo = globalData.couponNo,
	    locationUrl = baseRoot+'/cart/confirmOrder.h?singleCodes='+singleCodes+'&qtys='+qtys;
	if(memberDlvAddressId){
		locationUrl += '&memberDlvAddressId='+memberDlvAddressId;
	}
	if(couponNo){
		location.href=locationUrl+'&couponNo='+couponNo;
	}else{
		location.href=locationUrl+'&userCouponFlag=true';
	}
}

function listHeight(){
	var winH = $(window).height();
	var jiesuan_fix = $(".jiesuan_fix").height();
	$(".box").css({"height":winH - jiesuan_fix });
}

//调用
$(document).ready(function(){
	bindEvent();
	listHeight();
});