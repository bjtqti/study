 	"use strict";

	var version = '1.0.0';
	var defaults = {
		speed:500,
		delay:5000,
		direction: 'horizontal',
		autoplay: false,
		bounceRatio:0.5,
		pagination:true,
		loop:true,
		buttons:false,
		paginationClass:'slider-pagination',
		bulletClass:'slider-bullet',
		bulletActiveClass:'slider-bullet-active'
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
	var Device = (function () {
        var ua = navigator.userAgent;
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        return {
            ios: ipad || iphone || ipod,
            android: android,
            desktop:!(ipad || iphone || ipod || android)
        };
    })();

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
		this.isAnimating = false;
		this.axis = {x:0,y:0};
		this.initSlides();
		this.bindEvents();
	}

	var fn = Slider.init.prototype;

	fn.initSlides = function(){
		var width = this.wrap.clientWidth;
		this.slideWidth = width;
		this.wrap.style.width = width * this.sliderCount + 'px';
		this.bounceWidth = this.params.bounceRatio * width;
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

		if(this.params.buttons){
			this.createButtons();
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

	fn.fixedLoop = function(activeIndex){
		if(!this.params.loop) return;
		translate3d(this.wrap,this.slideWidth*activeIndex);
		transition(this.wrap,0);
		this.activeIndex = activeIndex;
		this.isAnimating = false;
	}

	fn.fixedNextLoop = function(){
		var that = this;
		setTimeout(function(){
			that.fixedLoop(1)
		},that.params.speed);
	}

	fn.fixedPrevLoop = function(){
		var that = this;
		setTimeout(function(){
			that.fixedLoop(that.lastIndex-1)
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

	fn.createButtons = function(){
		var prev = document.createElement('div');
		var next = document.createElement('div');
		prev.className = 'slider-button prev';
		next.className = 'slider-button next';
		prev.innerHTML = '&lt;';
		next.innerHTML = '&gt';
		this.container.appendChild(prev);
		this.container.appendChild(next);
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
	 	this.isAnimating = true;
		translate3d(this.wrap,activeIndex*this.slideWidth);
	 	transition(this.wrap,this.params.speed);
	 	this.setActivePagination();
	 	if(activeIndex === this.lastIndex){
	 		this.fixedNextLoop();
	 	}
	}

	fn.prev = function(){
		var activeIndex = --this.activeIndex;
		if(activeIndex < this.firstIndex){
			this.params.autoplay && clearTimeout(this.timeId);
	 		return;
		}
		this.isAnimating = true;
		translate3d(this.wrap,activeIndex*this.slideWidth);
	 	transition(this.wrap,this.params.speed);
	 	this.setActivePagination();
	 	if(activeIndex === this.firstIndex){
	 		this.fixedPrevLoop();
	 	}
	}

	fn.bindEvents  = function(){
		if(Device.desktop){
			this.container.addEventListener('mousedown',this,false);
			this.container.addEventListener('mousemove',this,false);
			document.addEventListener('mouseup',this,false);
		}else{
			this.container.addEventListener('touchstart',this,false);
			this.container.addEventListener('touchmove',this,false);
			document.addEventListener('touchend',this,false);
		}
		this.container.addEventListener('transitionend',this,false);
		this.container.addEventListener('click',this,false);
	}

	fn.transitionend = function(){
		this.isAnimating = false;
	}

	fn.start = function(pageX){
		this.axis.x = parseInt(pageX);
		if(this.params.autoplay){
			this.params.autoplay = false;
			this.timeId && clearTimeout(this.timeId);
		}
	}

	fn.move = function(pageX){
		pageX = parseInt(pageX);
		if(this.isAnimating) return;
		if(this.axis.x === 0) return;
		if(pageX > this.slideWidth || pageX < 0) {
			return;
		}
		var distance = this.axis.x - pageX;
		translate3d(this.wrap,distance + this.slideWidth*this.activeIndex);
		transition(this.wrap,0);
		if(distance > 0){
			if(distance > this.bounceWidth){
				this.next();
				this.axis.x = 0;
			}
		}else{
			if(-distance > this.bounceWidth){
				this.prev();
				this.axis.x = 0;
			}
		}
	}

	fn.stop = function(){
		if(this.isAnimating)return;
		this.axis.x = 0;
		translate3d(this.wrap,this.slideWidth*this.activeIndex);
		transition(this.wrap,this.params.speed);
	}

	fn.handleEvent = function(e){
		var type = e.type;
		switch(type){
			case 'mousedown':
				this.start(e.pageX);
				break;
			case 'mousemove':
				this.move(e.pageX);
				break;
			case 'mouseup':
				this.stop();
				break;
			case 'touchstart':
				this.start(e.targetTouches[0].pageX);
				break;
			case 'touchmove':
				this.move(e.targetTouches[0].pageX);
				break;
			case 'touchend':
				this.stop();
				break;
			case 'transitionend':
			case 'WebkitTransitionend':
				this.transitionend();
				break;
			case 'click':
				e.stopPropagation();
				var evt = e.target.className.split(' ')[1];
				if(evt==='prev'||evt==='next'){
					this[evt]();
				}
				break;
			default:
				break;
		}
	}

 
 