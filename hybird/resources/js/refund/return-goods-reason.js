function uploadImage(o){
	$("#file" + $(o).attr("number")).click();
}

var imageCount = 3;
function loadImage(fileId,imgId,divId,wid,hei){
	var docObj = document.getElementById(fileId);
	var imgObjPreview = document.getElementById(imgId);
	
	if (docObj.files && docObj.files[0]) {
		var imageType = /image.*/;
	    if (!docObj.files[0].type.match(imageType)) {
	      $.messager.alert({'message': '请选择图片文件'});
	      return false;
	    }else{
	    	imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	    }
	} else {
		// IE下，使用滤镜
		docObj.select();
		document.getElementById(divId).focus();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById(divId);
		// 必须设置初始大小
		localImagId.style.width =hei;
		localImagId.style.height = wid;
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			top.Bk.Msg.alert("您上传的图片格式不正确，请重新选择!",8);
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	var number = fileId.replace("file","");
	//修改标签
	$("#label"+number).remove();
	$("#"+imgId).parent().append("<div class='cover'><a class='deleteBtn big-link' data-reveal-id='delete-img-model' data-animation='fade' onclick=\"setDelect('liLabel"+number+"\')\"></a></div>");
	
	//添加标签
	if ($(".img-box li").length < 5) {
		$(".img-box").append("<li id='liLabel"+imageCount+"'><img id='image"+imageCount+"' style='display:none' width='70' height='70'><a id='label"+imageCount+"' class='addImg' href='javascript:'>购物晒图</a><input class='addImgF' type='file' id='file"+imageCount+"' name='file"+imageCount+
				"\' onchange=\"loadImage(\'file"+imageCount+"\',\'image"+imageCount+"\',\'\',\'85\',\'100\')\"/></li>");
		imageCount++;
	}
	$("#"+imgId).show();
	return true;
}

function setDelect(o){
	$(".purBtn").attr("ccode", o);
}

function deleteImage(o){
	var liLabel = $(o).attr("ccode");
	var lastTitle = "";
	$(".img-box").each(function(){
		lastTitle = $(this).children().last().text();
	});
	
	if ($(".img-box li").length == 5 && lastTitle!="购物晒图"){
		$(".img-box").append("<li id='liLabel"+imageCount+"'><img id='image"+imageCount+"' style='display:none' width='70' height='70'><a id='label"+imageCount+"' class='addImg' href='javascript:'>购物晒图</a><input class='addImgF' type='file' id='file"+imageCount+"' name='file"+imageCount+
				"\' onchange=\"loadImage(\'file"+imageCount+"\',\'image"+imageCount+"\',\'\',\'85\',\'100\')\"/></li>");
		//$("#liLabel"+imageCount).remove();
		imageCount++;
	}
	$("#"+liLabel).remove();
}

function submit(){
	var logistics_company_val = $("#refundReasonSlct").val();
	var logistics_company_text =$("#refundReasonSlct").find("option:selected").text();
	var refundReasonDesc=$("#refundReasonDesc").val();
	
	
	if(logistics_company_val=='-1'){
		Dialog.tips('请选择退货退款理由');
		return;
	}

	if (refundReasonDesc.length > 125) {
		Dialog.tips('评论内容必须在125个字符内');
		return;
	}
	refundReasonDesc = utf16toEntities(refundReasonDesc);
	$("#refundReasonDesc_ipt").val(refundReasonDesc);
	new Dialog('确认提交退货申请?',{
        onConfrim:function(){
        	$('#reasonForm').ajaxSubmit({
				type : "POST",
				url : baseRoot + "/refund/application.h",
				error : function(request) {
					Dialog.tips('请求失败,网络异常');
				},
				dataType : "json",
				processData: false,
				success : function(data) {
					if(data.returnCode==0){
						var msg = data.message;
						if(msg.indexOf("可退数量已达上限")>-1){
							msg = "可退数量已达上限";
						}
						new Dialog(msg,{
							  onlyConfirm:true,
					          onConfrim:function(){
					        	  if(data.message.indexOf("可退数量已达上限") == -1){
						              var succ_url = baseRoot + "/refund/gotoAppliSuccess.h";
									  location.href = succ_url;
					        	  }
					          }
						});
					}else{
						Dialog.tips('提交退款申请失败,'+data.message);
					}
				}
			});
        }
    });
}

/** * 用于把用utf16编码的字符转换成实体字符，以供后台存储 * 
 * @param {string} str 将要转换的字符串，其中含有utf16字符将被自动检出 
 * @return {string} 转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符 */ 
function utf16toEntities(str) { 
	var patt=/[\ud800-\udbff][\udc00-\udfff]/g; 
	// 检测utf16字符正则 
	str = str.replace(patt, function(char){ 
		var H, L, code; 
		if (char.length===2) { 
			H = char.charCodeAt(0); // 取出高位 
			L = char.charCodeAt(1); // 取出低位 
			code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法 
			return "&#" + code + ";"; 
		} else { 
				return char; 
		} 
	}); 
	return str; 
}

function setOpen(o){
	$("#isOpen").val(o);
}

$(document).ready(function(){
	
	
	//${SERVER_WAP_SHOP}/refund/gotoAppliSuccess.h
	$("#submitApplication").click(function(){
		submit();
	});
	
});
