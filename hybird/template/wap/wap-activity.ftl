<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Cache-Control" content="no-cache">
<meta name="format-detection" content="telephone=no">
<title>${activityTitle}</title>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/base.css?version=${VERSION}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/index.css?version=${VERSION}">
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/flexible.js?version=${VERSION}"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery-1.8.3.min.js?version=${VERSION}"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery.lazyload.js?version=${VERSION}"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/common.js?version=${VERSION}"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/TouchSlide.1.1.js?version=${VERSION}"></script>
<script type="text/javascript">
    var SERVER_WAP_SHOP = "${SERVER_WAP_SHOP}";
	$(document).ready(function(){
		$("#load-box").hide();
	    popSet();
		toTop();
		//picSet();
		
		$("img.lazy").lazyload({
			placeholder : "${SERVER_WAP_SHOP}/resources/base/images/load.gif",
			effect: "fadeIn"
		});
		
	});
</script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<div class="spinner">
        <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
	</div>
</div>

<div class="index">
    
    <!-- banner -->
    <div id="banner" class="banner">
        <div class="hd">
            <ul></ul>
        </div>
        <div class="bd">
            <ul>
                <li><img src="${IMAGE_DOMAIN}${activity.bannerImageUrl!}" alt="" /></li>
            </ul>
        </div>
    </div>
    
    <div class="single-recommend">
    	<span class="title">${activityTitle}</span>
        <div class="goods-list clearfix">
        <#if activity??>
        <#if activity.activityProductList?? && activity.activityProductList?size gt 0>
		  <#list activity.activityProductList as product>
            <a class="two-a" href="${SERVER_WAP_SHOP}/sp-${product.singleCode!}.h"  data-id="${product.singleCode}">
            	<div>
                	<div class="pic">
                        <img class="lazy" data-original="${product.imageUrl!}" />
                        <span class="store">友阿奥特莱斯</span>
                        <div class="sold-out  hide"></div><!-- 售罄则  显示此行 -->
                    </div>
                    <!-- 下架打标代码 begin -->
                    <div class="off-shelf hide">
                    	<span></span>
                    </div>
                    <!-- 下架打标代码 end -->
                    <div class="detail">
                        <span>${product.title!}</span>
                        <em>¥${product.salesPrice!}</em>
                    </div>
                </div>
            </a>
          </#list>
        </#if> 
        </#if>    
        </div>
    </div>
    
</div>

<footer>
    <a href="${SERVER_WAP_INDEX}" class="hover"><i></i>首页</a>
    <a href="${SERVER_WAP_SHOP}/store/storetList.h"><i></i>分类</a>
    <a href="${SERVER_WAP_SHOP}/cart/cartList.h"><i></i>购物车</a>
    <a href="${SERVER_WAP_SHOP}/membercenter.h"><i></i>我的</a>
</footer>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/index.js?version=${VERSION}"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/index.js?version=${VERSION}"></script>
</body>
</html>
