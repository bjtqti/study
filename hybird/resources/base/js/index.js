// JavaScript Document

$(function(){
	lineSet("header ul li a span,.activity-1 span a,footer");
})

/* 移动幻灯事件 */
TouchSlide({ 
	slideCell:"#banner",
	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
	mainCell:".bd ul", 
	effect:"leftLoop", 
	autoPlay:true,//自动播放
	autoPage:true //自动分页
});