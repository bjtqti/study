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
	<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
	<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
	<script>
	    var baseRoot="${SERVER_WAP_SHOP}";
	</script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<div class="box">
    <!-- 购物车空 -->
	<div class="gwc_null">
		<img src="${SERVER_WAP_SHOP}/resources/images/shopping_trolley/gwc_null_img.png" />
	</div>
	<div class="gwc_sign">购物车内暂时没有商品</div>
    <a href="${SERVER_WAP_INDEX}" class="go_index">去逛逛</a>
</div>
<#include "common/foot.ftl">
</body>
</html>
