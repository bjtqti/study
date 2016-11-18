// JavaScript Document

$(document).ready(function(){
	searchOrder();
	listHeight();
	screening();
	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var headH = $(".search_order").height();
	var marginH = parseInt($(".goods-list").css("margin-top"))*2;
	$(".goods-list").css({"height":winH - headH - footH - marginH});
	$(".menu-list").css({"height":winH - headH - footH});
	$(".second-slider .list-fold").css({"height":winH - headH});
	
}

/* 点击 默认/价格/销量 */
function searchOrder(){
	$(".search_order > a").on('click', function(){
		
		if($(this).hasClass("jiage active")){
			$(this).addClass("jiageDouble");
			$(".search_order > a").removeClass("active");
		}else if($(this).hasClass("jiage jiageDouble")){
			$(this).addClass("active");
			$(".search_order > a").removeClass("jiageDouble");
		}else{
			$(".search_order > a").removeClass("active jiageDouble");
			$(this).addClass("active")
		}
	})
}

/* 点击筛选 */
function screening(){
	$(".search_order .xiaoliang").on('click', function(){
		$(".menu-slider").addClass("rollIn-slideLeft");
		$(".home-page").addClass("rollOut-slideLeft");
	});
	screenFirst();
}

//进入一级筛选
function screenFirst(){
	//折叠
	$(".menu-slider .list-fold-box .tit").on("click",function(){
		if($(this).parent().hasClass("menuCls")){
			$(this).parent().removeClass("menuCls");
		}else{
			$(this).parent().addClass("menuCls");
		}
	});
	
	//点击筛选条件
	$(".menu-slider .list-fold-box > div span").on("click",function(){
		var thisIndex = $(this).index();
		
		
		
		if($(this).hasClass("act")){
			
			$(this).removeClass("act");
			
			if($(this).parent().find(".act").length == 0){
				$(this).parent().find("span:first").addClass("act");
			}

		}else{
			
			if(thisIndex != 0){
				$(this).parent().find("span:first").removeClass("act");
			}else{
				$(this).parent().find("span").removeClass("act");
			}
			
			$(this).addClass("act");
		}
	});
	
	//取消
	$(".menu-head .cancel-btn").on("click",function(){
		$(".menu-slider,.second-slider").removeClass("rollIn-slideLeft");
		$(".home-page").removeClass("rollOut-slideLeft");
	});
	
	//确定
	$(".menu-sure").on("click",function(){
		$(".menu-slider,.second-slider").removeClass("rollIn-slideLeft");
		$(".home-page").removeClass("rollOut-slideLeft");
	});
	
	//清除
	$(".menu-head .clear-btn").on("click",function(){
		$(".list-fold-box > div").each(function(index, element) {
            $(this).find("span").removeClass("act");
			$(this).find("span:first-child").addClass("act");
			$(".second-slider .list-fold-box > div span.act").removeClass("act");
			kindSel();
        });
	});
	kindSel();
	screenSecond();
}

//分类选择
function kindSel(){
	var ifOpen = false;
	$(".second-slider .list-fold-box > div span").each(function(index, element) {
        if($(this).hasClass("act")){
			ifOpen = true;
		}
    });
	if(ifOpen){
		var kind_1 = $(".second-slider .list-fold-box > div span.act").parent().prev().text();
		var kind_2 = $(".second-slider .list-fold-box > div span.act").text();
		$(".menu-list .kind span").text(kind_1+"-"+kind_2);
	}else{
		$(".menu-list .kind span").text("全部分类");
	}
}

//进入二级筛选
function screenSecond(){
	$(".menu-list .kind").on("click",function(){
		$(".second-slider").addClass("rollIn-slideLeft");
	});
	
	$(".second-slider .list-fold-box .tit").on("click",function(){
		if($(this).parent().hasClass("topCls")){
			$(this).parent().removeClass("topCls");
		}else{
			$(this).parent().addClass("topCls");
		}
	});
	
	$(".second-slider .list-fold-box > div span").on("click",function(){
		$(".second-slider .list-fold-box > div span").removeClass("act")
		$(this).addClass("act");
		kindSel();
		$(".second-slider").removeClass("rollIn-slideLeft");
	})
	
}