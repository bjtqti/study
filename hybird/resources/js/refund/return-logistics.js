/**
 * 绑定事件
 */
function bindEvent() {
  $('#submitlogistics').on('click', function(e) {
	  new Dialog('确认提交退货物流申请?',{
          onConfrim:function(){
        	  submitLgistics();
          }
        });
  });
}
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


/**
 * 提交物流信息
 */
function submitLgistics() {
	var returnOrderId_val = $("#returnOrderId").val();
	var logistics_company_val =$("#logistics_company").val();
	var logistics_company_text =$("#logistics_company").find("option:selected").text();
	var logistics_number=$("#logistics_number").val();
	var logistics_phone=$("#logistics_phone").val();
	
	if(logistics_company_val=='-1'){
		Dialog.tips('请选择物流公司');
		return;
	}
	if(logistics_number==""){
		Dialog.tips('请填写物流单号');
		return;
	}
	
    if(logistics_phone==""){
    	Dialog.tips('请填写联系电话');
    	return;
	}

    $('#reasonForm').ajaxSubmit({
		type : "POST",
		url : baseRoot + "/refund/logisticsFillin.h",
		error : function(request) {
			Dialog.tips('请求失败,网络异常');
		},
		dataType : "json",
		processData: false,
		success : function(data) {
			if(data.object){
				Dialog.tips(data.object);
			}else{
				Dialog.tips(data.message);
			}
			
        	location.href = baseRoot+"/refund/orderList.h";
		}
	});
	
}

// JavaScript Document
$(document).ready(function() {

  bindEvent();
});

