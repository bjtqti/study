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
<title>分类</title>
<script src="${SERVER_WAP_SHOP}/resources/js/common/flexible.js?t=${.now}"></script>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/base.css?t=${.now}">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/catePoly.css?t=${.now}">
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
    <div class="polyTabs">
        <ul id="tabs-wrap">
            <li class="current"><i>门店</i></li>
            <li><i>分类</i></li>
        </ul>
    </div>
    <div class="polyCon clearfix">
        <div id="page-content">
            <div class="poly page-0 scroll-div page-current">
            <#if storeList?exists && (storeList?size>0)>
                <div class="brandList clearfix">
                <#list storeList  as storeObj>
                    <a href="${SERVER_WAP_SHOP}/product/findProductList.h?storeIds=${storeObj.id}">
                    <div><img src="${storeObj.imageUrl!'resources/images/pic-8.gif'}"></div>
                    <span>${storeObj.name}</span>
                    </a>
                </#list>
                </div>
            </#if>
            </div>
            <div class="poly page-1 hide"> 
            <#if categoryList?exists && (categoryList?size>0)>
                <div class="category-bd"></div>
                <ul class="leftNav">
                <#list categoryList as categoryObject>
                <li class="name<#if categoryObject_index == 0> on</#if>">
                <div class="bd-on"><i></i>${categoryObject.name}</div>
                </li>
                </#list>
                </ul>
                <div class="rightCon scroll-div">
                    <#list categoryList as categoryObject>
                    <div class="fadeIn<#if categoryObject_index == 0> sh</#if>">
                        <div class="content">
                        <#list categoryObject.children as subCategoryObj>
                            <a href="${SERVER_WAP_SHOP}/product/findProductList.h?categoryes=${subCategoryObj.id}" class="cg">
                                <img src="${subCategoryObj.imageUrl!'resources/images/pic-7.gif'}">
                                <div>${subCategoryObj.name}</div>
                            </a>
                        </#list>
                        </div>
                    </div>
                    </#list>
                </div>
            </#if>
            </div>
        </div>
    </div>
</div>
<#include "common/foot.ftl">
<script src="${SERVER_WAP_SHOP}/resources/js/poly/catePoly.js?t=${.now}"></script>
</body>
</html>
