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
<title>我的优惠券</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/coupon.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
        totalCount = parseInt(${totalCount})||0;
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="box">
    <div class="polyTabs">
        <ul id="tabs-wrap">
            <li class="current"><i>未使用</i></li>
            <li><i>已失效</i></li>
        </ul>
    </div>
    <!-- 优惠券列表 -->
    <div class="polyCon clearfix">
        <div id="page-content">
            <div class="poly scroll-div page-current">
                <#if totalCount gt 0 && couponList?size gt 0>
                <#list couponList as couponObject>
                <div class="coupon">
                    <div class="left">
                        <div class="price"><em>¥</em>${couponObject.money}</div>
                        <div class="term">满${couponObject.ruleObject.songAccount?string('#.#')}使用</div>
                    </div>
                    <div class="right">
                        <div class="kind">微商城www.tepin.com</div>
                        <div class="date">${couponObject.issueDate?substring(0,10)?replace('-', '.')}-${couponObject.validityDate?substring(0,10)?replace('-', '.')}</div>
                        <div class="explain">${couponObject.ruleObject.description}</div>
                    </div>
                </div>
                </#list>
                <#else>
                <div class="empty">
                    <img src="${SERVER_WAP_SHOP}/resources/images/empty_coupon.png" />
                    <span>您目前没有任何优惠券！</span>
                </div>
                </#if>
            </div>
            <div class="poly scroll-div hide">
                <div class="empty hide">
                    <img src="${SERVER_WAP_SHOP}/resources/images/empty_coupon.png" />
                    <span>您目前没有失效优惠券！</span>
                </div>
            </div>
        </div>
    </div>    

</div>
<script src="${SERVER_WAP_SHOP}/resources/js/member/coupon.js?t=${.now}"></script>
</body>
</html>
