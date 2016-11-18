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
<title>${currentName}-友阿微商城</title>
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

<body class="index-box">
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
    <header>
    	<ul>
    	<!-- 运营入口  begin -->
    	<#if pageList??>
          <#list pageList as page>
            <#if page.manageCode == currentPage>
        	  <li class="current"><a href="${SERVER_WAP_INDEX}/${page.channel!}"><span>${page.manageName!}</span></a></li>
        	<#else>
              <li><a href="${SERVER_WAP_INDEX}/${page.channel!}"><span>${page.manageName!}</span></a></li>
            </#if>
          </#list>
        </#if>
        <!-- 运营入口  end -->    
        </ul>
    </header>
    
    
    <#if floorList??>
	<#list floorList as floor>
	
	
	
	<#if floor.templeteStyle = "BANNER">
	<!-- BANNER -->
    <!-- 轮播图 begin-->
    
    <div id="banner_${floor_index}" class="banner">
        <div class="hd">
            <ul></ul>
        </div>
        <div class="bd">
            <ul>
             <#if floor.activityList??>
			  <#list floor.activityList as banner>
                <li><a href="${banner.activityUrl!}"><img src="${IMAGE_DOMAIN}${banner.imageUrl!}" alt="" /></a></li>
              </#list>
			 </#if>
            </ul>
        </div>
    </div>
    <script type="text/javascript">
        /* 移动幻灯事件 */
		TouchSlide({ 
			slideCell:"#banner_${floor_index}",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			autoPlay:true,//自动播放
			autoPage:true //自动分页
		});
    </script>
    <!-- 轮播图 end-->
    </#if>
    
    
	
	    <#if floor.templeteStyle = "ACTIVITY_TWO">
	      <!--ACTIVITY_TWO 专场活动 2组活动模板begin-->
		    <#if floor.activityList??>
		    <div class="activity-2 clearfix">
		      <#list floor.activityList as activity_zc>
		    	<span>
		    		<a href="${activity_zc.activityUrl!}"><img src="${IMAGE_DOMAIN}${activity_zc.imageUrl!}" /></a>
		        </span>
		      </#list>
		    </div>
		    </#if>
		  <!--专场活动 2组活动模板 end-->
	    </#if>
	    
      
	   <#if floor.templeteStyle = "ACTIVITY_THREE">
	   <!-- ACTIVITY_THREE 专场活动 3组活动模板   begin-->
	    <div class="activity-1">
	      <#if floor.activityList??>
	      <#list floor.activityList as activity_zc>
	        <#if activity_zc_index==0>
	    	  <span>
	    		<a href="${activity_zc.activityUrl!}"><img src="${IMAGE_DOMAIN}${activity_zc.imageUrl!}" /></a>
	          </span>
	        </#if>
            <#if activity_zc_index==1>
	          <span>
	    		<a href="${activity_zc.activityUrl!}"><img src="${IMAGE_DOMAIN}${activity_zc.imageUrl!}" /></a>
	    		</#if>
	    		<#if activity_zc_index==2>
	            <a href="${activity_zc.activityUrl!}"><img src="${IMAGE_DOMAIN}${activity_zc.imageUrl!}" /></a>
	          </span>
	        </#if>
	      </#list>  
	      </#if>
	    </div>
	    <!--专场活动 3组活动模板 end-->
       </#if>
	
    <#if floor.templeteStyle = "ACTIVITY_TJ1">
    <!--ACTIVITY_TJ1 单品推荐 单组 模板begin-->
    <#if floor.activityList??>
    <div class="single-recommend">
    	<span class="title">单品推荐</span>
        <div class="goods-list clearfix">
            <#list floor.activityList as activity_dptj>
            <#if activity_dptj.activityProductList?? && activity_dptj.activityProductList?size gt 0>
            <#list activity_dptj.activityProductList as product>
            <a class="one-a"  href="${SERVER_WAP_SHOP}/sp-${product.singleCode}.h" data-id="${product.singleCode}">
            	<div>
                	<div class="pic">
                        <img class="lazy" data-original="${product.imageUrl!}" />
                        <span class="store">友阿奥特莱斯</span>
                        <div class="sold-out hide"></div> <!-- 售罄则  显示此行 -->
                    </div>
                    <!-- 下架打标代码 begin -->
                    <div class="off-shelf hide">
                    	<span></span>
                    </div>
                    <!-- 下架打标代码 end -->
                    <div class="detail ">
                        <span>${product.title!}</span>
                        <em>¥${product.salesPrice!}</em>
                    </div>
                </div>
            </a>
            </#list>
            </#if>
            </#list>
        </div>
    </div>
    </#if>
    <!--单品推荐 单组 模板end-->
	</#if>


    <#if floor.templeteStyle = "ACTIVITY_TJ2">
    <!--ACTIVITY_TJ2 单品推荐 两组 模板begin-->
    <#if floor.activityList??>
    <div class="single-recommend">
    	<span class="title">单品推荐</span>
        <div class="goods-list clearfix">
          <#list floor.activityList as activity_dptj>
          <#if activity_dptj.activityProductList?? && activity_dptj.activityProductList?size gt 0>
          <#list activity_dptj.activityProductList as product>
            <a class="two-a" href="${SERVER_WAP_SHOP}/sp-${product.singleCode}.h" data-id="${product.singleCode}">
            	<div>
                	<div class="pic">
                        <img class="lazy" data-original="${product.imageUrl!}" />
                        <span class="store">友阿奥特莱斯</span>
                        <div class="sold-out hide"></div>  <!-- 售罄则  显示此行 -->
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
          </#list>   
        </div>
    </div>
    </#if>
    <!--单品推荐 两组 模板end-->
	</#if>
	
    </#list>
	</#if>
    
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
