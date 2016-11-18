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
<title>退款退货</title>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/base.css">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/return.css">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css">
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js"></script>

<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/flexible.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery.lazyload.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/common.js"></script>
</head>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",imgServer="${SERVER_IMG_WEB}";
</script>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<form id="appForm" method="post">
<div class="box">
    <!-- 申请退货退款  -->
    <div class="return_tit">订单商品</div>
	<div class="one-shop">	
    	<!-- 一个商品 -->
    	<#if orderlst??>
    	<#list orderlst as ord>
    	<input type="hidden" id="subOrderId" value="${ord.subOrderId}"/>
    	<#list ord.productInfos as pro>
	    <div class="one-goods">
	        <input type="hidden" name='storecode' value="${pro.storeCode}">
	        <input type="hidden" name='countercode' value="${pro.counterCode}">
	        <div class="goods-msg">
		        <label for="">
		            <input type="checkbox" value="${pro.productCode}" class="goods-check GoodsCheck">
		        </label>
		        <a href="${SERVER_WAP_SHOP}/sp-${pro.productCode}.h" class="goods_img">
		            <#if pro.mainImageUrl??>
		                <img src="${pro.mainImageUrl}" />
		            <#else>
		                <img src="${SERVER_WAP_SHOP}/resources/base/images/shopping_trolley/goods_img.png" />
		            </#if>
		        </a>
		        <div class="goods_info">
	    			<a href="${SERVER_WAP_SHOP}/sp-${pro.productCode}.h" class="fl">${pro.shortName}</a>
	    			<em class="fl">色码：${pro.colorName}&nbsp;规格：${pro.sizeName}</em>
		    		<cite class="fl"><span class="shop-total-amount GoodsPrice">${pro.marktPrice}</span></cite>
	    			<!--<i class="delete fr"></i>-->
	    			<div class="goods_num">
				        <div class="minus"></div>
				        <input type="text" class="am-num-text" value="1" readonly="readonly" />
				        <input type="hidden" id="returnNumber" value="${pro.returnNumber}"/>
				        <div class="plus"></div>
		        	</div>
	    		</div>
	        </div>
	    </div>
	    </#list>
	    </#list>
	    <#else>
	                 无记录
	    </#if>
	    
	    
	    <div class="shop-total">
	        <label for="1">
	            <input type="checkbox" class="goods-check ShopCheck" id="1">申请全部退货
	        </label>
	    </div>
    </div>
    
</div>
</form>
<div class="return_fix">
	<a id="nextStep" class="fr red next">下一步</a><em>已选择<span>0</span>件商品</em>
</div>


<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/refund/return-goods.js"></script>
</body>
</html>
