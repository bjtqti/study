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
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
        singleCodes="${singleCodes}",
        qtys="${qtys}",
        memberDlvAddressId="${memberDlvAddressId}";
</script>
<style type="text/css">
    label > input {
        pointer-events: none;
    }
</style>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="box">
    <ul class="coupon_list">
        <#if datalist?exists>
        <#list datalist as coupon>
        <li>
            <div class="coupon_price">
                <p class="p1">¥<span>${coupon.couponFee}</span></p>
                <p class="p2"></p>
            </div>
            <div class="coupon_info">
                <p class="p1">${coupon.couponName}</p>
                <p class="p2">${coupon.startTime?substring(0,10)?replace('-', '.')} - ${coupon.endTime?substring(0,10)?replace('-', '.')}</p>
                <p class="p3">${coupon.couponRule}</p>
            </div>
            <label data-event="check">
                <input type="radio" name="coupon" value="${coupon.couponNo}" class="coupon_btn"/>
            </label>
        </li>
        </#list>
        </#if>
    </ul>
    <div class="coupon_no_use">
        <label data-event="cancel"><input type="radio" name="coupon" class="coupon_btn"/>不使用优惠券</label>
    </div>
</div>
<div class="jiesuan_fix">
    <a href="javascript:handleSubmit();" class="sure red">确认</a>
</div>
<script src="${SERVER_WAP_SHOP}/resources/js/cart/coupon.js?t=${.now}"></script>
</body>
</html>
