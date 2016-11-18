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
<title>排序</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/order.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery.lazyload.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script>
    var sslHost = "${SERVER_SSL_SCORE}",
        appKey = "${APP_KEY}",
        baseRoot="${SERVER_WAP_SHOP}",
        totalCount = ${totalCount!0},
        pageSize = ${pageSize!15},
        imgServer="${SERVER_IMG_WEB}";
</script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
<#include "common/loading.ftl">
</div>
<div class="box"> 
	<div id="main" class="home-page rollOut-animate">
        <div class="search_order">
            <a href="javascript:;" class="moren active">
                <span><i></i>默认</span>
            </a>
            <a href="javascript:;" class="jiage">
                <span><i></i>价格</span>
            </a>
            <a href="javascript:;" class="xiaoliang">
                <span><i></i>筛选</span>
            </a>
        </div>
        <#if productSingleObjectList??>
        <div id="page-node" class="goods-list scroll-div clearfix">
            <#list productSingleObjectList  as product>
            <a href="${SERVER_WAP_SHOP}/sp-${product.code}.h">
                <div>
                    <div class="pic">
                        <img class="lazy" data-original="${product.picListWap[0].url}" />
                        <span class="store">${product.counter.storeName}</span>
                    </div>
                    <div class="detail">
                        <span>${product.title}</span>
                        <em>¥${product.salesPrice?string('0.00')}</em>
                    </div>
                </div>
            </a>
            </#list>
        </div>
        <#else>
        <div class="empty">
            <img src="${SERVER_WAP_SHOP}/resources/images/empty_order.png" />
            <span>没有找到符合筛选的商品</span>
            <a href="javascript:history.back()">重新筛选</a>
        </div>
        </#if>
    </div>
    <div id="menu-slider" class="menu-slider rollIn-animate">
    	<div class="menu-head">
        	<a href="javascript:;" class="cancel-btn">取消</a>
            <span>筛选</span>
            <a href="javascript:;" class="clear-btn">清除</a>
        </div>
        <div class="menu-list">
        	<a href="javascript:;" class="kind">
            	<em>分类</em>
                <span id="selector-type">全部分类</span>
                <i class="right-icon"></i>
            </a>
            <div id="side-bar" class="list-fold"></div>
        </div>
        <div class="nav-btn">
            <a href="javascript:;" class="menu-sure">确认</a>
        </div>
    </div>
    <div id="sub-menu-slider" class="second-slider rollIn-animate">
    	<div class="second-head">全部分类</div>
        <div id="sub-side-bar" class="list-fold">
        </div>
    </div>
</div>
<#include "common/foot.ftl">
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/product/list.js?t=${version}"></script>
</body>
</html>
