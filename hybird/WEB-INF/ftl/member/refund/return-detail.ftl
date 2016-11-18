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
<title>申请详情</title>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/base.css">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/return.css">
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/flexible.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery.lazyload.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/common.js"></script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>

<div class="box">
    <!-- 申请详情  -->
	<div class="return_detail_img">
		<img src="${SERVER_WAP_SHOP}/resources/base/images/return/return_detail_img.png" />
	</div>
	<div class="return_detail_sign">申请已提交成功，请等待系统确认。</div>
	<div class="return_detail_sign2">您可以在<a href="#">个人中心-退货/退款</a>中查看申请进度</div>
</div>
<div class="return_fix">
	<a href="${SERVER_WAP_SHOP}/refund/applicationList.h" class="red sure">确认</a>
</div>


<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
</body>
</html>
