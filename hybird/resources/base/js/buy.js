// JavaScript Document
$(document).ready(function(){
	listHeight();

//	screening();
//	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var foot_fix=$(".foot_fix").height();
//	var headH = $(".search_order").height();
	$(".box").css({"height":winH - foot_fix });
}

//删除提示
$(document).ready(function(){
		doubleBtn();
		closePop();
	});
	
	/* 弹出框双按钮 */
	function doubleBtn(){
		$(".cancel").click(function(){
			$(".pop .con").hide();
			$(".pop .con_2").show();
			$(".pop").show();
		})
		$(".delete").click(function(){
			$(".pop2 .con").hide();
			$(".pop2 .con_2").show();
			$(".pop2").show();
		})
		$(".sure").click(function(){
			$(".pop3 .con").hide();
			$(".pop3 .con_2").show();
			$(".pop3").show();
		})
		$(".return").click(function(){
			$(".pop .con").hide();
			$(".pop .con_1").show();
			$(".pop").show();
		})
		closePop();
	}

	function closePop(){
		$(".pop_btn a").on("click",function(){
			$(".pop").hide();
			$(".pop2").hide();
			$(".pop3").hide();
		});
	}

//限制商品标题字数
//$(document).ready(function(){
//	$(".goods_tit,.goods_info .tit").each(function(){
//		var maxwidth=23;
//		if($(this).text().length>maxwidth){
//		$(this).text($(this).text().substring(0,maxwidth));
//		$(this).html($(this).html()+"…");
//		}
//	});
//});


















