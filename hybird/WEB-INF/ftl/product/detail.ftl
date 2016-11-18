<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Cache-Control" content="no-cache">
<meta name="format-detection" content="telephone=no">
<title>${detail.title}-商品详情</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/goods.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/lib/TouchSlide.1.1.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var sslHost = "${SERVER_SSL_SCORE}",
        appKey = "${APP_KEY}",
        baseRoot="${SERVER_WAP_SHOP}",
        singleCode = "${detail.code!}",
        productCode="${detail.groupCode!}",
        version = ${detail.version},
        singleAllstr=${singleAllstr!},
        collectFlag=parseInt(${collectFlag})||0,
        maxValue=Math.min(${detail.stock.stock!0},${detail.buyLimit!1}),
        minValue=parseInt(${detail.minAmount!1})||1,
        step=parseInt(${detail.addCount!1})||1,
        hasBanner = ${detail.picList?size},
        selNum=${selNum!0},
        imgServer="${SERVER_IMG_WEB}";
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div id="goods-container" class="has-goods" <#if detail.version ==2>style="display:none;"</#if>>
    <div class="goods scroll-div1">
        <div id="banner" class="banner">
            <div class="hd">
                <ul></ul>
            </div>
            <div class="bd">
                <ul>
                    <#if detail.picList??>
                        <#list detail.picList  as pic>
                            <li><a href="#"><img src="${pic}" alt="" /></a></li>
                        </#list>
                    </#if>
                </ul>
            </div>
        </div>
        <div class="info clearfix">
            <div class="info-name">
                <span>${detail.title}</span>
                <div class="price">¥${detail.salesPrice?string('0.00')}</div>
                <a class="goods_fav">
                    <span><i></i>收藏</span>
                </a>
            </div>
            <div class="info-spec comList clearfix">
                <em>规格</em>
                <span id="current-attr">
                    <#if detail.fattrs??>
                        <#list detail.fattrs?keys as key1>
                            ${detail.fattrs[key1]},
                        </#list>
                    </#if>
                </span>
                <i class="right-icon"></i>
            </div>
            <a href="${SERVER_WAP_SHOP}/product/findProductList.h?storeIds=${detail.storeObject.id}">
            <div class="info-shop comList clearfix">
                <em>门店</em>
                <span>${detail.storeObject.name}</span>
                <i class="right-icon"></i>
            </div>
            </a>
            <#if marketing??&&marketing?size gt 0 >
            <div class="info-promotion comList clearfix">
                <em>促销</em>
                <#list marketing?keys as key>
                <span>
                    <i><#if key="MONEYMONEY">满减<#elseif key="MONEYDISC">满折<#else>${key}</#if></i>
                    <#list marketing[key] as info>  
                        ${info};
                    </#list>
                </span>
                </#list>
            </div>
            </#if>
        </div>
        <div class="assure">
            <div class="title">商品详情</div>
            <div class="content">
                ${detail.detail}
            </div>
        </div>
    </div>
    <!-- 底部按钮购物车区 -->
    <div class="goodsBtns">
        <#if (!detail.stock??) || (!detail.stock.stock??)|| detail.stock.stock lt 1 || detail.stock.stock lt detail.minAmount>
            <a href="javascript:;" class="dis-btn sold-out">已售完</a>
        <#else>
            <a href="${SERVER_WAP_SHOP}/cart/cartList.h" class="goods_cart">
                <i id="cart-buyed" class="icon-cart"></i>
            </a>
            <a href="javascript:;" data-event="show-size"  class="goods_buy">立即购买</a>
            <a href="javascript:;" data-event="show-size"  class="goods_add">加入购物车</a>
        </#if>
    </div>
    <!-- 弹出规格层 -->
    <div class="mask"></div>
    <div class="goodsDialog">
        <div class="con">
            <a class="icon-close">
                <i class="goods_close"></i>
            </a>
            <div id="goods-sure" class="goodsSure clearfix">
                <img src="${detail.picList[0]}" alt="">
                <div class="left">
                    <span>¥${detail.salesPrice?string('0.00')}</span>
                    <em>库存<i><#if (!detail.stock.stock??)|| detail.stock.stock lt 1>0<#else>${detail.stock.stock}</#if></i>件</em>
                </div>
            </div>
            <div class="dialog_scroll">
                <#if attrAllMap??>
                <#list attrAllMap?keys as key>
                <div class="size-select select">
                    <span>${key}</span>
                    <#if attrAllMap[key]??>
                    <#list attrAllMap[key]?split(",") as attrValue>
                    <#if detail.fattrs??>
                    <#list detail.fattrs?keys as key1>
                    <#if key1=key>
            
                    <a href="javascript:;">${attrValue}</a>
                    
                    </#if>  
                    </#list>
                    </#if>  
                    </#list>
                    </#if>
                </div>
                </#list>
                </#if>
                <div class="pro clearfix">
                    <div class="pro-name">
                        <span>购买数量</span>
                        <em class="hide">（限购${detail.buyLimit}件）</em>
                    </div>
                    <div id="number-input" class="inve">
                        <span class="invel unable">-</span>
                        <input class="invev" type="number" readonly value="<#if selNum?? && selNum !=''>${selNum}<#else>${detail.minAmount!1}</#if>"/>
                        <span class="inver">+</span>
                    </div>
                </div>
            </div>
            <div class="goodsSureBtn">
            <#if (!detail.stock??) || (!detail.stock.stock??)|| detail.stock.stock lt 1 || detail.stock.stock lt detail.minAmount>
                <a href="javascript:;" class="dis-btn sold-out">已售完</a>
            <#else>
                <a href="javascript:;" class="goods-add">加入购物车</a>
                <a href="javascript:;" class="goods-buy">立即购买</a>
            </#if>
            </div>
        </div>
    </div>
</div>
<!-- 商品下架显示 -->
<div id="no-goods" class="empty no-goods" <#if detail.version !=2>style="display:none;"</#if>>
    <img src="${SERVER_WAP_SHOP}/resources/images/empty_collection.png" />
    <span>您查看的商品已下架</span>
    <a href="${SERVER_WAP_INDEX}">去首页</a>
</div>
<script src="${SERVER_WAP_SHOP}/resources/js/product/goods.js?t=${.now}"></script>
</body>
</html>

