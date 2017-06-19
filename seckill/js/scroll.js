"use strict";

var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { 
		setTimeout(callback, 16);
	};
var cAF = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || clearTimeout;


function cacleHeight(obj){
	var body = obj||document.body;
	var height = body.offsetHeight;

	if(body.getBoundingClientRect){
		var offset = body.getBoundingClientRect();
		height = offset.height;
	}
	return Math.round(height);
}

function scrollLoad(callback){
	var screenHeight = Math.round(window.innerHeight);
	var RANGE = Math.ceil(screenHeight*0.5);
	var scrollTop = 0;
	var docElement = document.body;
	if(document.documentElement.scrollTop){
		docElement = document.documentElement;
	}
	window.addEventListener('scroll',function(){
		var contentHeight = cacleHeight();
		scrollTop=parseInt(docElement.scrollTop)||0;
		if(contentHeight-RANGE<=scrollTop+screenHeight){
			callback();
		}
	});
}

function gotop(){
	var docElement = document.body;
	var node = document.createElement('div');
	var pH=Math.ceil(window.innerHeight*.5);
	var iconName = 'back-to-top';
	var scrollTop = 0;
	var timer;
	node.className = iconName;
	docElement.appendChild(node);
	node.onclick=function(){
		cAF(timer);
		timer=rAF(step);
	}
	function step(){
		var  speed=Math.floor(-scrollTop/10);
		if(scrollTop==0){
			cAF(timer);
		}else{
			timer = rAF(step);
		}
		docElement.scrollTop=scrollTop+speed;
	}
	window.addEventListener('scroll',function(){
		scrollTop=parseInt(docElement.scrollTop);
		if(scrollTop>pH){
			node.className = iconName +' active';
		}else{
			node.className = iconName;
		}
	});
}