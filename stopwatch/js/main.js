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

/**
 * 原型方法
 */
Stopwatch.prototype = {

	init:function(){
		var container = this.container;
		if(!container){
			console.warn('参数不正确:Stopwatch(id)')
			return false;
		}
		var html = this.createWatchHTML();
		container.innerHTML = html;
		this.status = 'STOP';
		this.recordList = [];
		this.record = container.querySelector('.watch-list');
		this.display = container.querySelector('.time');
		this.renderList();
		this.bindEvent();
	},


	bindEvent:function(){
		var control = this.container.querySelectorAll('button');
		this.startButton = control[1];
		this.resetButton = control[0];
		var watch = this;
		this.startButton.addEventListener('click',function(){
			if(watch.status==='STOP'){
				watch.start();
			}else{
				watch.stop();
			}
		},false);
		this.resetButton.addEventListener('click',function(){
			if(watch.status==='START'){
				watch.count()
			}else{
				watch.reset();
			}
		},false);
	},

	/**
	 * 开始
	 */
	start:function(){
		console.log('start...')
		if(this.status === 'START'){
			return false;
		}
		var watch = this;
		this.status = 'START';
		this.startButton.parentNode.className='start active';
		this.resetButton.parentNode.className='reset active';
		this.startButton.innerHTML='停止';
		this.resetButton.innerHTML='计次';
		this.time = 0;
		this.timerID = setInterval(function(){
			watch.time++;
			var data = watch.update();
			watch.recordList[0] = data;
			watch.renderList()
		},10)
	},

	/**
	 * 停止
	 */
	stop:function(){
		// console.log('stop...')
		if(this.status === 'STOP'){
			return false;
		}
		this.status = 'STOP';
		this.startButton.parentNode.className='start';
		this.startButton.innerHTML='开始';
		this.resetButton.innerHTML='复位';
		clearInterval(this.timerID);
	},

	/**
	 * 复位
	 */
	reset:function(){
		// console.log('reset...')
		this.time = 0;
		this.recordList = [];
		this.resetButton.innerHTML = '计次';
		this.resetButton.parentNode.className='reset';
		this.timerID && clearInterval(this.timerID);
		this.update();
		this.renderList()
	},

	/**
	 * 计次
	 */
	count:function(){
		var data = this.format();
		this.recordList.push(data);
		this.time = 0;
	},

	/**
	 * 更新数据
	 */
	update:function(){
		var data = this.format();
		var elemetns = this.display.children;
		for(var i = 0;i<3;i++){
			elemetns[i].innerText = data[i];
		}
		return data;
	},

	/**
	 * 数据格式化
	 */
	format:function(){
		var msecond = this.time % 100;
		var second = parseInt(this.time / 100);
		var minute = parseInt(second / 60 )
		var arr = [minute,second,msecond];
		for(var i=0;i<3;i++){
			arr[i] = arr[i] < 10 ? '0'+arr[i] : arr[i]+''
		}
		return arr;
	},
	/**
	 * 显示记录
	 */
	renderList:function(){
		var record = this.record;
		var list = this.recordList;
		var li = '',i=0,length = list.length;
		for(;i<length;i++){
			var time = list[i][0]+':'+list[i][1]+'.'+list[i][2]
			var html = '记次'+(length-i)+'<i>'+time+'</i>';
			li += '<li>'+html+'</li>';
		}
		for(i;i<3;i++){
			li += '<li></li>';
		}
		record.innerHTML = li;
	},

	/**
	 * 生成秒表的结构
	 */

	createWatchHTML:function(){
		var html = '<header class="title">秒表</header>\
		<section class="time">\
			<span>00</span><span>00</span><span>00</span>\
		</section>\
		<div class="control">\
			<div class="reset"><button>计次</button></div>\
			<div class="start"><button>启动</button></div>\
		</div>\
		<ul class="watch-list"></ul>';
		return html;
	}
}

 
