var golbal={
	years:[],
	month:[],
	isActive:false,
	yearId: '#year-swiper',
	monthId: '#month-swiper'
};


function initialData(){
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	for(var i=2013;i<=year+1;i++){
		golbal.years.push(i);
	}

	for(var i=1;i<13;i++){
		golbal.month.push(i);
	}
	golbal.currentYear = year;
	golbal.currentMonth = month;

}

function getCurrentIndex(arr,target){
	var index = 0;
	for(var i=0;i<arr.length;i++){
		if(arr[i]==target){
			index =  i;
			break;
		}
		//console.log(arr,target)
	}
	return index;
}

$(document).ready(function(){
	initialData();
	bootstrap();
})


function renderSwiperNode(id,data,type){
	var node = $(id);
	var html = '<div class="swiper-wrapper">';
	for(var i=0;i<data.length;i++){
		html +=('<div class="swiper-slide">'+data[i]+type+'</div>');
	}
	html += '</div>';
	node.html(html);
	//console.log(wrap,html)
}

function initialSwiper(id,index){
	//console.log(id,initialSlide)
	//日期控件
	return new Swiper(id,{
		direction:'vertical',
		initialSlide:index,
		slidesPerView : 6,
		centeredSlides : true,
		onInit:function(swiper){
			var height = swiper.slides[0].style.height;
			for(var i=0;i<swiper.slides.length;i++){
				swiper.slides[i].style.lineHeight = height;
			}
		},
		onSlideChangeEnd:function(swiper){
			var i = swiper.activeIndex;
			if(id===golbal.yearId){
				golbal.currentYear = golbal.years[i];
			}else if(id===golbal.monthId){
				golbal.currentMonth = golbal.month[i];
			}
		}
	})
}

function bootstrap(){
	var yearSwiper,monthswiper;
	var mask = $('#mask-layer');
	var picker = $('#date-picker');
	var yearIndex = getCurrentIndex(golbal.years,golbal.currentYear);
	var monthIndex = getCurrentIndex(golbal.month,golbal.currentMonth);
	
	renderSwiperNode(golbal.yearId,golbal.years,'年');
	renderSwiperNode(golbal.monthId,golbal.month,'月');
	yearSwiper = initialSwiper(golbal.yearId,yearIndex);
	monthswiper = initialSwiper(golbal.monthId,monthIndex);

	setTimeout(function(){
		yearSwiper.updateContainerSize();
		monthswiper.updateContainerSize();
		var height = yearSwiper.height/6;
		$('#viewport').css({
			height:height+'px',
			lineHeight:height+'px'
		})
	},1000)

	var showpopup = function(){
		if(golbal.isActive){
			return false
		}
		golbal.isActive = true;
		mask.removeClass('hide');
		picker.addClass('active');
	};

	var hidepopup = function(){
		golbal.isActive = false;
		mask.addClass('hide');
		picker.removeClass('active');
	}

	$('#select-month').on('click',function(){
		showpopup();
	});

	mask.on('click',function(){
		hidepopup()
	});

	picker.on('click',function(e){
		var target = e.target;
		var evt = $(target).data('evt');
		if(evt==='cancel'){
			hidepopup();
			return false;
		}
		if(evt==='sure'){
			var date = golbal.currentYear+'/'+golbal.currentMonth
			hidepopup();
			console.log(date)
		}
	})
}