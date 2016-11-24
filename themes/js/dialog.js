function Dialog(element){
	if(!element){
		return false;
	}
	this.active = false;
	this.element = element;
	this.bindEvent();
}

Dialog.prototype.bindEvent = function(){
	var it = this,
	    buttons = this.element.querySelectorAll('button');
	if(buttons&&buttons[0]){
		buttons[0].addEventListener('click',function(e){
			it.cancel();
			it.hide();
		});
	}
	if(buttons&&buttons[1]){
		buttons[1].addEventListener('click',function(e){
			it.confirm();
			it.hide();
		});
	}
}

Dialog.prototype.show = function(){
	this.active = true;
	this.element.classList.add('active');
	this.prventScroll();
}

Dialog.prototype.hide = function(){
	this.active = false;
	this.element.classList.remove('active');
	this.resetScroll()
}

Dialog.prototype.cancel = function(){
	 console.log('cancel')
}

Dialog.prototype.confirm = function(){
	console.log('confirm')
}
 
Dialog.prototype.prventScroll=function(){
	var parent = this.element.parentNode;
	this.cssText = parent.style.cssText;
	if(this.active){
		parent.style.height=(window.innerHeight-50)+'px';
		parent.style.overflow='hidden';
	}
}

Dialog.prototype.resetScroll=function(){
	var parent = this.element.parentNode;
	if(this.cssText){
		parent.style.cssText=this.cssText;
	}else{
		parent.removeAttribute('style');
	}
}