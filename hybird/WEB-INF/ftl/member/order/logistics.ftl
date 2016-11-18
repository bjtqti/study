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
<title>物流信息</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/logistics.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
</head>

<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>

<div class="logistics page-0 poly">
    <#if ex?? && ex.dispatchs??>
    <#list ex.dispatchs  as p>
    <ul class="order_info">
        <li>订单编号：<span>${p.orderNo}</span><em class="fr">${ex.childOrderStatusName}</em></li>
        <li>下单时间：<span>${p.lastTime?string("yyyy-MM-dd HH:mm:ss")}</span></li>
    </ul>
    <div class="rate">
        <span>物流动态</span>
        <#if (p.routes?size > 0)>
        <div class="org-wuliuStatusList">
        <#list p.routes as r>
            <div class="org-wuliuStatus <#if r_index==0>org-curBg<#elseif (r_index+1)==p.routes?size>org-starBg<#else>org-midBg</#if>">
                <div class="org-wuLiuLeft">
                    <em class="org-middle"></em>
                </div>
                <p class="org-wuLiuFont org-wuLiuCur">
                    <span>${r.context}</span>
                    <span class="org-wuLiuTime">${r.eventTime?string("yyyy-MM-dd HH:mm:ss")}</span>
                </p>
            </div>
        </#list>
        </div>
        <#else>
        <div class="no-logistics">
            <span>暂时无物流动态，请稍后查询！</span>
        </div>
        </#if>
    </div>
    </#list>
    <#else>
    <div class="rate">
        <span>物流动态</span>
        <div class="no-logistics">
            <span>暂时无物流动态，请稍后查询！</span>
        </div>
    </div>
    </#if>
</div>
</body>
</html>
