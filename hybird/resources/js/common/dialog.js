/**
 * 对话框
 * @param message 消息内容
 * @param [options] 可选的配置信息
 * @author <278500368@qq.com>
 * @example
 * var d = new Dialog('确定要删除吗？');
 * var d = new Dialog('确定要删除吗?',{
 *      confirmText:'是',
 *      cancelText:'否',
 *      onConfrim:function(){
 *			//执行选择是的回调
 *      }	
 * })
 */

function Dialog(message,options){
	var _default = {
	    confirmText:"确定",
	    cancelText:"取消",
	    onlyConfirm:false,
	    title:null,
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
	if(options.title){
		this.createMessageBox(message);
	}else{
		this.createConfirmBox(message);
	}
}
/**
 * 绑定事件
 * @param {Event} e 事件对象
 */
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
/**
 * 简易对话框
 * @param {string} message 消息
 */
Dialog.prototype.createConfirmBox = function(message){
	var container = document.createElement('div');
	container.setAttribute('class','dialog-container');
	var html = '<div class="dialog">'+
		'<div class="dialog-content">'+message+'</div>'+
		'<div class="dialog-btns">'+
			(this.onlyConfirm ? '<button class="only">'+this.confirmText+'</button>':
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
/**
 * 带标题和修饰图片的对话框
 * @param {string} message 消息
 */
Dialog.prototype.createMessageBox = function(message){
	var container = document.createElement('div');
	container.setAttribute('class','dialog-container');
	var html = '<div class="dialog">'+
		'<div class="dialog-body">'+
			'<div class="dailog-title">'+this.title+'</div>'+
			'<div class="dialog-message">'+message+'</div>'+
		'</div>'+
		'<div class="dialog-btns">'+
			(this.onlyConfirm ? '<button class="only">'+this.confirmText+'</button>':
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

/**
 * 自动消失的提示信息
 * @desc 静态方法
 * @param {string} message 消息
 * @param {number} sec 毫秒数
 * @example
 *   Dialog.tips('提示信息...');
 */
Dialog.tips = function(message,sec){
	if(Dialog.status==='running'){
		return;
	}
	Dialog.status='running';
	var container = document.createElement('div');
	container.setAttribute('class','tips-wrap');
	container.innerHTML = '<span class="text">'+message+'</span>';
	document.body.appendChild(container);
	setTimeout(function(){
		document.body.removeChild(container);
		Dialog.status = null;
	},sec||3000);
}


/**
 * 锁屏动画
 * @desc 静态方法
 * @param {string} message 消息
 * @example
 *   var d = Dialog.lock();
 *   d.show();
 *   d.hide();
 */
Dialog.lock = {
	container:null,
	message:'请稍候...',
	init:function(message){
		var container = document.createElement('div'),
			mesgBox = document.createElement('div'),
			spinner = document.createElement('div'),
			wrap,circle;
		container.className='dialog-lock-con';
		spinner.className='spinner';
		for(var i=0;i<4;i++){
			wrap = document.createElement('div');
			wrap.className='spinner-container container'+i;
			for(var j=1;j<5;j++){
				circle = document.createElement('div');
				circle.className='circle'+j
				wrap.appendChild(circle);
			}
			spinner.appendChild(wrap);
		}
		container.appendChild(spinner);
		mesgBox.className='message';
		mesgBox.innerHTML= message||this.message;
		container.appendChild(mesgBox);
		document.body.appendChild(container);
		this.container=container;
		return this;
	},
	show:function(message){
		var container = this.container,
			mesgBox;
		if(container){
			mesgBox = container.querySelector('.message');
			mesgBox.innerHTML = message||this.message;
			container.style.display = 'block';
		}else{
			this.init(message);
		}
	},
	hide:function(){
		if(this.container){
			this.container.style.display = 'none';
		}
	}
}