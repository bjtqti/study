
// JavaScript Document

$(document).ready(function(){
	lineSet(".collection .list");
	handleClick();
});

/**
 * 点击收藏
 * @author <278500368@qq.com>
 */
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

/**
 * 取消收藏
 * @author <278500368@qq.com>
 */ 
function delFavorite(singleCode,callback){
	//var loading = $('#load-box').show();
	$.ajax({
		url : baseRoot+"/collect/deleteCollect.h",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":singleCode
		},
		success : function(result){
			//loading.hide();
			if(result.returnCode===0){
				callback&&callback();
			}
		}
	});
}
