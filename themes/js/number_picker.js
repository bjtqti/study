/***
 *	购物车数量加减框
 *  @param options <object>
 *  	element : 加减框最外层元素
 *      decrease: 对应减少的按钮样式名
 *      increase：对应增加的按钮样式名
 *      value   : 加减框的数值
 *      maxValue: 可变化的最大值
 *      minValue: 可变化的最小值
 *  @author <278500368@qq.com>
 *  @version 1.0.0
 */

function Picker(options){
	var config = {
		element:null,
		maxValue:9999,
		minValue:0,
		value:0,
		step:1,
	};
	for(var k in config){
		if(config.hasOwnProperty(k)){
			this[k] = options[k]!==undefined?options[k]:config[k];
		}
	}
	this.bindEvent();
}

Picker.prototype.bindEvent = function(){
	var picker = this.element,
	    it = this;
	if(picker===null){
		return false;
	}
	picker.children[0].addEventListener('click',function(e){
		it.minus();
	});
	picker.children[2].addEventListener('click',function(e){
		it.plus();
	});
	picker.querySelector('input').addEventListener('change',function(e){
		var value = parseInt(e.target.value,10)||0;
		it.change(value);
	});
	this.input = picker.querySelector('input');
	this.input.value = this.value;
	this.disableMinus();
}

Picker.prototype.plus = function(){
	if(this.isDisabledMinus){
		this.enableMinus();
	}
	if(this.value<this.maxValue){
		this.value += this.step;
	}else{
		this.value = this.maxValue;
	}
	if(this.value >=this.maxValue){
		this.disablePlus();
	}
	this.input.value = this.value;
	this.callback(this.value);
}

Picker.prototype.minus = function(){
	if(this.isDisabledPlus){
		this.enablePlus();
	}
	if(this.value>this.minValue){
		this.value -= this.step;
	}else{
		this.value=this.minValue;
	}
	if(this.value<=this.minValue){
		this.disableMinus();
	}
	this.input.value = this.value;
	this.callback(this.value);
}

Picker.prototype.change = function(value){
	this.value = value;
	if(value<this.minValue){
		this.value = this.minValue;
		this.disableMinus();
		this.enablePlus();
	}
	if(value>this.maxValue){
		this.value = this.maxValue;
		this.disablePlus();
		this.enableMinus();
	}
	if(value > this.minValue && value < this.maxValue){
		this.enableMinus();
		this.enablePlus();
	}
	this.input.value = this.value;
	this.callback(this.value);
}

Picker.prototype.addClass = function(element,className){
	element.classList.add(className);
}

Picker.prototype.removeClass = function(element,className){
	element.classList.remove(className);
}

Picker.prototype.disableMinus=function(){
	var element = this.element.children[0];
	this.addClass(element,'disabled');
	this.isDisabledMinus = true;
}

Picker.prototype.enableMinus=function(){
	var element = this.element.children[0];
	this.removeClass(element,'disabled');
	this.isDisabledMinus = false;
}

Picker.prototype.disablePlus=function(){
	var element = this.element.children[2];
	this.addClass(element,'disabled');
	this.isDisabledPlus = true;
}

Picker.prototype.enablePlus=function(){
	var element = this.element.children[2];
	this.removeClass(element,'disabled');
	this.isDisabledPlus = false;
}

Picker.prototype.callback = function(value){

}