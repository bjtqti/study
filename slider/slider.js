;( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "Slider requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ){
	"use strict";

	var version = '1.0.0';
	var defaults = {
		speed:500,
		delay:5000,
		direction: 'horizontal',
		autoplay: true,
		bounceRatio:0.3,
		pagination:true,
		paginationClass:'slider-pagination',
		bulletClass:'slider-bullet',
		bulletActiveClass:'slider-bullet-active',
		loop:true
	};

	var isObject = function (obj) {
		return Object.prototype.toString.call(obj)==="[object Object]";
	}

	var extend = function(target, source) {
		if(!isObject(source)){
			source = {};
		}
		for (var i in target) {
			if (source[i] === undefined) {
				source[i] = target[i]
			}
		}
		return source;
	}

	function Slider( selector, options ) {
		options = extend(defaults,options);
		return new Slider.init( selector, options );
	}

	Slider.init=function(selector, params){
		var container = document.querySelector(selector);
		var wrap = container.children[0];
		var slides = wrap.children;
		var sliderCount = slides.length;
		if(sliderCount === 0) {
			console.warn('Slider children require at least one');
			return this;
		}
		this.container = container;
		this.wrap = wrap;
		this.slides = slides;
		this.params = {};
		extend(params,this.params);
		this.sliderCount = sliderCount;
		this.lastIndex = sliderCount - 1;
		this.firstIndex = 0;
		this.initSlides();
	}

	var fn = Slider.init.prototype;

	fn.initSlides = function(){
		var width = this.wrap.clientWidth;
		this.slideWidth = width;
		this.wrap.style.width = width * this.sliderCount + 'px';
		this.activeIndex = 0;
		this.slideStack = [];
		for(var i = 0;i<this.sliderCount;i++){
			this.slides[i].style.width = width + 'px';
			this.slideStack.push(i);
		}

		if(this.params.pagination){
			this.createPagination();
		}

		if(this.params.loop){
			this.createLoopItems();
		}

		if(this.params.autoplay){
			this.autoPlay();
		}
	}

	fn.createLoopItems = function(){
		var lastItem = this.slides[this.lastIndex];
		var firstItem = this.slides[this.firstIndex];
		var prevItem = lastItem.cloneNode(true);
		var nextItem = firstItem.cloneNode(true);
		var sliderCount = this.sliderCount+2;
		var slideWidth = this.slideWidth;
		this.slideStack.push(this.firstIndex);
		this.slideStack.unshift(this.lastIndex);
		this.wrap.insertBefore(prevItem,firstItem);
		this.wrap.appendChild(nextItem);
		this.wrap.style.width = slideWidth * sliderCount + 'px';
		translate3d(this.wrap,slideWidth);
		this.activeIndex += 1;
		this.sliderCount = sliderCount;
		this.lastIndex += 2;
	}

	fn.fixedNextLoop = function(){
		var that = this;
		var x = this.slideWidth;
		setTimeout(function(){
			translate3d(that.wrap,x);
			transition(that.wrap,0);
			that.activeIndex = 1;
		},that.params.speed);
	}

	fn.fixedPrevLoop = function(){
		var that = this;
		var x = this.slideWidth*(this.lastIndex-1);
		setTimeout(function(){
			translate3d(that.wrap,x);
			transition(that.wrap,0);
			that.activeIndex = that.lastIndex-1;
		},that.params.speed);
	}

	fn.createPagination = function(){
		var ul = document.createElement('ul');
		var bullets = [];
		var bulletClass = this.params.bulletClass;
		ul.className = this.params.paginationClass;
		for(var i = 0;i<this.sliderCount;i++){
			var li = document.createElement('li');
			li.className = bulletClass;
			ul.appendChild(li);
			bullets.push(li);
		}
		this.container.appendChild(ul);
		this.bullets = bullets;
		this.setActivePagination();
	}

	fn.setActivePagination = function(){
		var prevIndex = this.activeBulletIndex;
		var activeIndex = this.activeIndex;
		activeIndex = this.slideStack[activeIndex];
		if(prevIndex === activeIndex){
			return;
		}
		if(prevIndex !== undefined){
			this.bullets[prevIndex].className = this.params.bulletClass;
		}
		this.bullets[activeIndex].className += ' '+ this.params.bulletActiveClass;
		this.activeBulletIndex = activeIndex;
	}

	fn.autoPlay = function(){
		var that = this;
		if(!this.params.autoplay){
			return;
		}
		this.timeId = setTimeout(function(){
			that.next();
			//that.prev();
			that.autoPlay();
		},this.params.delay);
	}

	fn.next = function(){
		var activeIndex = ++this.activeIndex;
	 	if(activeIndex > this.lastIndex){
	 		this.params.autoplay && clearTimeout(this.timeId);
	 		return;
	 	}
		translate3d(this.wrap,activeIndex*this.slideWidth);
	 	transition(this.wrap,this.params.speed);
	 	this.setActivePagination();
	 	if(activeIndex === this.lastIndex){
	 		this.params.loop && this.fixedNextLoop();
	 	}
	}

	fn.prev = function(){
		var activeIndex = --this.activeIndex;
		if(activeIndex < this.firstIndex){
			this.params.autoplay && clearTimeout(this.timeId);
	 		return;
		}
		translate3d(this.wrap,activeIndex*this.slideWidth);
	 	transition(this.wrap,this.params.speed);
	 	this.setActivePagination();
	 	if(activeIndex === this.firstIndex){
	 		this.params.loop && this.fixedPrevLoop();
	 	}
	}

	function translate3d(element,x,y) {
		x = x === undefined ? 0 : x;
		y = y === undefined ? 0 : x;
		element.style['-webkit-transform'] = 'translate3d(-'+x+'px,'+y+'px,0px)';
		element.style['transform'] = 'translate3d(-'+x+'px,'+y+'px,0px)';
	}
	
	function transition(element,time){
		element.style['-webkit-transition-duration'] = time+'ms';
		element.style['transition-duration'] = time+'ms';
	} 

	if(!noGlobal){
		window.Slider = Slider;
	}
	return Slider;
});
 