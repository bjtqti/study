/**
 * 对话框
 * @param message 消息内容
 * @param [options] 可选的配置信息
 */

function Dialog(message,options){
	var defaultConfig = this.config,
		options = options || {};
	for(var i in defaultConfig){
		if(options[i]!== undefined){
			this[i] = options[i];
		}else{
			this[i] = defaultConfig[i];
		}
	}
	this.createBox(message);
	this.bindEvent();
}

Dialog.prototype.bindEvent = function(){
	this.container.addEventListener('click',this,false);
}

Dialog.prototype.handleEvent = function(e){
	var button = e.target.innerHTML;
	if(button ===this.cancelText){
		this.onCancel();
		return false;
	}
	if(button===this.confirmText){
		this.onConfrim();
		return false;
	}
}

Dialog.prototype.show = function(){
	this.container.classList.add('active');
}

Dialog.prototype.hide = function(){
	this.container.classList.remove('active');
}

Dialog.prototype.config = {
	active:false,
    title:'提示',
    confirmText:"确定",
    cancelText:"取消",
    onlyConfirm:false,
    onConfrim:function(){},
    onCancel:function(){}
}

Dialog.prototype.createBox = function(message){
	var container = document.createElement('div');
	container.setAttribute('class','dialog-container');
	var html = '<div class="dialog">'+
					'<div class="dialog-title">'+this.title+'</div>'+
					'<div class="dialog-content">'+message+'</div>'+
					'<div class="dialog-btns">'+
						(this.onlyConfirm ? 
							'<button>'+this.confirmText+'</button>':
							'<button>'+this.cancelText+'</button><button>'+this.confirmText+'</button>')+
					'</div>'+
				'</div>';
	container.innerHTML = html;
	this.container = container;
	document.body.appendChild(container);
}