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
<title>确认订单</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/jiesuan.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
    	singleCodes="${singleCodes}",
    	qtys="${qtys}",
    	userCouponFlag="${userCouponFlag}",
    	couponNo="${couponNo}",
    	paymentFee="${paymentFee}",
    	memberDlvAddressId="${memberDlvAddressId}",
    	hasAddress=${orderResult.memberAddrList?exists},
    	token="${token}";
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<div class="box">
	<#if orderResult.memberAddrList?exists>
    <a href="javascript:jumpToAddress();">
	    <div class="address">
	    	<p>
	    		<em class="fl">${orderResult.memberAddrList[0].recvLinkman}</em>
	    		<i class="fr">${orderResult.memberAddrList[0].recvMobile}</i>
	    	</p>
	    	<p class="ts">${orderResult.memberAddrList[0].provinceName}${orderResult.memberAddrList[0].cityName}${orderResult.memberAddrList[0].countyName}${orderResult.memberAddrList[0].address}</p>
	    </div>
	</a>
	<#else>
	<a href="javascript:jumpToAddress('add');">
	    <div class="add_address">
	    	<p>添加收货地址</p>
	    </div>
    </a>
	</#if>
	<dl class="goods_list">
		<dt>${orderResult.storeName}</dt>
    	<#list orderResult.cartMKTList as cartMKTList>
    	<#list cartMKTList.cartProductList as cart>
		<dd>
			<a href="${SERVER_WAP_SHOP}/sp-${cart.singleCode}.h" class="goods_img"><img src="${cart.imageUrl}" /></a>
			<div class="goods_info">
				<a href="javascript:;" class="fl">${cart.title}</a>
				<em class="fl">${cart.props}</em>
				<cite>¥<span>${cart.salesPrice?string('0.00')}</span></cite>
				<i>X<span>${cart.qty}</span></i>
			</div>
		</dd>
		</#list>
		</#list>
	</dl>
	<ul class="benefit_list">
		<li>
			<em class="fl">配送方式</em>
			<a href="javascript:;" class="fr"><#if orderResult.deliveryList[0]=='DELIVERY'>快递</#if></a>
		</li>
		<#if orderResult.couponList?exists>
		<li>
			<em class="fl">${orderResult.couponList[0].couponName}</em>
			<a class="fr" href="${SERVER_WAP_SHOP}/cart/findUsableCoupons.h?singleCodes=${singleCodes}&qtys=${qtys}&memberDlvAddressId=${memberDlvAddressId}">优惠券</a>
		</li>
		<#else>
		<li>
			<em class="fl">优惠券</em>
			<a href="javascript:;" class="fr">无可用券</a>
		</li>
		</#if>
	</ul>
	<dl class="jiesuan_info">
		<dt>结算信息</dt>
		<dd>
			<em class="fl">商品总价</em><cite class="fr">¥<span>${orderResult.salesTotalFee?string('0.00')}</span></cite>
		</dd>
		<dd>
			<em class="fl">运费</em><cite class="fr">¥<span>${orderResult.logisticsFee?string('0.00')}</span></cite>
		</dd>
		<dd>
			<em class="fl">优惠活动</em><cite class="fr">-¥<span>${orderResult.promoFee?string('0.00')}</span></cite>
		</dd>
		<dd>
			<em class="fl">优惠券</em><cite class="fr">-¥<span>${orderResult.couponFee}</span></cite>
		</dd>
	</dl>
	<div class="all_price">实付金额：<i>¥</i><span>${orderResult.totalFee?string('0.00')}</span></div>
</div>
<div class="jiesuan_fix">
	<a href="javascript:;" id="submit" class="fr red">提交订单</a>
	<a href="${SERVER_WAP_SHOP}/cart/cartList.h" class="fr">返回购物车</a>
</div>
<script src="${SERVER_WAP_SHOP}/resources/js/cart/order.js?t=${.now}"></script>
</body>
</html>
