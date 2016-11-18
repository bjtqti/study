
/***
 * 属性组选择器
 */
function Selector(singleCode,singleAllstr){
	this.elements = [];
	this.pointer = [];
	this.isLock = false;
	this.attrValues = $.parseJSON(singleAllstr)||{};
	this.singleCode = singleCode;
	this.singleAttr = this.attrValues[singleCode].split(',');
	this.setDefaultValue();
	this.bindEvent();
}

/**
 * 保存所有属性所对就应的节点
 * 为节点标记坐标
 * 高亮当前属性
 * 置灰不可用属性
 */
Selector.prototype.setDefaultValue = function(){
	var it = this,
		elements = [],
		singleAttr = this.singleAttr;
	$('.size-select').each(function(i,items){
		var cell = [],
			select = $(items),
			name=select.find('span').text();
		select.find('a').each(function(j,item){
			var node = $(item),
				value=name+'##'+node.text();
			if(value===singleAttr[i]){
				it.pointer.push([i,j]);
			}
			node.attr('data-pos',i+','+j);
			cell.push({
				node:node,
				text:value
			});
		});
		elements.push(cell);
	});
	this.elements = elements;
	this.pointer.forEach(function(point){
		var x = point[0],
			y = point[1];
		it.setActiveItemOn(x,y);
	});
	this.disableItemAttr();
}

/**
 * 绑定事件
 */
Selector.prototype.bindEvent = function(){
	var it = this,
		elements = this.elements;
	$('.dialog_scroll').on('click',function(e){
		var target = e.target,
			data = target.getAttribute('data-pos');
		if(!data){
			return false;
		}
		var pos = it.getPosition(data),
			x = pos[0],
			y = pos[1],
			item = elements[x][y];
		if(item.isDisable||item.isActive){
			return false;
		}
		it.handleClick(x,y);
	});
}

/**
 * 获取坐标
 */
Selector.prototype.getPosition = function(data){
	if(!data){
		return false;
	}
	var pos = data.split(',');
	pos.forEach(function(item,i){
		pos[i] =  parseInt(item);
	});
	return pos;
}

/**
 * 置灰不可用属性
 */
Selector.prototype.disableItemAttr = function(){
	var it = this,
		elements = this.elements,
		singleAttr = this.singleAttr,
		attrValues = this.attrValues;

	elements.forEach(function(items,i){
		items.forEach(function(item,j){
			var attr = singleAttr.concat();
			attr[i]=item.text;
			if(it.checkIsExist(attr.join(','))){
				it.setDisableItemOff(i,j);
			}else{
				it.setDisableItemOn(i,j);
			}
		});
	});
}

/**
 * 检查属性对应的单品是否存在
 */
Selector.prototype.checkIsExist = function(attr){
	var attrValues = this.attrValues,
		find = false;
	for(var key in attrValues){
		if(attrValues[key]=== attr){
			find = true;
		}
	}
	return find;
}

/**
 * 点击切换属性
 */
Selector.prototype.handleClick = function(x,y){
	var p = this.pointer[x],
		it = this;
	this.setActiveItemOff(p[0],p[1]);
	this.setActiveItemOn(x,y);
	this.disableItemAttr();
	var code = this.findSingleCode();
	this.updateSingleCode(code);
	//this.updateNodeText();
	this.getInfoByCode(code,function(result){
		it.updateInfo(result);
	});
}

/**
 * 查找当前code
 */
Selector.prototype.findSingleCode = function(){
	var singleCode,
		singleAttr = this.singleAttr.join(','),
		attrValues = this.attrValues;
	for(var key in attrValues){
		if(attrValues[key]===singleAttr){
			singleCode = key;
		}
	}

	return singleCode;
}

/**
 * 更新当前code
 */
Selector.prototype.updateSingleCode = function(code){
	this.singleCode = code;
	//this.inputNode.val(code);
}

/**
 * 设为选择状态
 */
Selector.prototype.setActiveItemOn = function(x,y){
	var item = this.elements[x][y];
	if(item.isActive) return;
	item.node.addClass('active');
	item.isActive = true;
	this.singleAttr[x] = item.text;
	this.pointer[x]=[x,y];
}

/**
 * 去掉选中状态
 */
Selector.prototype.setActiveItemOff = function(x,y){
	var item = this.elements[x][y];
	if(!item.isActive) return;
	item.node.removeClass('active');
	item.isActive = false;
	this.singleAttr[x] = null;
	this.pointer[x]=null;
}

/**
 * 置灰
 */
Selector.prototype.setDisableItemOn = function(x,y){
	var item = this.elements[x][y];
	if(item.isDisable) return;
	item.node.addClass('dis');
	item.isDisable = true;
}

/**
 * 取消置灰
 */
Selector.prototype.setDisableItemOff = function(x,y){
	var item = this.elements[x][y];
	if(!item.isDisable) return;
	item.node.removeClass('dis');
	item.isDisable = false;
}

/**
 * 更新已选择的显示信息
 */
Selector.prototype.updateNodeText = function(){
	if(!this.specNode){
		this.specNode = $('#current-attr');
	}
	var singleAttr = this.singleAttr,
		attr = [];
	singleAttr.forEach(function(item){
		attr.push(item.split('##')[1])
	});
	this.specNode.html(attr.join(','));
}

/**
 * 获取当前singlecode的图片，库存，价格信息
 */
Selector.prototype.getInfoByCode = function(code,callback){
	if(this.lock){
		return false;
	}
	this.lock = true;
	var it = this;
	$.ajax({
		url:baseRoot+'/sps-'+code+'.html',
		dataType:'json',
		success:function(result){
			//console.log(result)
			it.lock = false;
			callback(result);
		}
	});
}

/**
 * 更新图片，价格，库存
 */
Selector.prototype.updateInfo=function(result){
	if(!result||result.returnCode===-1){
		return false;
	}
	if(!this.modeBox){
		this.modeBox = $('#goods-sure');
	}
	result = result.object;
	if($.isArray(result.picList)){
		this.modeBox.find('img').src=imgServer+'/'+result.picList[0];
	}
	var stock = 1,
	    text = '<span>¥'+result.originPrice+'.00</span>';
	if(result.stock&&result.stock.stock){
		stock = result.stock.stock;
	}
	text += '<em>库存<i>'+stock+'</i>件</em>';
	this.modeBox.find('.left').html(text);
}

/**
 * 收藏商品
 */
function Favorite(singleCode,productCode,collectFlag){
	this.singleCode = singleCode;
	this.collectFlag = parseInt(collectFlag);
	this.productCode = productCode;
	this.handleNode = $(".goods_fav");
	this.time = 3000;
	this.setDefaultStatus();
	this.bindEvent();
}

/**
 * 收藏按钮点击事件
 */
Favorite.prototype.bindEvent = function(){
	var it = this;
	this.handleNode.on('click',function(){
		if(it.locked){
			return false;
		}
		it.locked = true;
		if(it.collectFlag){
			it.delFavorite();
		}else{
			it.addFavorite();
		}
		setTimeout(function(){
			it.locked = false;
		},it.time);
	});
}
/**
 * 添加收藏
 */
Favorite.prototype.addFavorite = function(){
	var it = this;
	$.ajax({
		url : baseRoot + "/collect/add.html",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":it.singleCode,
			"productCode":it.productCode
		},
		success : function(result){
			if(result.status=="noLogin"){
				return redictToLogin(baseRoot+'/sp-'+it.singleCode+".html");
			}
			if(result.status==='success'){
				it.handleNode.addClass('been');
				it.collectFlag=1;
				Dialog.tips('收藏成功',it.time);
			}
		}
	});
}

/**
 * 取消收藏
 */
Favorite.prototype.delFavorite = function(){
	var it = this;
	$.ajax({
		url : baseRoot + "/collect/deleteCollect.html",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":it.singleCode
		},
		success : function(result){
			if(result.returnCode===0){
				it.handleNode.removeClass('been');
				it.collectFlag=0;
				Dialog.tips('收藏取消',it.time);
			}
		}
	});
}

/**
 * 初始化收藏状态
 */
Favorite.prototype.setDefaultStatus=function(){
	if(this.collectFlag===1){
		$('.goods_fav').addClass('been');
	}
}

/***
 * 数量加减框
 */
function NumberPicker(maxValue,minValue,step){
	var box = $('#number-input').children();
	this.minusBtn = box.eq(0);
	this.input = box.eq(1);
	this.plusBtn = box.eq(2);
	this.value = parseInt(this.input.val(),10);
	this.maxValue = maxValue;
	this.minValue = minValue;
	this.step = step;
	if(this.value>=this.minValue){
		this.disableMinus();
	}
	if(this.value>=this.maxValue){
		this.disablePlus();
	}

	if(this.maxValue < this.minValue){
		this.disableMinus();
		this.disablePlus();
	}
	this.bindEvent();
}

/**
 * 监听加减操作事件
 */
NumberPicker.prototype.bindEvent = function(){
	var it = this;
	this.minusBtn.on('click',function(e){
		it.minus();
	});
	this.plusBtn.on('click',function(e){
		it.plus();
	});
	// this.input.on('change',function(e){
	// 	var value = parseInt(e.target.value,10)||0;
	// 	it.change(value);
	// });
}

/**
 * 加操作
 */
NumberPicker.prototype.plus = function(){
	if(this.isDisabledPlus){
		return false;
	}
	if(this.isDisabledMinus){
		this.enableMinus();
	}
	if(this.value<this.maxValue){
		this.value += this.step;
	}else{
		this.value = this.maxValue;
	}
	if(this.value >=this.maxValue){
		this.disablePlus();
	}
	this.input.val(this.value);
}

/**
 * 减操作
 */
NumberPicker.prototype.minus = function(){
	if(this.isDisabledMinus){
		return false;
	}
	if(this.isDisabledPlus){
		this.enablePlus();
	}
	if(this.value>this.minValue){
		this.value -= this.step;
	}else{
		this.value=this.minValue;
	}
	if(this.value<=this.minValue){
		this.disableMinus();
	}
	this.input.val(this.value);
}

/**
 * 键盘输入
 */
NumberPicker.prototype.change = function(value){
	this.value = value;
	if(value<this.minValue){
		this.value = this.minValue;
		this.disableMinus();
		this.enablePlus();
	}
	if(value>this.maxValue){
		this.value = this.maxValue;
		this.disablePlus();
		this.enableMinus();
	}
	if(value > this.minValue && value < this.maxValue){
		this.enableMinus();
		this.enablePlus();
	}
	this.input.val(this.value);
}

/**
 * 禁用减按钮
 */
NumberPicker.prototype.disableMinus=function(){
	this.minusBtn.addClass('unable');
	this.isDisabledMinus = true;
}

/**
 * 启用减按钮
 */
NumberPicker.prototype.enableMinus=function(){
	this.minusBtn.removeClass('unable');
	this.isDisabledMinus = false;
}

/**
 * 禁用加按钮
 */
NumberPicker.prototype.disablePlus=function(){
	this.plusBtn.addClass('unable');
	this.isDisabledPlus = true;
}

/**
 * 启用加按钮
 */
NumberPicker.prototype.enablePlus=function(){
	this.plusBtn.removeClass('unable');
	this.isDisabledPlus = false;
}


/***
 * 设置内容区的高度防止遮罩滚动溢出
 */
function setContainerHeight(){
	var screenHeight = $(window).height(),
	    footHeight = $(".goodsBtns").height()+1;
	$(".goods").css({"height":screenHeight - footHeight});
}

/**
 * 规格弹出弹框 
 */
function showCheckBox(numberPick,selector){
	var mask = $('.mask'),
		dailog=$('.goodsDialog'),
		winW = $(window).width(),
	    winH = $(window).height();
	mask.css({"width":winW,"height":winH});
	
	$(".info-spec").click(function(){
		dailog.css({"bottom":"0"});
		mask.show();

	});
	dailog.css({"width":winW,"height":winH}).find('.icon-close').on('click', function(){
		var num = numberPick.value,
			code = selector.singleCode;
		dailog.css({"bottom":"-100%"});
		mask.hide();
		if(code !== singleCode){
			location.href= baseRoot+'/sp-'+code+'.html?selNum='+num;
		}
	});
}

/***
 * 检查是否登陆
 */
function checkIsMember(callback){
	$.ajax({
		url:baseRoot + '/membercenter/findMemberInfo.html',
		dataType:'json',
		success:function(result){
			//console.log(result)
			if(result&&result.returnCode===0){
				callback(result);
			}else{
				redictToLogin();
			}
		}
	})
}

/**
 * 登陆跳转
 */
function redictToLogin(){
	var url = baseRoot+'/sp-'+singleCode+'.html';
	if(selNum){
		url += '?selNum='+selNum;
	}
	var backurl = encodeURIComponent(url);
	window.location.href = sslHost+"/member/"+appKey+"/vshop/wap/login.html?tag=&responseType=code&redirectUrl=" + backurl;
				
}

/**
 * 获取购物车数量
 */
function getCartBuyed(){
	var cartNode = $('#cart-buyed');
	$.ajax({
		url:baseRoot + '/cart/countNumber.html',
		dataType:'json',
		success:function(result){
			//console.log(result);
			if(result&&result.returnCode===0&&result.object>0){
				cartNode.html('<em>'+result.object+'</em>');
			}
		}
	})
}

/**
 * 添加到购物车
 *
 */
function addCart(code,buyed){
	$.ajax({
		url:baseRoot+'/cart/saveOrUpdateCart.html',
		dataType:'json',
		data:{singleCode:code,qty:buyed,figureUpFlag:true},
		success:function(result){
			//console.log(result)
			var message = '系统正忙,请稍候再试';
			if(result&&result.returnCode===0){
				getCartBuyed();
				message = '已加入购物车';
			}
			Dialog.tips(message,3000);
			
		}
	})
}

// JavaScript Document

$(document).ready(function(){
	if(version === 2) return;
	setContainerHeight();
	var favorite = new Favorite(singleCode,productCode,collectFlag),
	    selector = new Selector(singleCode,singleAllstr),
	    numberPick = new NumberPicker(maxValue,minValue,step);
	showCheckBox(numberPick,selector);
 	getCartBuyed();
	lineSet(".inve,.inve span.invel,.inve span.inver,.info-promotion i,.info-name .goods_fav span,.info-name,.comList,.goodsBtns,a.goods_add,a.goods_buy,.goodsSure > img,.select a,.inve span.invel,.inve span.inver,.inve input.invev,a.goods-add,a.goods-buy,.goodsSureBtn");
	//移动幻灯
	if(hasBanner){
		TouchSlide({ 
			slideCell:"#banner",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			autoPlay:false,//自动播放
			autoPage:true //自动分页
		});
	}

	//触发弹层
	$('.goodsBtns').on('click',function(e){
		var $btn = $(e.target);
		if($btn.hasClass('sold-out')){
			return false;
		}
		checkIsMember(function(){
			$(".info-spec").click();
		});
	});

	//点击加入购物车，立即购买
	var lock = false;
	$('.goodsSureBtn').on('click',function(e){
		if(lock) return false;
		lock = true;
		var $btn = $(e.target),
			code= singleCode,
			num = numberPick.value;
		if($btn.hasClass('goods-add')){
			addCart(code,num);
			setTimeout(function(){
				lock = false;
			},3000);
			return false;
		}
		if($btn.hasClass('goods-buy')){
			location.href=baseRoot+'/goods-detail.html?singleCode='+code;
			return false;
		}
	});
});


