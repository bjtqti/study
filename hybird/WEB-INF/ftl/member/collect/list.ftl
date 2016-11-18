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
<title>我的收藏</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}"/>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/collection.css?t=${.now}"/>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css?t=${.now}"/>
<script src="${SERVER_WAP_SHOP}/resources/js/lib/jquery-1.8.3.min.js"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/common.js?t=${.now}"></script>
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js?t=${.now}"></script>
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
    <div id="container-collection" class="collection">
        <#if totalCount gt 0 >
        <#list collectObject as collect>
        <div class="list clearfix">
            <a href="${SERVER_WAP_SHOP}/sp-${collect.singleCode}.h">
                <img src="${collect.imageUrl}"/>
                <#if (collect.version==2)>
                <div class="soldOut"></div>
                </#if>
            </a>
            <div class="colRight">
                <a class="name" href="${SERVER_WAP_SHOP}/sp-${collect.singleCode}.h">${collect.title}</a>
                <div class="price">¥${collect.salesPrice?string('0.00')}</div>
            </div>
            <span class="col-icon" data-id="${collect.singleCode}"></span>
        </div>
        </#list>
        </#if>
        <div class="empty" <#if totalCount gt 0>style="display:none"</#if>>
            <img src="${SERVER_WAP_SHOP}/resources/images/empty_collection.png" />
            <span>您目前没有收藏任何商品！</span>
        </div>
         
    </div>
</div>
<script src="${SERVER_WAP_SHOP}/resources/js/member/collection.js?t=${.now}"></script>
</body>
</html>
