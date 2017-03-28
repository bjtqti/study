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
	var defaultOption = {
		speed:'500ms',
		delay:'5000',
		bounce:0.3,
		auto:true
	};

	var extend = function(target,source){
		var res = {};
		if(Object.assign){
			return Object.assign(res,target,source);
		}
		for(var i in target){
			res[i] = target[i];
		}
		if(source && typeof source === 'object'){
			for(var i in source){
				if(res[i] !== null && res[i] !== undefined){
					res[i] = source[i]
				};
			}
		}
		return res;
	}

	function Slider( selector, options ) {
		var config = extend(defaultOption,options);
		return new Slider.init( selector, config );
	}

	Slider.init=function(selector, options){
		var wrap = document.querySelector(selector);
		var box = wrap.children[0];
		var pages = box.children;
		this.wrap = wrap;
		this.box = box;
		this.pages = pages;
		this.speed = options.speed;
		this.delay = options.delay;
		this.auto = options.auto;
		this.bounce = options.bounce;
		this.pageLength = pages.length;
		this.initPages();
	}

	Slider.prototype = {
		initPages:function(){
		 	var length = this.pageLength;
		 	if(length<1){
		 		console.warn('Slider children require at least one');
		 		return false;
		 	}
 			if(length < 3){
 				var lastItem = this.pages[length-1];
 				while(length < 3) {
 					this.box.appendChild(lastItem.cloneNode(true));
 					length++;
 				}
 				this.pageLength = length;
 			}
 			this.prevIndex = length - 1;
 			this.currIndex = 0;
 			this.nextIndex = this.currIndex + 1;
 			this.reset();
 			this.width = window.innerWidth;
 			this.auto && this.autoRun();
 			this.wrap.addEventListener('touchstart',this,false);
 			this.wrap.addEventListener('touchmove',this,false);
 			document.body.addEventListener('touchend',this,false);
 			this.wrap.addEventListener('mousedown',this,false);
 			this.wrap.addEventListener('mousemove',this,false);
 			document.body.addEventListener('mouseup',this,false);
		},
		handleEvent:function(e){
		 	var type = e.type;
		 	e.stopPropagation();
			if(e.touches){
				e = e.touches[0]||e.changedTouches[0];
			}
			switch(type){
				case 'mousedown':
				case 'touchstart':
					this.axis.x = e.clientX;
    				this.axis.y = e.clientY;
    				this.enableSlide = true;
    				this.auto = false;
    				clearTimeout(this.timmerId);
					break;
				case 'mouseup':
				case 'touchend':
 					var distance = e.clientX - this.axis.x;
 					var bounce = Math.round(this.width * this.bounce);
    				this.enableSlide = false;
    				if(Math.abs(distance)>bounce){
    					distance > 0 ? this.prev() : this.next();
    				}else{
    					//反弹
    					if(distance>0){
    						this.css(this.currIndex,this.animate('0px'));
	 						this.css(this.prevIndex,this.animate('100%'));
    					}else{
    						this.css(this.currIndex,this.animate('0px'));
							this.css(this.nextIndex,this.animate('100%'));
    					}
    				}
					break;
				case 'mousemove':
				case 'touchmove':
					var distance = e.clientX - this.axis.x;
					if(this.enableSlide){
						this.move(distance);
					}
					break;
				default:
					break;
			}
	 	
		},
		reset:function(){
			this.css(this.prevIndex,this.translate('-100%'));
			this.css(this.currIndex,this.translate('0px'));
			this.css(this.nextIndex,this.translate('100%'));
			for(var i=this.nextIndex+1;i<this.pageLength-1;i++){
				this.css(i,this.translate('100%'));
			}
			this.axis = {
				x:0,
				y:0
			}
		},
		css:function(index,style){
			var element = this.pages[index];
			for(var i in style){
				element.style[i] = style[i];
			}
		},
		move:function(distance){
			var width = this.width;
			if(distance > 0){
				//prev
				this.css(this.currIndex,this.translate(distance+'px'));
				this.css(this.prevIndex,this.translate((distance-width)+'px'));
			}else{
				//next
				this.css(this.currIndex,this.translate(distance+'px'));
				this.css(this.nextIndex,this.translate((width+distance)+'px'));
			}
		},
		translate:function(distance){
 			return {
 				WebkitTransform:"translate3d(" + distance + ",0px,0px)",
				transform:"translate3d(" + distance + ",0px,0px)",
				WebkitTransition : 'translate '+ this.speed+' ease',
				transition:'translate '+ this.speed+' ease'
 			}
		},
		animate:function(distance){
			return {
				WebkitTransform:"translate3d(" + distance + ",0px,0px)",
				transform:"translate3d(" + distance + ",0px,0px)",
				WebkitTransition : 'all '+ this.speed+' ease',
				transition:'all '+ this.speed+' ease'
			}
		},
		noAnimate:function(distance){
			return {
				WebkitTransform:"translate3d(" + distance + ",0px,0px)",
				transform:"translate3d(" + distance + ",0px,0px)",
				WebkitTransition : 'none',
				transition:'none'
			}
		},
		next:function(){
			var length = this.pageLength-1;
			this.css(this.currIndex,this.animate('-100%'));
			this.css(this.nextIndex,this.animate('0px'));
	 		this.css(this.prevIndex,this.noAnimate('100%'));
			this.prevIndex = this.currIndex;
			this.currIndex = this.nextIndex;
			if(++this.nextIndex > length){
				this.nextIndex = 0;
			}
		},
		prev:function(){
			var length = this.pageLength-1;
			this.css(this.currIndex,this.animate('100%'));
	 		this.css(this.prevIndex,this.animate('0px'));
			this.css(this.nextIndex,this.noAnimate('-100%'));
			this.nextIndex = this.currIndex;
			this.currIndex = this.prevIndex;
			if(--this.prevIndex<0){
				this.prevIndex = length;
			}
		},
		autoRun:function(){
			var that = this;
			if(!this.auto){
				return false;
			}
			this.timmerId = setTimeout(function(){
				that.next();
				that.autoRun();
			},this.delay);
		}
	}

	Slider.init.prototype = Slider.prototype;

	if(!noGlobal){
		window.Slider = Slider;
	}
	return Slider;
});
 