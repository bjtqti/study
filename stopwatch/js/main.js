/**
 * 秒表
 */

function Stopwatch(node,list){
	var elemetns = node.children;
	this.elemetns = elemetns;
	this.listNode = list;
	this.reset();
}


Stopwatch.prototype = {

	/**
	 * 开始
	 */
	start:function(){
		//console.log('start...')
		if(this.status === 'START'){
			return false;
		}
		var it = this;
		this.status = 'START';
		this.time = 0;
		this.timerID = setInterval(function(){
			it.time++;
			var data = it.update();
			it.recordList[0] = data;
			it.renderList()
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
		clearInterval(this.timerID);
	},

	/**
	 * 复位
	 */
	reset:function(){
		// console.log('reset...')
		this.status = 'STOP';
		this.time = 0;
		this.recordList = [];
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
		var elemetns = this.elemetns;
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
			arr[i] = arr[i] < 10 ? '0'+arr[i] : arr[i]
		}
		return arr;
	},
	/**
	 * 显示记录
	 */
	renderList:function(){
		var node = this.listNode;
		var list = this.recordList;
		var li = '',i=0,length = list.length;
		for(;i<length;i++){
			var time = list[i][0]+':'+list[i][1]+'.'+list[i][2]
			var html = '<span>记次'+(length-i)+'</span><b>'+time+'</b>';
			li += '<li>'+html+'</li>';
		}
		for(i;i<3;i++){
			li += '<li></li>';
		}
		node.innerHTML = li;
	}
}


function bootstrap (){
	var time = document.getElementsByTagName('section')[0];
	var start = document.querySelector('.start');
	var reset = document.querySelector('.reset');
	var list = document.querySelector('.watch-list');
	var watch = new Stopwatch(time,list);

	start.addEventListener('click',function(){
		if(watch.status==='STOP'){
			watch.start();
			start.className = 'starting';
			start.innerText = '停止';
			reset.className += ' active';
			reset.innerText = '计次';
		}else{
			watch.stop();
			start.innerText = '启动';
			start.className = 'start';
			reset.innerText = '复位';
			//reset.className = 'reset';
		}
	},false);

	reset.addEventListener('click',function(){
		if(watch.status === 'START'){
			watch.count();
		}else if(watch.status === 'STOP'){
			watch.reset();
		}
	},false)
}


if(typeof window.addEventListener){
    window.addEventListener("DOMContentLoaded",bootstrap);
}else{
    window.attachEvent('onload',bootstrap);
}

