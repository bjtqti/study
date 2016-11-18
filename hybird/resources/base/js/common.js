// JavaScript Document

$(document).ready(function(){
	$("#load-box").hide();
    popSet();
	toTop();
	picSet();
	
	$("img.lazy").lazyload({
		placeholder : "images/load.gif",
		effect: "fadeIn"
	});
	
});

/* 线条精度 */
function lineSet(obj){
	if (window.devicePixelRatio && devicePixelRatio >= 2) {
		var testElem = document.createElement('div');
		testElem.style.border = '.5px solid transparent';
		document.body.appendChild(testElem);
		if (testElem.offsetHeight == 1){
			$(obj).css({"border-width":".5px"});
		}
		document.body.removeChild(testElem);
	}
}

function picSet(){
	$(".goods-list a img").css("height",$(".goods-list a img").width());
}

function popSet(){
	var winW = $(window).width();
	var winH = $(window).height();
	$(".pop,.pop2,.pop3,.pop_mask").css({"width":winW,"height":winH});
	$(window).resize(function(){
		var winW = $(window).width();
		var winH = $(window).height();
		$(".pop,.pop_mask").css({"width":winW,"height":winH});
	});
	
	$(".pop_btn a.cancel").click(function(){
		$(".pop").hide();
	})
}

/* 置顶按钮 */
function toTop(){
	var windowH = $(window).height();
	$(window).scroll(function(){
		var activeTop = $(window).scrollTop();
		if(activeTop > (windowH/3)){
			$(".toTop").show();
		 }else{
			 $(".toTop").hide();
		 }
	})
	$(".scroll-div").scroll(function(){
		var activeTop = $(".page-current").scrollTop();
		if(activeTop > (windowH/3)){
			$(".toTop").show();
		 }else{
			 $(".toTop").hide();
		 }
	})
	$(".scroll-div1").scroll(function(){
		var activeTop = $(this).scrollTop();
		if(activeTop > (windowH/3)){
			$(".toTop").show();
		 }else{
			 $(".toTop").hide();
		 }
	})

	$(".toTop").click(function(){
		 $("html,body,.page-current,.scroll-div1").animate({scrollTop: '0px'}, 500);
	});

}

/* 提示框 */
function tipBtn(){
	$(".tips").show();
	setTimeout("$('.tips').hide();",3000)
}

//切换tabs
function pageSwitch(nowP,activeP){
	
	var direction;

	if (nowP < activeP) { 
		direction = 0;
	}else{
		direction = 1;
	};

	var pageIndex = nowP;
	var lastPage = ".page-"+activeP;

	var nowPage = ".page-"+pageIndex;

	switch(direction) {
		case 0:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
		case 1:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
	}
	isAnimating = true;
	$(lastPage).removeClass("hide");
	
	$(nowPage).addClass(outClass);
	$(lastPage).addClass(inClass);
	
	setTimeout(function(){		
		$(nowPage).removeClass('page-current');
		$(nowPage).removeClass(outClass);
		$(nowPage).addClass("hide");
		
		$(lastPage).addClass('page-current');
		$(lastPage).removeClass(inClass);

		isAnimating = false;
	},600);

}