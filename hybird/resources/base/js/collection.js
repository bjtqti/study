// JavaScript Document

$(document).ready(function(){
	colBtn();
	lineSet(".collection .list");
});

function colBtn(){
	$(".collection .list > span").on("click",function(){
		if($(this).hasClass("cancel-btn")){
			$(this).removeClass("cancel-btn");
		}else{
			$(this).addClass("cancel-btn");
		}
	});
}