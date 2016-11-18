// JavaScript Document

$(document).ready(function(){
	goodsH();
	goodsFav();
	goods_buy();
	lineSet(".inve,.inve span.invel,.inve span.inver,.info-promotion i,.info-name .goods_fav span,.info-name,.comList,.goodsBtns,a.goods_add,a.goods_buy,.goodsSure > img,.select a,.inve span.invel,.inve span.inver,.inve input.invev,a.goods-add,a.goods-buy,.goodsSureBtn");
});

/* 移动幻灯事件 */
TouchSlide({ 
	slideCell:"#banner",
	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
	mainCell:".bd ul", 
	effect:"leftLoop", 
	autoPlay:true,//自动播放
	autoPage:true //自动分页
});

function goodsH(){
	var winH = $(window).height();
	var footH = $(".goodsBtns").height()+1;
	$(".goods").css({"height":winH - footH});
}

/* 收藏 */
function goodsFav(){
	$(".goods_fav").click(function(){
		if($(this).hasClass("been")){
			$(this).removeClass("been");
		}else{
			$(this).addClass("been");
			tipBtn();
		}
	});
}

/* 规格弹出弹框 */
function goods_buy(){
	var winW = $(window).width();
	var winH = $(window).height();
	$(".goodsDialog,.mask").css({"width":winW,"height":winH});
	$(".info-spec").click(function(){
		$(".goodsDialog").css({"bottom":"0"});
		$(".mask").show();
	})
	$(".goodsDialog .con .icon-close").on('click', function(){
		$(".goodsDialog").css({"bottom":"-100%"});
		$(".mask").hide();
	})
	sizeColor();
}

/* 选择尺码/颜色和数量 */
function sizeColor(){
	$(".size-select a").click(function(){
		if($(this).hasClass("dis")){
		}else{
			$(this).parent(".select").find("a").removeClass("active");
			$(this).addClass("active");
		}
	});

	
	// 数目加减
	var obj = $('.inve'),
		oPrev = obj.find(".invel"),
		oInp = obj.find(".invev"),
		oNext = obj.find(".inver"),
		iNum = 1;
		
	// 点击减数
	oPrev.click(function(){
		iNum = oInp.val();
		if(iNum-1 <= 0){
			iNum = 1;
			alert("1件起售");
			return false;
		}else{
			iNum--; 
		}
		oInp.val(iNum);
	});
	// 点击加数
	oNext.click(function(){
		iNum = oInp.val();
		iNum++;
		oInp.val(iNum);
	}); 
}