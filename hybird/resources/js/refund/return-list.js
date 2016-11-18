$(document).ready(function(){
    $(".box").scroll(function() {
    	//var currentPage = $("#currentPage").val();
		//var totalPages = $("#totalPages").val();
		var top = $(".box").scrollTop();
		var abs = $(".return_list_area").height() - $(window).height();
	    if (top >= abs) {
	    	if(refundOrderType=="1"){//判断类型 为退货单OR退货申请单  1退货单 2退货申请单
	    		if(parseInt(currentPage) < parseInt(totalPages)){
	    			$.ajax({
						type: "POST",
						url: baseRoot +'/refund/dynamicLoadData.h',
						data : {orderType:refundOrderType,start:currentPage},
						async: false,
						dataType: "json",
						error: function(request) {
				        },
				        success: function(data) {

				        	if(data.returnCode==0){
				        		var htmlStr = "";
				        		var object = data.object;
					        	var salesOrders = object.salesOrders;
					        	var page = object.pagination;
					        	currentPage = ((parseInt(page.currentPage)+1));
					        	if(salesOrders != null && salesOrders.length > 0){
									$.each(returnOrderApply,function(i,o){
										htmlStr += "<div class='return_goods'>";
										htmlStr += "<div class='tit'><div class='time fl'>"+o.createTime+"</div>";
										htmlStr += "<div  class='zt fr '>"+o.returnStatusName+"</div>";
										htmlStr += "</div>";
										var productHtml = "";
										$.each(o.productInfos,function(i,p){
											productHtml += "<div class='con'><a class='con_href' href='"+baseRoot+"/refund/orderDetail.h?applyOrderId="+o.returnOrderApplyId+"&orderType=2&orderId="+o.returnOrderId+"'>";
											if(p.mainImageUrl){
											    productHtml += "<img class='goods_img' src='"+p.mainImageUrl+"'/>";
											}else{
												productHtml += "<img src='"+baseRoot+"/resources/base/images/jiesuan/goods_img.png' class='goods_img'>";
											}
											productHtml += "<div class='goods_info'><div class='goods_tit'>"+p.productName+"</div>"+
						                             "<em class='fl'>商品规格："+p.colorName+"&nbsp;"+p.sizeName+"</em><b>退货数量：<span>"+
						                             p.qty+"</span>件</b><cite>¥<span>"+p.marktPrice+"</span></cite><i>x<span>"+p.qty+"</span></i></div></a></div>";
										});
										htmlStr += productHtml;
									    htmlStr += "</div>";
									});
					        	}
					        	$(".return_list_area").append(htmlStr);
				        	}
				        
				        }
		    		});
	    		}
	    	}else if(refundOrderType=="2"){
				if(parseInt(currentPage) < parseInt(totalPages)){
		    		$.ajax({
						type: "POST",
						url: baseRoot +'/refund/dynamicLoadData.h',
						data : {orderType:refundOrderType,start:currentPage},
						async: false,
						dataType: "json",
						error: function(request) {
				        },
				        success: function(data) {
				        	if(data.returnCode==0){
				        		var htmlStr = "";
				        		var object = data.object;
					        	var returnOrderApply = object.returnOrderApply;
					        	var page = object.pagination;
					        	currentPage = ((parseInt(page.currentPage)+1));
					        	if(returnOrderApply != null && returnOrderApply.length > 0){
									$.each(returnOrderApply,function(i,o){
										htmlStr += "<div class='return_goods'>";
										htmlStr += "<div class='tit'><div class='time fl'>"+o.creationTime+"</div>";
										if(o.returnOrderApplyStatus==430){
											htmlStr += "<div  class='zt fr gray'>"+o.returnOrderApplyStatusName+"</div>";
										}else{
											htmlStr += "<div  class='zt fr '>"+o.returnOrderApplyStatusName+"</div>";
										}
										htmlStr += "</div>";
										var productHtml = "";
										$.each(o.productInfos,function(i,p){
											productHtml += "<div class='con'><a class='con_href' href='"+baseRoot+"/refund/orderDetail.h?applyOrderId="+o.returnOrderApplyId+"&orderType=2&orderId='>";
											if(p.mainImageUrl){
											    productHtml += "<img class='goods_img' src='"+p.mainImageUrl+"'/>";
											}else{
												productHtml += "<img src='"+baseRoot+"/resources/base/images/jiesuan/goods_img.png' class='goods_img'>";
											}
											productHtml += "<div class='goods_info'><div class='goods_tit'>"+p.productName+"</div>"+
						                             "<em class='fl'>商品规格："+p.colorName+"&nbsp;"+p.sizeName+"</em><b>退货数量：<span>"+
						                             p.qty+"</span>件</b><cite>¥<span>"+p.marktPrice+"</span></cite><i>x<span>"+p.qty+"</span></i></div></a></div>";
										});
										htmlStr += productHtml;
										if(o.returnOrderApplyStatus==420 || o.returnOrderApplyStatus==410){
										    htmlStr += "<div class='total'><p>";
										    if (o.returnOrderApplyStatus==420 && o.returnOrderApplyType=='TUIHUO'){
										    	htmlStr += " <a href='"+baseRoot+"/refund/gotoLogistics.h' class='btn fr'>填写退货物流</a>&nbsp;";
										    }else if(o.returnOrderApplyStatus==410){
										    	htmlStr += "<a href='javascript:void(0);' id='cancelApp' returnApplyid='"+o.returnOrderApplyId+"' class='btn fr cancel' onclick='cancelF()'>取消申请</a>";
										    }
										 htmlStr += "</p></div>";
										}
									    htmlStr += "</div>";
									});
					        	}
					        	$(".return_list_area").append(htmlStr);
				        	}
				        }
		    		});
				}
	    	}
	    }
	  });
	});


$(".cancel").click(function() {
    var returnApplyid_str = $(this).attr("returnApplyid");
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


function cancelF(){
	var returnApplyid_str = $(this).attr("returnApplyid");
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
}
