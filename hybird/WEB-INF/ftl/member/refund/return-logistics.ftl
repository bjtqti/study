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
<title>退款退货物流</title>
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

<div class="box">
  <form id="reasonForm">
    <!-- 申请退货理由  -->
    <div class="reason_area">
        <input type='hidden' name="returnOrderId" id="returnOrderId" value="${returnOrderId}"/>
    	<dl class="reason_list">
    		<dt>物流公司<span>&nbsp;*</span></dt>
    		<dd>
    			<select class="" name="shippingName" id="logistics_company">
    				<option value="-1" >请选择物流公司</option>
    				<option value="申通快递">申通快递</option>
    				<option value="圆通快递">圆通快递</option>
    				<option value="韵达快递">韵达快递</option>
    				<option value="中通快递">中通快递</option>
    				<option value="顺丰快递">顺丰快递</option>
    				<option value="EMS快递">EMS快递</option>
					<option value="优速快递">优速快递</option>
					<option value="天天快递">天天快递</option>
					<option value="汇通快递">汇通快递</option>
					<option value="宅急送">宅急送</option>
					<option value="佳吉快递">佳吉快递</option>
    			</select>
    		</dd>
    	</dl>
    	<dl class="reason_list">
    		<dt>物流单号<span>&nbsp;*</span></dt>
    		<dd>
    			<input type="text" placeholder="" name="shippingNo" id="logistics_number" class="logistics_number" />
    			<em class="logistics_number_del" ></em>
    		</dd>
    	</dl>
    	<dl class="reason_list">
    		<dt>联系电话<span>&nbsp;*</span></dt>
    		<dd>
    			<input type="text" placeholder="" name="mobilePhone" id="logistics_phone" class="" />
    		</dd>
    	</dl>
    	<div class="sign">温馨提示：请详细填写退货物流信息，以便我们与您联系。</div>
    </div>
</form>
</div>
<div class="return_fix">
	<a href="javascript:;" id='submitlogistics' class="red sure">提交</a>
</div>


<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/lib/jquery.form.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/refund/return-logistics.js"></script>
</body>
</html>
