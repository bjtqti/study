
/**
 * 商品状态显示
 * @param {String} selector classId
 */
function Goods(selector){
	var elements = $(selector);
	this.data=[];
	this.init(elements);
}

/**
 * 初始化数据
 * @param {Array} elements 元素集合
 */
Goods.prototype.init=function(elements){
	var it = this,
		arr=[];
	if(!elements||!elements.length){
		return;
	}
	elements.each(function(i,item){
		var id = item.getAttribute('data-id');
		it.data.push({element:item,id:id});
		arr.push(id);
	});
	if(arr.length){
		var ids= this.uniqe(arr);
		this.query(ids.join(','));
	}
}

/**
 * 去重复
 * @param {Array} data singcode
 * @return {Array} 
 */
Goods.prototype.uniqe=function(data){
	var arr = [];
	data.forEach(function(id){
		if(arr.indexOf(id)===-1){
			arr.push(id);
		}
	});
	return arr;
}

/**
 * 更新商品状态
 */
Goods.prototype.update=function(element,info){
	switch(info.status){
		case "OFFSALE":
			$(element).find('.off-shelf').show();
			break;
		case "ONSALE":
			if(info.stock<1){
				$(element).find('.sold-out').show();
			}else{
				$(element).find('em').html('¥'+info.price);
			}
			break;
		default:
			console.log(info)
			break;
	}
}
/**
 * 批量查询商品状态
 * @param {String} ids 用逗号拼接的singlecode
 */
Goods.prototype.query=function(ids){
	if(!ids) return;
	var baseRoot = SERVER_WAP_SHOP;
	var it = this;
	$.ajax({
		url : baseRoot + "/product/findProductBrief.h?calback?",
		dataType : "jsonp",
		data : {
			"singleCodes":ids
		},
		success : function(result){
			//console.log(result)
			if(result && result.length){
				it.updateDataStatus(result);
			}
		}
	});
}

/**
 * 格式化价格
 * @param {int} price 索引
 */
Goods.prototype.formatPrice=function(price){
	var priceStr = Number(price);
	if(typeof priceStr === 'number'){
		return priceStr.toFixed(2);
	}
	return price;
}


/**
 * 更新商品数据的状态
 * @param {Array} result 商品结果集
 */
Goods.prototype.updateDataStatus=function(result){
	var obj={};
	for(var i=0,n=result.length;i<n;i++){
		var item = result[i];
		obj[item.productCode]={
			status:item.onSaleStatus,
			stock:item.availableAmount,
			price:this.formatPrice(item.marketPrice)
		}
	}
	var it =this;
	this.data.forEach(function(item){
		var id = item.id;
		obj[id]&&it.update(item.element,obj[id]);
	});
}

// JavaScript Document

$(function(){
	lineSet("header ul li a span,.activity-1 span a,footer");
	new Goods('.single-recommend a');
	/* 移动幻灯事件 */
	TouchSlide({ 
		slideCell:"#banner",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"leftLoop", 
		autoPlay:true,//自动播放
		autoPage:true //自动分页
	});
})
