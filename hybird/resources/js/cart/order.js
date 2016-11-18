
// JavaScript Document
$(document).ready(function(){
	listHeight();
	bindEvent();
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var jiesuan_fix = $(".jiesuan_fix").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - jiesuan_fix });
}
/**
 * @author <278500368@qq.com>
 */
function bindEvent(){
	$('#submit').on('click',function(){
		if(hasAddress){
			this.className='fr dis';
			createOrderInfo();
		}else{
			Dialog.tips('请填写收货地址');
		}
	})
}

/**
 * 跳转到收货地址页面
 * @author <278500368@qq.com>
 */
function jumpToAddress(type){
	var query = location.search;
	//var backUrl=encodeURIComponent(url);
	if(type==='add'){
		window.location.href=baseRoot+'/address/toAdd.h'+query;
	}else{
		window.location.href=baseRoot+'/address/addressList.h'+query;
	}
}

/**
 * 生成订单信息
 * @author <278500368@qq.com>
 */
function createOrderInfo(){
    var postData = {
    	singleCodes:singleCodes,
    	qtys:qtys,
    	paymentFee:paymentFee,
    	memberDlvAddressId:memberDlvAddressId,
    	token:token
    };
	if(couponNo){
		postData.couponNo = couponNo;
	}else if(userCouponFlag){
		postData.userCouponFlag = userCouponFlag
	}
	Dialog.lock.show('正在提交,请稍候...');
    $.ajax({
	    url:baseRoot+'/order/createOrder.h',
	    type:'POST',
	    dataType:'json',
	    data:postData
	}).then(function(result){
    	//console.log(result)
		if(result.returnCode==0){
			getOrderInfo(result.object);
		}else{
			$('#submit').attr('class','fr red');
    		Dialog.lock.hide();
			new Dialog(result.message,{
			    title:'订单提交失败',
			    onlyConfirm:true
			});
		}
    },function(){
    	window.location.href=baseRoot+'/500.h';
    });
}

/**
 *  获取订单信息
 * @param orderNo 订单号
 * @author <278500368@qq.com>
 */
function getOrderInfo(orderNo){
	$.ajax({
		type : "POST",
		url : baseRoot+"/pay.h",
		dataType : "json",
		data : {
			orderNo : orderNo
		}
	}).then(function(data) {
		if(data.returnCode===0){
			handleSubmit(data.object);
		}else {
			$('#submit').attr('class','fr red');
			Dialog.lock.hide();
			new Dialog('订单提交失败,请稍后再试！',{
			    onlyConfirm:true
			});
		}
	},function(res){
		window.location.href=baseRoot+'/500.h';
	});
}

/**
 *  POST方式提交给支付页
 * @param data
 * @author <278500368@qq.com>
 */
function handleSubmit(data){
	var form = document.createElement('form');
	var keys = ['appId','openId','message','channel','terminalType','t','h'];
	keys.forEach(function(k){
		var input = document.createElement('input');
		input.name=k;
		input.value = data[k];
		form.appendChild(input);
	});
	form.action=data.payurl;
	form.method='POST';
	form.submit();
}

