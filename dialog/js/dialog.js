/**
 * 对话框
 * @param message 消息内容
 * @param [options] 可选的配置信息
 */

function Dialog(message,options){
	var _default = {
	    confirmText:"确定",
	    cancelText:"取消",
	    onlyConfirm:false,
	    onConfrim:function(){}
	};
	options = options || {};
	for(var i in _default){
		if(options[i]!== undefined){
			this[i] = options[i];
		}else{
			this[i] = _default[i];
		}
	}
	this.createBox(message);
}

Dialog.prototype.handleEvent = function(e){
	var button = e.target.innerHTML;
	e.preventDefault();
	if(e.target.tagName.toLowerCase()==='button'){
		this.container.removeEventListener('click',this,false);
		document.body.removeChild(this.container);
	}
	if(button ===this.cancelText){
		return false;
	}
	if(button===this.confirmText){
		this.onConfrim();
		return false;
	}
}

Dialog.prototype.createBox = function(message){
	var container = document.createElement('div');
	container.setAttribute('class','dialog-container');
	var html = '<div class="dialog">'+
					'<div class="dialog-content">'+message+'</div>'+
					'<div class="dialog-btns">'+
						(this.onlyConfirm ? '<button>'+this.confirmText+'</button>':
						'<button>'+this.cancelText+'</button><button>'+this.confirmText+'</button>')+
					'</div>'+
				'</div>';
	container.innerHTML = html;
	container.addEventListener('click',this,false);
	this.container = container;
	document.body.appendChild(container);
	setTimeout(function(){
		container.classList.add('active');
	},50)
}

//-----------
Dialog.tips = function(message,sec){
	var container = document.createElement('div');
	container.setAttribute('class','tips-wrap');
	container.innerHTML = '<span class="text">'+message+'</span>';
	document.body.appendChild(container);
	setTimeout(function(){
		document.body.removeChild(container);
	},sec||3000);
}
