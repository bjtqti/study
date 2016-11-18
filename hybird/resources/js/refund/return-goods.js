/**
 * ajax
 */
function requestAjax(url,data,fn){
  $.ajax({
    url:baseRoot+url,
    type:'POST',
    dataType:'json',
    data:data,
    success:function(result){
      fn&&fn(result);
    }
  });
}

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
		var storecode = $("input[name='storecode']:first").val();
		var countercode = $("input[name='countercode']:first").val();
		var subOrderId_str = $("#subOrderId").val();//suborderId
		if(ss==0){
			Dialog.tips('未勾选申请退货商品');
	    	return;
		}else{
			location.href = baseRoot+"/refund/gotoAppliGoodsReason.h?subOrderId="+subOrderId_str+"&productInfos="+productInfos_str+"&storeCode="+storecode+"&counterCode="+countercode;			
		}
	});
});