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

	function Slider( selector, context ) {
		return new Slider.init( selector, context );
	}

	Slider.init=function(selector, context){
		var wrap = document.querySelector(selector);
		var box = wrap.children[0];
		var pages = box.children;
		this.box = box;
		this.pages = pages;
		this.screenWidth = window.innerWidth;
		this.pageLength = pages.length;
		this.initPages();
	}

	Slider.init.prototype = Slider.prototype = {
		initPages:function(){
		 	var length = this.pageLength;
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
 			this.translate(this.prevIndex,'-100%');
 			this.translate(this.currIndex,'0px');
 			this.translate(this.nextIndex,'100%');
 			this.auto()
		},
		handleEvent:function(e){

		},
 
		setStyle:function(index,distance){
			var element = this.pages[index];
			this.translate(index,distance);
			element.style.WebkitTransition = 'all 6s ease';
			element.style.transition = 'all 6s ease';
			element.style.visibility = 'visible';
			element.style.zIndex = 10;
		},
		move:function(index,distance){
			var element = this.pages[index];
			this.translate(index,distance);
			element.style.WebkitTransition = 'none';
			element.style.transition = 'none';
			element.style.visibility = 'hidden';
			element.style.zIndex = 5;
		},
		translate:function(index,distance){
			var element = this.pages[index];
			element.style.WebkitTransform = "translate3d(" + distance + ",0,0)";
			element.style.transform = "translate3d(" + distance + ",0,0)";
		},
		next:function(){
			this.setStyle(this.currIndex,'-100%');
 			this.setStyle(this.nextIndex,'0px');
 			this.move(this.prevIndex,'100%');
			var length = this.pageLength-1;
			var prevIndex = this.prevIndex;
			this.prevIndex = this.currIndex;
			this.currIndex = this.nextIndex;
			if(++this.nextIndex > length){
				this.nextIndex = prevIndex;
			}
			this.step();
		},
		prev:function(){
			var length = this.pageLength-1;
			this.nextIndex = this.currIndex;
			this.currIndex = this.prevIndex;
			if(--this.prevIndex<0){
				this.prevIndex = length;
			}
			this.step();
		},
		auto:function(){
			var that = this;
			setTimeout(function(){
				that.next();
				that.auto();
			},3000)
		},
		step:function(){
			
 			console.log(this.currIndex)
		}
	}

 


	if(!noGlobal){
		window.Slider = Slider;
	}
	return Slider;
});
 