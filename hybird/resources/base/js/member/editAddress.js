function isPhoneNumber(num){
    if(!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(num)){
    	return false;
    }
    return true;
}

function isEmpty(str){
	if(str===''||str===null||typeof(str)!== 'string'||str.length<1){
		return true;
	}
	return false;
}

function handleSubmit(addr){
	var lock = false,
		busy = $('#load-box');
	$('.addBtns').on('click',function(){
		if(lock) return;
		lock = true;
		var	name = document.getElementById('receiver-name').value,
			phone = document.getElementById('receiver-phone').value,
		    address = document.getElementById('address').value,
		    districtCode = addr.countyCode;
		setTimeout(function(){
			lock = false;
		},3000);
		if(isEmpty(name)){
			Dialog.tips('请输入收货人姓名');
			return false;
		}
		if(!isPhoneNumber(phone)){
			Dialog.tips('电话号码输入有误');
			return false;
		}
		if(!districtCode){
			Dialog.tips('请选择收货地址');
			return false;
		}
		if(isEmpty(address)){
			Dialog.tips('请填写详细地址');
			return false;
		}
		busy.show();
		$.ajax({
			url:baseRoot + '/address/update.html',
			type:'post',
			dataType:'json',
			data:{
				recvLinkman:name,
				recvMobile:phone,
				districtCode:districtCode,
				address:address,
				isDefault:isDefault,
				recvAddressId:recvAddressId
			},
			success:function(result){
				busy.hide();
				lock = false;
				if(result.returnCode===0){
					window.location.href=baseRoot+'/address/addressList.html'
				}
			}
		});
	});
}
// JavaScript Document

$(document).ready(function(){
	var addr = new Address({
	    	province:{id:'cmbProvince',code:provinceCode},
	    	city: {id:'cmbCity',code:cityCode},
	    	area: {id:'cmbArea',code:countyCode}
	    });
	handleSubmit(addr);
});



