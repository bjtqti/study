var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { 
		setTimeout(callback, 1000 / 60);
	};
var cAF = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || clearTimeout;

var noop = function(){};

function GoTop(dom,callback){
	this.dom = dom;
	this.callback = callback||noop;
	this.name = dom.className;
	this.bindEvent();
}

GoTop.prototype.bindEvent = function(){
	var timer = null,
		scrollTop = 0,
		dom = this.dom,
		doc = document,
		it = this,
		docElement=doc.body,
		pH=Math.ceil(window.innerHeight*.5);
 	
 	if(doc.documentElement.scrollTop){
		docElement = doc.documentElement;
	}
	function step(){
		var now=scrollTop,
		    speed=Math.floor((0-now)/10);
		if(scrollTop==0){
			cAF(timer);
			it.callback();
		}else{
			timer = rAF(step);
		}
		docElement.scrollTop=scrollTop+speed;
	}

	dom.onclick=function(){
		cAF(timer);
		timer=rAF(step);
	}
 
	window.onscroll=function(){
		scrollTop=docElement.scrollTop;
		if(scrollTop>pH){
			dom.className = it.name +' active';
		}else{
			dom.className = it.name;
		}
		return scrollTop;
	};
}