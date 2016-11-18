// JavaScript Document
$(document).ready(function(){
	listHeight();
	bindEvent();
	hightlight(orderStatus)
//	screening();
//	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var foot_fix=$(".foot_fix").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - foot_fix });
}
 
/**
 *  立即支付
 * @param orderNo 订单号
 * @author <278500368@qq.com>
 */
function toPay(orderNo){
	Dialog.lock.show('正在提交订单,请稍候...');
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
			Dialog.lock.hide();
			new Dialog('订单提交失败,请稍后再试！',{
			    onlyConfirm:true
			});
		}
	},function(res) {
		window.location.href=baseRoot+'/500.h';
	});
}

/**
 * 确认收货
 * @author <278500368@qq.com>
 */
function toConfirm(orderNo){
	new Dialog('确定收货吗？',{
      	onConfrim:function(){
      		Dialog.lock.show('正在确认,请稍候...');
			$.ajax({
				type : "POST",
				url : baseRoot+"/order/orderDelivery.h",
				dataType : "json",
				data : {
					orderNo : orderNo
				}
			}).then(function(data) {
				if(data.returnCode===0){
					window.location.reload();
				}else {
					Dialog.lock.hide();
					new Dialog(data.message,{
					    onlyConfirm:true
					});
				}
			},function(res) {
				window.location.href=baseRoot+'/500.h';
			});
      	}
    });
}

/**
 *  提交给支付页
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

/**
 *  取消订单
 * @param orderNo 订单号
 * @author <278500368@qq.com>
 */
function cancel(orderNo){
	new Dialog('确定取消该订单吗？',{
      	onConfrim:function(){
      		Dialog.lock.show('正在取消,请稍候...');
			$.ajax({
				type : "POST",
				url : baseRoot+"/order/cancel.h",
				dataType : "json",
				data : {
					orderNo : orderNo
				}
			}).then(function(data) {
				if(data.returnCode===0){
					window.location.reload();
				}else {
					Dialog.lock.hide();
					new Dialog('订单取消失败！',{
					    onlyConfirm:true
					});
				}
			},function(res) {
				window.location.href=baseRoot+'/500.h';
			})
      	}
    });
}
/**
 *  邦定事件
 */
function bindEvent(){
	var pageIndex = 1,
		windowHeight = window.innerHeight,
		distance=Math.ceil(windowHeight/2);
	$('#order-list-wrap').on('scroll',function(e){
		if(handleScroll.isBusy){
			return;
		}
		var scrollTop = $(e.target).scrollTop();
	　　if(scrollTop + windowHeight >= this.scrollHeight-distance){
			handleScroll.isBusy = true;
	　　　　handleScroll(++pageIndex,pageSize);
	　　}
	});
}

/**
 * 上拉加载
 */
function handleScroll(pageIndex,pageSize){
	var node = document.getElementById('order-list');
	if(!node){
		return;
	}
	$.ajax({
		type : "GET",
		url : baseRoot+"/order/get/"+orderStatus+".h",
		data:{
			pageNo:pageIndex,
			pageSize:pageSize
		},
		dataType : "json",
	}).then(function(res){
		var html = appendHTML(res.orderList);
		html && node.appendChild(html);
		if(res.totalCount>pageIndex){
			handleScroll.isBusy = false;
		}
	});
}
/**
 * 插入数据到页面
 */
function appendHTML(data){
	if(!data || data.length<1){
		return;
	}
	var html = '';
	var wrap = document.createElement('div');
	wrap.className='myorder_goods';
	data.forEach(function(item){
		//console.log(item)
		html += '<div class="tit"><div class="time fl">'+item.createTimeStr+'</div>';
		html += 	'<div class="zt fr">'+item.orderStatusName+'</div>';
		html += '</div>';
		item.productInfos.forEach(function(d){
			html += '<div class="con">';
			html += '<a class="con_href" href="'+baseRoot+'/order/detail.h?orderNo='+d.orderCode+'">';
			html += '<img src="'+d.mainImageUrl+'" class="goods_img">';
			html += '<div class="goods_info">';
			html += '<div class="goods_tit">'+d.singleShortname+'</div>';
			html += '<em class="fl">'+d.sizeName+d.colorName+'</em>';
			html += '<cite>¥<span>'+formatPrice(d.manualDiscount)+'</span></cite>';
			html += '<i>x<span>'+d.qty+'</span></i>';
			html += '</div></a>';
		});
		html += '<div class="total">';
		html += '<p><em class="fr">合计:<i>¥</i><span>'+formatPrice(item.paymentAmount)+'</span></em>';
		html += '<cite class="fr">共<span>'+item.qty+'</span>件商品</cite></p>';
		html += '<p>'+createButtons(item.orderStatus,item.orderCode,item.childOrder.hybrisSuborderCode)+'</p>';
		html += '</div>';
	});
	wrap.innerHTML = html;
	return wrap;
}
/**
 * 生成按钮
 */
function createButtons(status,code,subCode){
	var result='';
	switch(status){
		case "10":
			result = '<a href="javascript:toPay('+code+');" class="btn fr red">立即支付</a>';
			result += '<a href="javascript:cancel('+code+');" class="btn fr cancel">取消订单</a>';
			break;
		case "11":
			result = '<a href="'+baseRoot+'/refund/gotoAppliMoney.h?orderId='+code+'" class="btn fr">申请退款</a>';
			break;
		case "12":
			result = '<a href="'+baseRoot+'/refund/gotoAppliGoods.h?orderId='+code+'" class="btn fr">申请退货</a>';
			break;
		case "13":
			result = '<a href="javascript:toConfirm('+subCode+');" class="btn fr red">确认收货</a>';
			result += '<a href="'+baseRoot+'/order/logstics/'+subCode+'.h?parentOrderNo='+code+'" class="btn fr">查看物流</a>';
			result += '<a href="'+baseRoot+'/refund/gotoAppliGoods.h?orderId='+code+'" class="btn fr">申请退货</a>';
			break;
		case "30":
			//result = '<a href="javascript:;" class="btn fr hide">删除订单</a>';
			break;
		case "160":
			result = '<a href="'+baseRoot+'/refund/gotoAppliGoods.h?orderId='+code+'" class="btn fr">申请退货</a>';
			result += '<a href="'+baseRoot+'/order/logstics/'+subCode+'.h?parentOrderNo='+code+'" class="btn fr">查看物流</a>';
			break;
		case "170":
			result = '<a href="'+baseRoot+'/order/logstics/'+subCode+'.h?parentOrderNo='+code+'" class="btn fr">查看物流</a>';
			break;
		default:
			console.log(status)
			break;
	}
	return result;		 
}
/**
 * 高亮当前菜单项
 */
function hightlight(index){
	var list = $('.order_tit').children();
	switch(index){
		case 10:
			list.eq(1).addClass('on');
			break;
		case 11:
			list.eq(2).addClass('on');
			break;
		case 12:
			list.eq(3).addClass('on');
			break;
		case 13:
			list.eq(4).addClass('on');
			break;
		default:
			list.first().addClass('on');
			break;
	}
}


