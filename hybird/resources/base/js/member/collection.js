
// JavaScript Document

$(document).ready(function(){
	lineSet(".collection .list");
	handleClick();
});

function handleClick(){
	$('#container-collection').on('click',function(e){
		var target = e.target,
			singleCode=target.getAttribute('data-id');
		if(singleCode){
			new Dialog('确定取消收藏吗？',{
				onConfrim:function(){
					delFavorite(singleCode,function(){
						var len = $('.list').length;
						target.parentNode.style.display='none';
						len===1 && $('.empty').show();
					});
				}
			});
		}
	})
}
 
function delFavorite(singleCode,callback){
	//var loading = $('#load-box').show();
	$.ajax({
		url : baseRoot+"/collect/deleteCollect.html",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":singleCode
		},
		success : function(result){
			//loading.hide();
			if(result.returnCode===0){
				callback();
			}
		}
	});
}
