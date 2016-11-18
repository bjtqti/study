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
<title>退款退货</title>
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/base.css">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/base/css/return.css">
<link rel="stylesheet" href="${SERVER_WAP_SHOP}/resources/css/dialog.css">
<script src="${SERVER_WAP_SHOP}/resources/js/common/dialog.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/flexible.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/jquery.lazyload.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/common.js"></script>
</head>
<script>
    var baseRoot="${SERVER_WAP_SHOP}",imgServer="${SERVER_IMG_WEB}";
</script>
<body>
<a class="toTop" id="gotop"></a>
<div id="load-box">
	<#include "common/loading.ftl">
</div>
<form id="reasonForm"  action="${SERVER_WAP_SHOP}/refund/application.h" method="post" enctype="multipart/form-data">
<input type="hidden" name="returnOrderApplyType" value="1"/>
<input type="hidden" name="proudctInfoStr" value="${proudctInfoStr}"/>
<input type="hidden" name="subOrderId" value="${subOrderId}"/>

<input type="hidden" name="storeCode" value="${storeCode}"/>
<input type="hidden" name="counterCode" value="${counterCode}"/>

<div class="box">
    <!-- 申请退货理由  -->
    <div class="reason_area">
    	<dl class="reason_list">
    		<dt>申请理由<span>&nbsp;*</span></dt>
    		<dd>
    			<select class="" id="refundReasonSlct" name="reason">
    				<option value="-1" >请选择</option>
    				<option value="收到商品破损">收到商品破损</option>
    				<option value="协商一致退款">协商一致退款</option>
    				<option value="商品错发/漏发">商品错发/漏发</option>
    				<option value="收到商品与描述不符">收到商品与描述不符</option>
    				<option value="无理由退货">无理由退货</option>
    				<option value="商品质量问题">商品质量问题</option>
    			</select>
    		</dd>
    	</dl>
    	<dl class="reason_list">
    		<dt>问题描述<!--<span>&nbsp;*</span>--></dt>
    		<dd>
    			<textarea id="refundReasonDesc" placeholder="请详细描述问题，最多125个字"></textarea>
    			<input type="hidden" name="description" id="refundReasonDesc_ipt"/>
    		</dd>
    	</dl>
    	<dl class="reason_list">
    		<dt>上传凭证<span class="gray">&nbsp;(最多上传三张)</span></dt>
    		<dd>
    			<ul class="reason_img">
    				<li>
					  <a href="#" class="add upload">
						<input class="upload" type="file" id="file1" name="file1" onchange="loadImage('file1','image1','','100','100')"/>
					    <img id="image1" width="200" height="200"  src="${SERVER_WAP_SHOP}/resources/base/images/return/addimg_bg.png"/>
					  </a>
					</li>
                    <li>
					  <a href="#" class="add upload">
					    <input class="upload" type="file" id="file2" name="file2" onchange="loadImage('file2','image2','','100','100')">
					    <img id="image2" width="200" height="200" src="${SERVER_WAP_SHOP}/resources/base/images/return/addimg_bg.png"/>
					  </a>
					</li>
					<li>
					  <a href="#" class="add upload">
					    <input class="upload" type="file" id="file3" name="file3" onchange="loadImage('file3','image3','','100','100')">
					    <img id="image3" width="200" height="200" src="${SERVER_WAP_SHOP}/resources/base/images/return/addimg_bg.png"/>
					  </a>
					</li>
    			</ul>
    		</dd>
    	</dl>
    	<div class="sign">温馨提示：商品退货运费，如是因商品质量造成的退货，由友阿承担；若非质量问题，还需由您承担，望理解。</div>
    </div>
</div>
</form>
<div class="return_fix">
	<a href="javascript:;" id="submitApplication" class="red sure">确定</a>
</div>

<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/base/js/return.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/lib/jquery.form.min.js"></script>
<script type="text/javascript" src="${SERVER_WAP_SHOP}/resources/js/refund/return-goods-reason.js"></script>
</body>
</html>
