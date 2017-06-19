/**
 * 抢购页面
 * @author 蛙哥 <278500368@qq.com>
 * @date 2017/5/13
 */

function main(){
	//默认页面索引
	var activeIndex = 0;
	//时间轴
	var menu = new Swiper('#menu',{
		initialSlide:activeIndex,
		slidesPerView : 'auto',
		freeMode:true,
		onTap:function(s){
			console.log(s.clickedIndex)
			page.slideTo(s.clickedIndex)
		}
	});
	//页面
	var page = new Swiper('#page',{
		initialSlide:activeIndex,
		onInit:function(s){
			for(var i=0;i<s.slides.length;i++){
				var slide = s.slides[i];
				var timewrap = slide.querySelector('.seckill-wrap');
				runSeckillTimer(timewrap);
			}
		},
		onSlideChangeEnd:function(s){
			menu.activeIndex = s.activeIndex;
			menu.updateClasses();
		}
	});
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
		wrap.querySelector('.header').innerHTML='活动已结束';
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
$(document).ready(function(){
	main();
});