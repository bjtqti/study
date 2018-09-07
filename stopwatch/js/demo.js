/**
 * 秒表
 * @param id || HTMLElement
 * @author <278500368@qq.com>
 * @date 27/08/2018
 */


function Stopwatch(id){
	var container;
	if(({}).toString.call(id)==='[object HTMLElement]'){
		container = id;
	}else{
		container = document.getElementById(id);
	}
	this.container = container;
	this.init();
}


Stopwatch.prototype = {

	init:function(){

	},

	start:function(){

	},

	stop:function(){

	},

	count:function(){

	},

	reset:function(){

	},

	update:function(){
		
	}
}

