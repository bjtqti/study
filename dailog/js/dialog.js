

function Dialog(options){
	if(options.onConfrim){
		this.onConfrim = options.onConfrim;
	}
	if(options.onCancel){
		this.onCancel = options.onCancel;
	}
	this.element = options.element||null;
	this.bindEvent();
}

Dialog.prototype.bindEvent = function(){
	var it = this;
	var element =  this.element;
	if(element === null){
		return false;
	}
	var buttons = element.querySelectorAll('button');
	if(buttons&&buttons[0]){
		buttons[0].addEventListener('click',function(e){
			it.onCancel();
			it.hide();
		});
	}
	if(buttons&&buttons[1]){
		buttons[1].addEventListener('click',function(e){
			it.onConfrim();
			it.hide();
		});
	}
}

Dialog.prototype.onConfrim=function(){
	 
}

Dialog.prototype.onCancel=function(){

}

Dialog.prototype.show = function(){
	this.element.classList.add('active');
}

Dialog.prototype.hide = function(){
	this.element.classList.remove('active');
}