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
<title>编辑收货地址</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/addAdress.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}"/>
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",
        isDefault="${deliveryAddressObject.isDefault}",
        provinceCode="${deliveryAddressObject.provinceCode}",
        cityCode="${deliveryAddressObject.cityCode}",
        countyCode="${deliveryAddressObject.countyCode}",
        recvAddressId="${deliveryAddressObject.recvAddressId}",
        singleCodes="${singleCodes}",
        qtys="${qtys}",
        userCouponFlag="${userCouponFlag}",
        couponNo="${couponNo}";
</script>
</head>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
    <#include "common/loading.ftl">
</div>
<div class="box">
    <div class="add-adress">
        <p class="clearfix">
            <span class="wait">收货人</span>
            <span>
                <input type="text" id="receiver-name" value="${deliveryAddressObject.recvLinkman}" placeholder="请输入收货人姓名">
            </span>
        </p>
        <p class="clearfix">
            <span class="wait">联系电话</span>
            <span>
                <input type="tel" id="receiver-phone" value="${deliveryAddressObject.recvMobile}" placeholder="请输入收货人联系电话">
            </span>
        </p>
        
        <p class="clearfix">
            <span class="wait">省份</span>
            <span>
                <select id="cmbProvince">
                    <option value="${deliveryAddressObject.provinceCode}">${deliveryAddressObject.provinceName}</option>
                </select>
            </span>
        </p>
        <p class="clearfix">
            <span class="wait">城市</span>
            <span>
                <select id="cmbCity">
                    <option value="${deliveryAddressObject.cityCode}">${deliveryAddressObject.cityName}</option>
                </select>
            </span>
        </p>
        <p class="clearfix">
            <span class="wait">区县</span>
            <span>
                <select id="cmbArea">
                    <option value="${deliveryAddressObject.countyCode}">${deliveryAddressObject.countyName}</option>
                </select>
            </span>
        </p>
        <p class="clearfix">
            <span class="wait">详细地址</span>
            <span class="flex">
                <textarea id="address" placeholder="请输入详细地址">${deliveryAddressObject.address}</textarea>
            </span>
        </p>
    </div>
    <div class="addBtns">
        <a href="javascript:;" class="addBtn">保存</a>
    </div>
</div>
<script src="${SERVER_WAP_SHOP}/resources/js/common/jsAddress.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/member/editAddress.js?t=${.now}"></script>
</body>
</html>
