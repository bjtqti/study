var util = {
	bindEvent: function(node, type, func) {
        if (node.addEventListener) {
            node.addEventListener(type, func, false);
        } else if (node.attachEvent) {
            node.attachEvent("on" + type, func);
        } else {
            node["on" + type] = func;
        }
    }
}
/**
 * 图片轮播
 * @parm obj DocumentElement
 */

function Slider(obj){
	this.container = obj;
	this.pages = [];
	this.width = window.innerWidth;
	this.init();
	this.bindEvent();
}

Slider.prototype.init=function(){
	this.prevIndex = -1;
	this.curentIndex = 0;
	this.nextIndex = 1;
	this.time = 300;
	this.timerId = null;
	this.axis = {
		x:0,
		y:0
	};
	this.isMoveing = false;
}

Slider.prototype.loadImages = function(pages){
	var distance,i,page,img,
		total = pages.length,
		tmp = document.createDocumentFragment(),
	    width = this.width;
	for(i=0;i<total;i++){
		distance = i ? width : 0;
		page = document.createElement('li');
		page.setAttribute('class','page');
		img = document.createElement('img');
		img.src=pages[i];
		page.appendChild(img);
		page.style.transform = 'translate3d('+distance+'px, 0, 0)';
		tmp.appendChild(page);
		this.pages.push(page);
	}
	this.container.children[0].appendChild(tmp);
	this.totalPages = total;
}

Slider.prototype.bindEvent = function(){
	var container = this.container;
	//util.bindEvent(container,'click',this.handleEvent.bind(this));
	util.bindEvent(container,'mousedown',this.handleEvent.bind(this));
	util.bindEvent(container,'mousemove',this.handleEvent.bind(this));
	util.bindEvent(container,'mouseup',this.handleEvent.bind(this));
	util.bindEvent(container,'touchstart',this);
	util.bindEvent(container,'touchmove',this);
	util.bindEvent(container,'touchend',this);
}

Slider.prototype.prev=function(){
	var time = this.time,
	    width = this.width;
	if(this.isMoveing) return false;
	if(this.prevIndex>-1){
		this.isMoveing = true;
		this.transition(this.curentIndex,width,time);
		this.transition(this.prevIndex,0,time);
		this.nextIndex = this.curentIndex;
		this.curentIndex = this.prevIndex;
		this.prevIndex--;
		this.transitionEnd();
	}
}

Slider.prototype.next=function(){
	var time = this.time,
	    width = this.width;
	if(this.isMoveing) return false;
	if(this.nextIndex<this.totalPages){
		this.isMoveing = true;
		this.transition(this.curentIndex,-width,time);
		this.transition(this.nextIndex,0,time);
		this.prevIndex=this.curentIndex;
		this.curentIndex = this.nextIndex;
		this.nextIndex++;
		this.transitionEnd();
	}
}

Slider.prototype.transition=function(index,distance,time){
	var page = this.pages[index];
	if(page){
		page.style.transform = 'translate3d('+distance+'px, 0, 0)';
		page.style.transitionDuration = time+'ms';
	}
}

Slider.prototype.handleEvent=function(e){
	var direction = this.width / 2 - e.clientX;
	e.preventDefault();
	switch(e.type){
		case 'mousedown':
			this._start(e);
			break;
		case 'touchstart':
			this._start(e.touches[0]);
			break;
		case 'mousemove':
			this._move(e);
			break;
		case 'touchmove':
			this._move(e.touches[0]);
			break;
		case 'mouseup':
			this._end();
			break;
		case 'touchend':
			this._end();
			break;
		case 'click':
			//direction > 0 ? this.prev():this.next();
			break;
		default:
			break;
	}
	return false;
}

Slider.prototype.transitionEnd = function(){
	var it = this;
	clearTimeout(this.timerId);
	this.timerId=setTimeout(function(){
		it.isMoveing = false;
	},it.time);
}

Slider.prototype._start = function(e){
	var axis = {
		x : e.clientX,
		y : e.clientY
	};
	this.enabled = true;
	this.axis = axis;
}

Slider.prototype.isHead=function(){
	return this.prevIndex <= -1;
}

Slider.prototype.isEnd=function(){
	return this.nextIndex >= this.totalPages;
}

Slider.prototype._move=function(e){
	var width = this.width,
	    currIndex = this.curentIndex,
	    distance = e.clientX - this.axis.x;
 	if(this.isMoveing) {
 		return false;
 	}
	if(this.enabled){
		if(distance>0&&!this.isHead()){
			//prev
			this.transition(currIndex,distance,0);
			this.transition(this.prevIndex,-width+distance,0);
		}else if(distance<0&&!this.isEnd()){
			//next
			this.transition(currIndex,distance,0);
		    this.transition(this.nextIndex,width+distance,0);
		} 
	}
	this.distance = distance;
}

Slider.prototype._end = function(){
 	var currIndex = this.curentIndex,
	    distance = this.distance,
		//反弹阀值
	    bounce = Math.round(this.width*.2),
	    time = this.time,
	    width = this.width;
	this.enabled = false;
	this.axis = {
		x:0,
		y:0
	}
	this.distance = 0;
	if(Math.abs(distance)>bounce){
		if(distance>0){
			this.prev();
		}else{
			this.next();
		}
	}else{
		//滑动距离太小反弹
		this.transition(currIndex,0,time);
		if(distance>0){
			//prev
    		this.transition(this.prevIndex,-width,time);
		}else{
			//next
			this.transition(this.nextIndex,width,time);
		}
	}
}


 