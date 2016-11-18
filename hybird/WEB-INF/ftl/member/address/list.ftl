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
<title>我的地址</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/adress.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}"/>
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
        singleCodes="${singleCodes}",
        userCouponFlag="${userCouponFlag}",
        couponNo="${couponNo}",
        qtys="${qtys}";
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="box">
    <#if deliveryAddressList?exists && (deliveryAddressList?size>0)>
    <div class="selectArea">
        <#list deliveryAddressList  as deliveryAddressObject>
        <div class="ad-list" id="item-${deliveryAddressObject.recvAddressId}" data-id="${deliveryAddressObject.recvAddressId}">
            <p>
                <span class="name">${deliveryAddressObject.recvLinkman}</span>
                <span class="mobNum">${deliveryAddressObject.recvMobile}</span></p>
            <p class="addr">${deliveryAddressObject.provinceName}${deliveryAddressObject.cityName}${deliveryAddressObject.countyName}${deliveryAddressObject.address}</p>
            <div class="toolsArea">
                <div class="ad-check">
                    <div class="checkboxRed">
                    <input type="radio" name="add-check" <#if  deliveryAddressObject.isDefault==1>checked="checked" </#if> />
                        <label></label>
                    </div>
                    <em>设为默认地址</em>
                </div>
                <span class="pen"><em></em>修改</span>
                <span class="del"><em></em>删除</span>
            </div>
        </div>
        </#list>
        <div class="addBtns">
            <#if singleCodes?exists>
            <a href="${SERVER_WAP_SHOP}/address/toAdd.h?singleCodes=${singleCodes}&qtys=${qtys}&couponNo=${couponNo}&userCouponFlag=${userCouponFlag}">添加新地址</a>
            <#else>
            <a href="${SERVER_WAP_SHOP}/address/toAdd.h">添加新地址</a>
            </#if>
        </div>
    </div>
    </#if>
    <div class="empty" <#if deliveryAddressList?exists && (deliveryAddressList?size>0)>style="display:none;"</#if>>
        <img src="${SERVER_WAP_SHOP}/resources/images/empty_address.png" />
        <span>快来添加您的收货地址吧！</span>
        <a href="${SERVER_WAP_SHOP}/address/toAdd.h">添加新地址</a>
    </div>
</div>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/member/address.js?t=${.now}"></script>
</body>
</html>
