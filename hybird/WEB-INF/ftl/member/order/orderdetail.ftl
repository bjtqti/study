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
<title>订单详情</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/buy.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
    	orderStatus=${orderStatus!0},
        imgServer="${SERVER_IMG_WEB}";
</script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="box">
	<div class="order_area2">
		<ul class="order_info">
			<li>订单编号：<span>${order.orderCode}</span><em class="fr">${order.orderStatusName}</em></li>
			<li>下单时间：<span>${order.createTimeStr}</span></li>
		</ul>
		<div class="address">
	    	<p><em class="fl">${order.deliveryMen}</em><i class="fr">${order.deliveryTel}</i></p>
	    	<p class="ts">${order.deliveryAddress}</p>
	    </div>
		<dl class="goods_list">
			<dt>${order.storeName}<em class="fr">共<span>${order.qty}</span>件商品</em></dt>
			<#list order.productInfos as p>
			<dd>
				<a class="con_href" href="${SERVER_WAP_SHOP}/sp-${p.singleCode}.h">
					<img src="${p.mainImageUrl}" class="goods_img"/>
					<div class="goods_info">
						<div class="fl tit">${p.singleShortname}</div>
						<em class="fl">${p.sizeName}${p.colorName}</em>
						<cite>¥<span>${p.salesPrice?string('0.00')}</span></cite>
						<i>X<span>${p.quantity}</span></i>
					</div>
				</a>
			</dd>
			</#list>
		</dl>
		<dl class="jiesuan_info">
			<dt>结算信息</dt>
			<dd>
				<em class="fl">商品总价</em><cite class="fr">¥<span>${order.salesAmount?string('0.00')}</span></cite>
			</dd>
			<dd>
				<em class="fl">运费</em><cite class="fr">¥<span>0</span></cite>
			</dd>
			<dd>
				<em class="fl">优惠活动</em><cite class="fr">-¥<span>0</span></cite>
			</dd>
			<dd>
				<em class="fl">优惠券</em><cite class="fr">-¥<span>${order.discountAmount?string('0.00')}</span></cite>
			</dd>
		</dl>
		<div class="all_price">实付金额：<i>¥</i><span>${order.paymentAmount?string('0.00')}</span></div>
	</div>
</div>
<div class="foot_fix">
	<#switch order.orderStatus>
		<#case 10>
	    <a href="javascript:toPay(${order.orderCode});" class="btn red">立即支付</a>
		<a href="javascript:cancel(${order.orderCode});" class="btn">取消订单</a>
	  	<#break>
	    <#case 11>
	    <a href="${SERVER_WAP_SHOP}/refund/gotoAppliMoney.h?orderId=${order.orderCode}" class="btn fr">申请退款</a>
		<#break>
	  	<#case 12>
	  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn">申请退货</a>
	  	<#break>
	  	<#case 13>
	  	<a href="javascript:toConfirm(${order.childOrder.hybrisSuborderCode});" class="btn red">确认收货</a>
	  	<a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn">查看物流</a>
	  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn">申请退货</a>
	  	<#break>
	    <#case 30>
	    <#break>
	  	<#case 160>
	  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn">申请退货</a>
	    <a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn">查看物流</a>
	  	<#break>
	    <#case 170>
	    <a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn">查看物流</a>
	    <#break>
	  	<#default>
	</#switch>
</div>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/member/buy.js?t=${.now}"></script>
</body>
</html>
