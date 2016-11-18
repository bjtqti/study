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
<title>个人中心</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/user.css?t=${.now}">
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script>
    var sslHost = "${SERVER_SSL_SCORE}",
        appKey = "${APP_KEY}",
        baseRoot="${SERVER_WAP_SHOP}";
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="user">    
    <div class="head">
    <#if member?? >
        <div class="hasLog">
            <#if member.weixinImageUrl??>
                <img src="${member.weixinImageUrl}" />
            <#elseif member.imageUrl??>
                <img src="${member.imageUrl}" />
            <#else>
                <img src="${SERVER_WAP_SHOP}/resources/images/user-pic.jpg" />
            </#if>
            <div class="userInfo">
                <#if member.weixinNickname??>
                    <span>${member.weixinNickname}</span>
                <#else>
                    <span>${member.nickName}</span>
                </#if>
                <em class="hide">积分：0</em>
            </div>
        </div>
    <#else>
        <div class="notLog">
            <a href="javascript:register()">注册</a>
            <a href="${SERVER_WAP_SHOP!''}/membercenter/login.h">登录</a>
        </div>
    </#if>
    </div>
    <div class="user-order">
        <a href="${SERVER_WAP_SHOP}/order/0.h" class="kind">
            <em>我的订单</em>
            <span>查看全部订单</span>
            <i class="right-icon"></i>
        </a>
        <div class="userGoods">
            <a href="${SERVER_WAP_SHOP}/order/10.h" class="userGoods_1">
                <em><#if noPay gt 0><i>${ (noPay gt 99) ?string('99+',noPay)} </i></#if></em>
                <span>待支付</span>
            </a>
            <a href="${SERVER_WAP_SHOP}/order/11.h" class="userGoods_2">
                <em><#if needSend gt 0><i>${(needSend gt 99) ?string('99+',needSend)}</i></#if></em>
                <span>待发货</span>
            </a>
            <a href="${SERVER_WAP_SHOP}/order/12.h" class="userGoods_3">
                <em><#if needPick gt 0><i>${ (needPick gt 99) ?string('99+',needPick)}</i></#if></em>
                <span>拣货中</span>
            </a>
            <a href="${SERVER_WAP_SHOP}/order/13.h" class="userGoods_4">
                <em><#if needReceive gt 0><i>${ (needReceive gt 99) ?string('99+',needReceive)}</i></#if></em>
                <span>待收货</span>
            </a>
            <a href="${SERVER_WAP_SHOP}/refund/applicationList.h" class="userGoods_5">
                <em></em>
                <span>退货/退款</span>
            </a>
        </div>
    </div>
    <div class="user-list">
        <a href="${SERVER_WAP_SHOP}/collect/collectList.h">
            <em></em>
            <span>我的收藏</span>
            <i class="right-icon"></i>
        </a>
        <a href="${SERVER_WAP_SHOP}/coupon/couponList.h?status=0&currentPage=1&pageSize=10">
            <em></em>
            <span>我的优惠券</span>
            <i class="right-icon"></i>
        </a>
        <a href="${SERVER_WAP_SHOP}/address/addressList.h">
            <em></em>
            <span>收货地址</span>
            <i class="right-icon"></i>
        </a> 
    </div>
    <#if member ??>
        <div id="btn-logout" class="logout hide">退出登录</div>
    </#if>
</div>

<#include "common/foot.ftl">
<script src="${SERVER_WAP_SHOP}/resources/js/member/user.js?t=${.now}"></script>
</body>
</html>
