
function setDefaultAddress(id){
	$.ajax({
		url:baseRoot + '/address/setDefault.html',
		dataType:'json',
		data:{recvAddressId:id},
		success:function(result){
			if(result&&result.returnCode===0){
				location.reload();
			}
		}
	})
}

function editAddress(id){
	window.location.href=baseRoot+'/address/toEdit.html?recvAddressId='+id;
}

function deleteAddress(id){
	var loading = $('#load-box').show(),
		item = document.getElementById('item-'+id);
	$.ajax({
		url:baseRoot+'/address/delete.html',
		dataType:'json',
		data:{recvAddressId:id},
		success:function(result){
			loading.hide();
			if(result&&result.returnCode===0){
				item.style.display='none';
			}
		}
	});
}

/**
 * 获取地址id
 */
function getAddressId(target){
	var body = document.body,
		data=null;
	while(target!==body){
		var data = target.getAttribute('data-id');
		if(data){
			break;
		}
		target = target.parentNode;
	}
	return data;
}

function handleEvent(){
	$('.box').on('click',function(e){
		var id = getAddressId(e.target),
			tagClassName = e.target.className,
			parentClassName = e.target.parentNode.className;
		if(tagClassName=='pen'||parentClassName==='pen'){
			editAddress(id);
		}else if(tagClassName=== 'del'||parentClassName==='del'){
			new Dialog('确定删除该地址吗？',{
				onConfrim:function(){
					deleteAddress(id);
				}
			});
		}else if(parentClassName==='ad-check'||parentClassName==='checkboxRed'){
			setDefaultAddress(id);
		}
	})
}

// JavaScript Document
$(document).ready(function(){
	lineSet(".selectArea .ad-list .toolsArea");
	handleEvent();
});

