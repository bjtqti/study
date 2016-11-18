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
<title>退款/退货售后</title>
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
    var refundOrderType = ${idx};
    var currentPage = ${currentPage};
    var totalPages = ${totalPages};
</script>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<div class="box">
    <!-- 退货退款列表  -->
    <ul class="return_tit2">
		<li  
		<#if idx=='2'>
		    class="on"
		</#if>
		><a href="${SERVER_WAP_SHOP}/refund/applicationList.h">我的申请</a></li>
		<li
		<#if  idx=='1'>
		    class="on"
		</#if>
		><a href="${SERVER_WAP_SHOP}/refund/orderList.h">我的退货/退款</a></li>
	</ul>
	<#if code=='Failure'>
	   网络异常
	</#if>
	<#if code=='Null'>
	   暂无退货退款申请记录
	</#if>
	<#if code=='Success'>
	<div class="return_list_area">
		<#list orderList as order>
		<div class="return_goods">
			<div class="tit">
				<div class="time fl">${(idx==2)?string(order.creationTime,order.createTime)}</div>
					<div
					 <#if idx == 2 && order.returnOrderApplyStatus==430>
					     class="zt fr gray"
					 <#else>
					     class="zt fr"
					 </#if>
					>
				<#if idx==2>	
				    ${order.returnOrderApplyStatusName}
				<#else>
				    <#if order.returnStatus==310>
	    	                  待审核
		    	    <#elseif order.returnStatus==340>
		    	        已审核  
		    	    <#elseif order.returnStatus==350 || order.returnStatus==360>
		    	        退款中
		    	    <#elseif order.returnStatus==370>
		    	        已完成
		    	    </#if>
				</#if>
				
				</div>
			</div>
			<#list order.productInfos as pro>
			<div class="con">
				<a class="con_href" href="${SERVER_WAP_SHOP}/refund/orderDetail.h?applyOrderId=${order.returnOrderApplyId}&orderType=${idx}&orderId=${(idx==1)?string(order.returnOrderId,'')}">
				    <#if pro.mainImageUrl??>
		                <img src="${pro.mainImageUrl}" class="goods_img"/>
		            <#else>
		                
		                <img src="${SERVER_WAP_SHOP}/resources/base/images/jiesuan/goods_img.png" class="goods_img">
		            </#if>
					<div class="goods_info">
						<div class="goods_tit">${pro.productName}</div>
						<em class="fl">商品规格：${pro.colorName}&nbsp;${pro.sizeName}</em>
						<b>退货数量：<span>${pro.qty}</span>件</b>
						<cite>¥<span>${pro.marktPrice}</span></cite>
						<i>x<span>${pro.qty}</span></i>
					</div>
				</a>
			</div>
			</#list>
			
			<div class="total">
				<p>
				<#if idx == 1 && order.returnStatus == 340>
				    <#if order.shippingNo??>
				    <#else>
				        <a href="${SERVER_WAP_SHOP}/refund/gotoLogistics.h?orderId=${order.returnOrderId}" class="btn fr">填写退货物流</a>
				    </#if>
				</#if>
				&nbsp;
				<#if idx == 2 && order.returnOrderApplyStatus==410>
				    <a href="javascript:void(0);" id='cancelApp' returnApplyid="${order.returnOrderApplyId}" class="btn fr cancel">取消申请</a>
				</#if>
				</p>
			</div>
			
		</div>
		</#list>
	</div>
	</#if>
</div>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/refund/return-list.js"></script>
</body>
</html>
