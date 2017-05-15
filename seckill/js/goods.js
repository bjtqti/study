"use strict";

var N = {};

$(document).ready(function(){
	var node = $('.goods-tools').children().eq(1);
	N.toolbar = new Toolbar('.popsize');
	N.collect = new Collect(node);
	N.numberpicker = new NumberPicker('.noptem-size');
	bindEvent();
	initSwiper();
	gotop();
	runSeckillTimer(document.querySelector('#seckill'));
})

function initSwiper(){
	var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination : '.swiper-pagination',
    autoplay:5000
  })      
}

function Toolbar(tag){
	this.node = $(tag);
	this.isReady=false;
	this.active='active';
}

Toolbar.prototype = {
	show:function(){
		this.node.addClass(this.active);
		this.isReady=true;
	},
	hide:function(){
		this.node.removeClass(this.active);
		this.isReady = false;
	},
	buy:function(){
		window.location.href='orderdetails.html';
	}
}

function Collect(tag){
	this.node = $(tag);
	this.active = 'active';
	this.isActive = this.node.hasClass(this.active)?true:false;
}

Collect.prototype={
	save:function(){
		this.isActive = true;
		this.node.addClass(this.active);
	},
	cancel:function(){
		this.isActive = false;
		this.node.removeClass(this.active);
	}
}

function NumberPicker(tag){
	var node = $(tag);
	var btns = node.children();
	this.node = node;
	this.buyed = 1;
	this.plus = btns.eq(0);
	this.input = btns.eq(1);
	this.minus = btns.eq(2);
	this.max = 1000;
	this.min = 1;
	this.bindEvent();
}

NumberPicker.prototype={
	bindEvent:function(){
		var self = this;
		this.node.on('click',function(e){
			if(e.target.value==='+'){
				self.handlePlus();
			}else if(e.target.value==='-'){
				self.handleMinus();
			}
		});
	},
	handlePlus:function(){
		if(this.buyed>=this.max){
			return;
		}
		var buyed = this.buyed+1;
		this.input.val(buyed);
		this.buyed = buyed;
	},
	handleMinus:function(){
		if(this.buyed<=this.min){
			return;
		}
		var buyed = this.buyed-1;
		this.input.val(buyed);
		this.buyed = buyed;
	}
}

function tosell(){
	alert('接口开发中')
}

function bindEvent(){
	var b = N.toolbar,
		c = N.collect;
	document.body.addEventListener('click',function(e){
		var event = e.target.getAttribute('data-event');
		if(!event){
			return;
		}
		switch(event){
			case 'buy':
				b.isReady ? b.buy() : b.show();
				break;
			case 'back':
				b.hide();
				break;
			case 'save':
				c.isActive ? c.cancel():c.save();
				break;
			case 'sell':
				tosell();
				break;
			default:
				break;
		}
	})
	 
}

function runSeckillTimer(wrap){
	var timewrap = wrap.querySelector('.timer');
	var time = timewrap.dataset.time;
	var items = timewrap.children;
	var day = null;
	var hour = $(items[0]);
	var minute = $(items[2]);
	var second = $(items[4]);
	countDown(time,day,hour,minute,second,function(){
		//wrap.querySelector('.header').innerHTML='活动已结束';
	});
}

function countDown(time,day_elem,hour_elem,minute_elem,second_elem,fn){
	//if(typeof end_time == "string")
	var end_time = new Date(time).getTime(),//月份是实际月份-1
	//current_time = new Date().getTime(),
	sys_second = (end_time-new Date().getTime())/1000;
	var timer = setInterval(function(){
		if (sys_second > 0) {
			sys_second -= 1;
			var day = Math.floor((sys_second / 3600) / 24);
			var hour = Math.floor((sys_second / 3600) % 24);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			day_elem && day_elem.text(day);//计算天
			hour_elem.text(hour<10?"0"+hour:hour);//计算小时
			minute_elem.text(minute<10?"0"+minute:minute);//计算分
			second_elem.text(second<10?"0"+second:second);// 计算秒
		} else { 
			clearInterval(timer);
			fn && fn();
		}
	}, 1000);
}
 