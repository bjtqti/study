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
<title>我的订单</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/buy.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
    	pageSize=${pageSize!15},
    	orderStatus=${orderStatus},
        imgServer="${SERVER_IMG_WEB}";
</script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div id="order-list-wrap" class="box">
	<ul class="order_tit">
		<li><a href="${SERVER_WAP_SHOP}/order/0.h">全&nbsp;部</a></li>
		<li><a href="${SERVER_WAP_SHOP}/order/10.h">待支付</a></li>
		<li><a href="${SERVER_WAP_SHOP}/order/11.h">待发货</a></li>
		<li><a href="${SERVER_WAP_SHOP}/order/12.h">拣货中</a></li>
		<li><a href="${SERVER_WAP_SHOP}/order/13.h">待收货</a></li>
	</ul>
	<#if (orderList && orderList?size > 0)>
	<div id="order-list" class="order_area">
		<#list orderList as order>
		<div class="myorder_goods">
			<div class="tit">
				<div class="time fl">${order.createTimeStr}</div>
				<div class="zt fr">
				${order.orderStatusName}
				</div>
				<#list order.productInfos as p>
				<div class="con">
					<a class="con_href" href="${SERVER_WAP_SHOP}/order/detail.h?orderNo=${order.orderCode}">
						<img src="${p.mainImageUrl}" class="goods_img">
						<div class="goods_info">
							<div class="goods_tit">${p.singleShortname}</div>
							<em class="fl">${p.sizeName}${p.colorName}</em>
							<cite>¥<span>${p.manualDiscount?string('0.00')}</span></cite>
							<i>x<span>${p.qty}</span></i>
						</div>
					</a>
				</div>
				</#list>
				<div class="total">
					<p>
						<em class="fr">合计:<i>¥</i><span>${order.paymentAmount?string('0.00')}</span></em>
						<cite class="fr">共<span>${order.qty}</span>件商品</cite>
					</p>
					<p>
					<#switch order.orderStatus>
					<#case 10>
				    <a href="javascript:toPay(${order.orderCode});" class="btn fr red">立即支付</a>
					  <a href="javascript:cancel(${order.orderCode});" class="btn fr">取消订单</a>
				  	<#break>
				    <#case 11>
				    <a href="${SERVER_WAP_SHOP}/refund/gotoAppliMoney.h?orderId=${order.orderCode}" class="btn fr">申请退款</a>
				  	<#break>
				  	<#case 12>
				  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn fr">申请退货</a>
				  	<#break>
				  	<#case 13>
				  	<a href="javascript:toConfirm(${order.childOrder.hybrisSuborderCode});" class="btn fr red">确认收货</a>
				  	<a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn fr">查看物流</a>
				  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn fr">申请退货</a>
				  	<#break>
				    <#case 30>
				    
				    <#break>
				  	<#case 160>
				  	<a href="${SERVER_WAP_SHOP}/refund/gotoAppliGoods.h?orderId=${order.orderCode}" class="btn fr">申请退货</a>
				    <a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn fr">查看物流</a>
				  	<#break>
				    <#case 170>
				    <a href="${SERVER_WAP_SHOP}/order/logstics/${order.childOrder.hybrisSuborderCode}.h?parentOrderNo=${order.orderCode}" class="btn fr">查看物流</a>
				    <#break>
				  <#default>
				</#switch>
					</p>
				</div>
			</div>
		</div>
		</#list>
	</div>
	<#else>
	<div class="order_null">
		<img src="${SERVER_WAP_SHOP}/resources/images/buy/order_null_img.png" />
	</div>
	<div class="order_null_sign">您的订单为空</div>
	<a href="${SERVER_WAP_INDEX}" class="order_btn2">去逛逛</a>
	</#if>
</div>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/member/buy.js?t=${.now}"></script>
</body>
</html>
