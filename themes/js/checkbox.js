
function Checkbox (options){
	var config = {
		element:null,
		checked:false
	};
	for(var k in config){
		if(config.hasOwnProperty(k)){
			this[k] = options[k]!==undefined?options[k]:config[k];
		}
	}
	if(this.element===null){
		return false;
	}
	this.checked ? this.on() : this.off();
	this.bindEvent();
}

Checkbox.prototype.bindEvent = function(){
	var it = this;
	this.element.addEventListener('click',function(){
		it.handleToggle();
	});
}

Checkbox.prototype.handleToggle = function(){
	var isChecked = !this.checked;
	isChecked ? this.on() : this.off();
	this.callback(isChecked); 
}

Checkbox.prototype.on = function(){
	this.element.querySelector('span').className = 'on';
	this.checked = true;
}

Checkbox.prototype.off = function(){
	this.element.querySelector('span').className = 'off';
	this.checked = false;
}

Checkbox.prototype.callback = function(isChecked){
	 
}