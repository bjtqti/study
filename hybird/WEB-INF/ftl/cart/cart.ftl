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
	<title>购物车</title>
	<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
	<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
	<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/cart.css?t=${.now}">
	<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}">
	<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
	<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
	<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
	<script>
	    var baseRoot="${SERVER_WAP_SHOP}",
	        imgServer="${SERVER_IMG_WEB}";
	</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<div class="box">
    <#if carts?exists>
    <#list carts as cart>
	<div class="one-shop">
		<div class="shop-total">
	        <input type="checkbox" checked class="goods-check" data-event="check-cart"/>${cart.storeName}
	    </div>
	    <#if cart.promoType?exists>
	    <div class="activity">
	    	<i>${cart.promoType}</i>${cart.promoName}
	    </div>
	    </#if>
	    <#if cart.cartMKTList?exists>
       	<#list cart.cartMKTList as cartMKT>
       		<#if cartMKT.cartProductList?exists>
            <#list cartMKT.cartProductList as product>
        <div class="one-goods" data-cart="${product.cartId},${product.singleCode}" <#if !cart.promoType?exists>style="background:white"</#if>>
	        <div class="goods-msg">
		        <input type="checkbox" checked class="goods-check" data-event="check-goods"/>
		        <a href="${SERVER_WAP_SHOP}/sp-${product.singleCode}.h" class="goods_img">
		        <img src="${product.imageUrl}" /></a>
		        <div class="goods_info">
	    			<a href="${SERVER_WAP_SHOP}/sp-${product.singleCode}.h" class="fl">${product.title}</a>
	    			<em class="fl">${product.props}</em>
		    		<cite class="fl"><span class="shop-total-amount">${product.salesPrice?string('0.00')}</span></cite>
	    			<i data-event="del" class="delete fr"></i>
	    			<div class="goods_num" data-num="${product.buyLimit},${product.minBuyCount},${product.stockCount},${product.addCount},${product.singleCode}">
	    			<div class="<#if product.qty ==  product.minBuyCount>minus-disable<#else>minus</#if>" data-event="minus"></div>
				        <input type="text" class="am-num-text" value="${product.qty}" readonly />
				        <div class="plus" data-event="plus"></div>
		        	</div>
	    		</div>
	        </div>
	        <#if cart.promoType?exists && !product_has_next>
	        <div class='white_bg'></div>
	        </#if>
	    </div>
		    </#list>
		    </#if>
	    </#list>
	    </#if>
	    <div class="shop-total2">
	    	<a class="jiesuan_btn" data-event="submit" href="javascript:;">结算</a>
	        <p>总计：<span>¥</span><span class="shop-total-amount">${cart.totalFee?string('0.00')}</span></p>
	        <p class="ts">（不含运费，已优惠<i>${cart.promoFee?string('0.00')}</i>元）</p>
	    </div>
    </div>
    </#list>
    </#if>
</div>
<#include "common/foot.ftl">
<script src="${SERVER_WAP_SHOP}/resources/js/cart/cart.js?t=${version}"></script>
</body>
</html>