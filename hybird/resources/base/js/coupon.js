// JavaScript Document

$(document).ready(function(){
	scrollSet();
	commentSet();
	lineSet(".polyTabs,.polyTabs ul li i");
});


function scrollSet(){
	var winH = $(window).height();
	var headH = $(".polyTabs").height()+1;
	$(".poly").css({"height":winH - headH});
}

/* 切换 */
var isAnimating = false;
function commentSet(){
	
	$(".polyTabs ul li").on("click",function(){
		
		setTimeout('setTimeSet()',610);
		
		var frontIndex = $(".polyTabs ul li.current").index();
		var thisIndex = $(this).index();
		if(isAnimating || thisIndex == frontIndex){
			return;
		}
		$(".polyTabs ul li").removeClass("current");
		$(".polyTabs ul li").eq($(this).index()).addClass("current");
		pageSwitch(frontIndex,thisIndex);
	});
}


function setTimeSet(){
	var windowH = $(window).height();
	if($(".page-current").scrollTop() < (windowH/3) ){
		$(".toTop").hide();
	}else{
		$(".toTop").show();
	}
}