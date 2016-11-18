$(document).ready(function(){
	$("#cancelApp").click(function(){
		var returnApplyid_str = $("#returnOrderApplyId").val();
	    new Dialog('确认取消退货退款申请?',{
	        onConfrim:function(){
	        	$.ajax({
	        	    url:baseRoot+"/refund/applicationCancel.h",
	        	    type:'POST',
	        	    dataType:'json',
	        	    data:{
	        	    	returnOrderApplyId:returnApplyid_str
	        	    },
	        	    success:function(data){
	        	    	if (data.returnCode == "0") {
							Dialog.tips(data.object);
						}
						var succ_url = baseRoot + "/refund/applicationList.h";
						location.href = succ_url;
	        	    }
	        	  });
	        }
	    });
		
	});
		
});