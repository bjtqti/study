

function Dialog(options){
	var config = {
    	onConfrim:function(){},
    	onCancel:function(){}
	};
	for(var k in config){
		if(config.hasOwnProperty(k)){
			this[k] = options[k]!==undefined?options[k]:config[k];
		}
	}
	if(!options.element){
		return false;
	}
	this.bindEvent();
}

Dialog.prototype.bindEvent = function(){
	var it = this,
	    buttons = this.element.querySelectorAll('button');
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

Dialog.prototype.show = function(){
	this.element.classList.add('active');
}

Dialog.prototype.hide = function(){
	this.element.classList.remove('active');
}