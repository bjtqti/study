
/**
 * 设置默认地址
 * @author <278500368@qq.com>
 */
function setDefaultAddress(id){
	$.ajax({
		url:baseRoot + '/address/setDefault.h',
		dataType:'json',
		data:{recvAddressId:id},
		success:function(result){
			if(result&&result.returnCode===0){
				if(singleCodes&&qtys){
					//nothing
				}else{
					location.reload();
				}
			}
		}
	})
}

/**
 * 跳转到编缉地址页
 * @author <278500368@qq.com>
 */
function toEditAddress(id){
	var path = '/address/toEdit.h?recvAddressId='+id;
	if(singleCodes&&qtys){
		path += '&singleCodes='+singleCodes+'&qtys='+qtys;
		if(couponNo){
			path += '&couponNo='+couponNo;
		}else if(userCouponFlag){
			path +='&userCouponFlag='+userCouponFlag;
		}
	} 
	location.href=baseRoot+path;
}

/**
 * 删除点击的地址
 * @author <278500368@qq.com>
 */
function deleteAddress(id){
	Dialog.lock.show();
	var item = document.getElementById('item-'+id);
	$.ajax({
		url:baseRoot+'/address/delete.h',
		dataType:'json',
		data:{recvAddressId:id},
		success:function(result){
			Dialog.lock.hide();
			if(result&&result.returnCode===0){
				item.style.display='none';
			}else{
				Dialog.tips('删除失败');
			}
		}
	});
}

/**
 * 获取地址id
 * @author <278500368@qq.com>
 */
function getAddressId(target,tag){
	var body = document.body,
		data=null;
	while(target!==body){
		var data = target.getAttribute(tag);
		if(data){
			break;
		}
		target = target.parentNode;
	}
	return data;
}

/**
 * 点击空白处返回订单确认页
 * @author <278500368@qq.com>
 */
function backToOrderPage(id){
	if(singleCodes&&qtys){
		var backUrl = '/cart/confirmOrder.h?singleCodes='+singleCodes+'&qtys='+qtys;
		if(window.couponNo){
			backUrl += '&couponNo='+couponNo;
		}else if(window.userCouponFlag){
			backUrl +='&userCouponFlag='+userCouponFlag;
		}
		backUrl += '&memberDlvAddressId='+id;
		window.location.href=baseRoot+backUrl;
		//console.log(id)
	}
}

/**
 * 邦定事件
 * @author <278500368@qq.com>
 */
function handleEvent(){
	$('.box').on('click',function(e){
		var id = getAddressId(e.target,'data-id'),
			tagClassName = e.target.className,
			parentClassName = e.target.parentNode.className;
		if(tagClassName=='pen'||parentClassName==='pen'){
			toEditAddress(id);
		}else if(tagClassName=== 'del'||parentClassName==='del'){
			new Dialog('确定删除该地址吗？',{
				onConfrim:function(){
					deleteAddress(id);
				}
			});
		}else if(parentClassName==='ad-check'||parentClassName==='checkboxRed'){
			setDefaultAddress(id);
		}else if(tagClassName==='ad-list'||parentClassName==='ad-list'){
			backToOrderPage(id);
		}
	})
}

// JavaScript Document
$(document).ready(function(){
	lineSet(".selectArea .ad-list .toolsArea");
	handleEvent();
});

