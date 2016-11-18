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
</script>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<#if orderdetail??>
<div class="box">
    <!-- 退货退款详情   -->
    <#if orderdetail.returnOrderApplyStatus == 410 || orderdetail.returnOrderApplyStatus == 420>
    <div class="return_zt">
    	<ul class="return_zt_img
    	<#if orderdetail.returnOrderApplyStatus==410>
    	 img1
    	<#elseif orderdetail.returnOrderApplyStatus==420> 
    	    <#if refundreturnorder??>
    	        <#if refundreturnorder.returnOrderStatus==310>
	    	        img1
	    	    <#elseif refundreturnorder.returnOrderStatus==340>
	    	        img2    
	    	    <#elseif refundreturnorder.returnOrderStatus==350 || refundreturnorder.returnOrderStatus==360>
	    	        img3
	    	    <#elseif refundreturnorder.returnOrderStatus==370>
	    	        img4
	    	    </#if>
	    	<#else>
	    	    img2    
    	    </#if>
    	</#if>
    	">
    		<li>待审核</li>
	    	<li>已审核</li>
	    	<li>退款中</li>
	    	<li>已完成</li>
    	</ul>
    </div>
    </#if>
    <ul class="return_zt_box1">
    <input type="hidden" id="returnOrderApplyId" value="${orderdetail.returnOrderApplyId}"/>
    	<li>售后单号：<span>${orderdetail.returnOrderApplyId}</span>
    	
    	<#if orderdetail.returnOrderApplyStatus==410>
    	    <cite class="fr red">待审核</cite>
    	</#if>
    	<#if orderdetail.returnOrderApplyStatus==420>
    	    <#if refundreturnorder??>
    	        <#if refundreturnorder.returnOrderStatus==310>
    	            <cite class="fr red">待审核</cite>
    	        <#elseif refundreturnorder.returnOrderStatus==340>
	    	        <cite class="fr red">已审核</cite>    
	    	    <#elseif refundreturnorder.returnOrderStatus==350 || refundreturnorder.returnOrderStatus==360>
	    	        <cite class="fr red">退款中</cite>
	    	    <#elseif refundreturnorder.returnOrderStatus==370>
	    	        <cite class="fr red">已完成</cite>
	    	    </#if>
    	        
	    	<#else>
	    	    <cite class="fr red">已审核</cite>    
    	    </#if>
    	</#if>
    	<#if orderdetail.returnOrderApplyStatus==430>
    	    <cite class="fr">已取消</cite>
    	</#if>
    	<#if orderdetail.returnOrderApplyStatus==450>
    	    <cite class="fr">退货退款失败</cite>
    	</#if>
    	</li>
    	<li>订单编号：<span>${orderdetail.subOrderId}</span></li>
    	<li>售后类型：<span>
    	<#if orderdetail.returnOrderApplyType=='TUIKUAN'>退款</#if>     
        <#if orderdetail.returnOrderApplyType=='TUIHUO'>退货</#if>
    	</span></li>
    	<li>申请时间：<span>${orderdetail.creationTime}</span></li>
    	<li></li>
    </ul>
    <ul class="return_zt_box2">
    	<li><em>申请原因：</em><span>${orderdetail.reason}</span></li>
    	<li><em>问题描述：</em><span>${orderdetail.description}</span></li>
    </ul>
    <#if orderdetail.returnOrderApplyType=='TUIHUO'>
    <div class="return_zt_box3">
	    <ul class="reason_img">
	        <#list orderdetail.proofUrl as prourl>
	    	    <li><img src="${prourl}"/></li>
	    	</#list>
	    </ul>
    </div>
    </#if>
    <div class="return_kf">
    	<a href="tel:400-800-8000" class="fl">400-800-8000</a>
    	<cite class="fr">周一至周日 8:30-21:00</cite>
    </div>
    <dl class="return_info">
    	<dt>最新进度</dt>
    	<dd>
	    	<#if orderdetail.returnOrderApplyStatus==410>
	    	    <h3>您的申请已提交，请等待审核。</h3>
	    	</#if>
	    	
	    	<#if orderdetail.returnOrderApplyStatus==420>
	    	    <#if refundreturnorder??>
	    		    <#if refundreturnorder.returnOrderStatus==310>
	    	            <h3>您的申请已通过。</h3>
		    	    <#elseif refundreturnorder.returnOrderStatus==340 || refundreturnorder.returnOrderStatus==350 || refundreturnorder.returnOrderStatus==360>
		    	        <h3>退货退款审核中。</h3>
		    	    <#elseif refundreturnorder.returnOrderStatus==370>
		    	        <h3>退款完成，您的退款将在7-15工作日内原路退回，请留意银行退款信息。</h3>
		    	    </#if>
		    	    <#if ShippingCode??>
		    	       <p><span class="gray">(快递公司:${ShippingCode.shippingName},快递单号:${ShippingCode.shippingNo})</span></p>
		    	    </#if>
	    		<#else>
	    		    <h3>您的申请已通过。</h3>
	    		</#if>
	    	</#if>
	    	
	    	<#if orderdetail.returnOrderApplyStatus==430>
	    	    <h3>您的申请已取消。</h3>
	    	</#if>
	    	<#if orderdetail.returnOrderApplyStatus==450>
	    	    <h3>您的申请失败。</h3>
	    	</#if>
    	</dd>
    </dl>
    
    
    
</div>
<div class="return_fix">
    <#if orderdetail.returnOrderApplyStatus==420 || orderdetail.returnOrderApplyStatus==410>
		<#if refundreturnorder??>
		  <#if orderdetail.returnOrderApplyStatus==420 && orderdetail.returnOrderApplyType=='TUIHUO' >
		    <#if ShippingCode??>
		    <#else>
		    <a href="${SERVER_WAP_SHOP}/refund/gotoLogistics.h?orderId=${refundreturnorder.returnOrderId}" class="fr">填写退货物流</a>
		    </#if>
		  </#if>
		<#else>
		   <a href="javascript:;" id="cancelApp" class="fr">取消申请</a> 
		</#if>
	</#if>
</div>
</#if>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/refund/orderdetail.js"></script>
</body>
</html>