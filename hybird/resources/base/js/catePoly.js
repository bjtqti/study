// JavaScript Document

$(document).ready(function(){
	commentSet();
	tabChange();
	leftHeight();
	lineSet(".polyTabs,.polyTabs ul li i,.brandList a div img,.leftNav .name,footer");
});

/* 类别左侧高度 */
function leftHeight(){
	
	sizeSet();
	
	$(window).resize(function(){
		sizeSet();
	});
	
}
function sizeSet(){
	var winH = $(window).height();
	var winW = $(window).width();
	var footer = $("footer").height();
	var polyTabs = $(".polyTabs").height();
	$(".category-bd").css({"width":winW/4});
	$(".poly,.polyCon,.category-bd,.rightCon").css({"height":winH-footer-polyTabs-1});
}

/* 切换 */
var isAnimating = false;
function commentSet(){
	$(".polyTabs ul li").on("click",function(){
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

/* 类别 类目切换 */
function tabChange(){
	$(".leftNav .name").on("click",function(){
		$(".leftNav .name").removeClass("on");
		$(this).addClass("on");
		$(".rightCon > div").removeClass("sh");
		$(".rightCon > div").eq($(this).index()).addClass("sh");
		leftHeight();
	});

}
