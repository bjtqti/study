$(document).ready(function(){
	$("#nextStep").click(function(){
		//check 检查是否有勾选的商品
		var ss=$(".one-goods .goods-check:checked").length;
		var productInfos_str = "";
		$(".one-goods .goods-check:checked").each(function(e){
			var productCode = $(this).val();
			var productNum = $(this).parents(".goods-msg").find(".goods_num").find(".am-num-text").val();
			productInfos_str += productCode+"_"+productNum+";"
			
		});
		$("#proudctInfoStr").val(productInfos_str);
		if(ss==0){
			Dialog.tips('未勾选申请退款商品');
	    	return;
		}else{
			new Dialog('确认提交退款申请?',{
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
	});
	
});