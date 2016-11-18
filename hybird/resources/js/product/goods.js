
/***
 * 商品属性组合选择器（支持二维组合）
 * @param {string} id 属性DOM节点的ID
 * @param {json|string} 序列化的属性数据
 * @author <278500368@qq.com>
 * @desc 
 *     1. 自动切换商品预览图，库存，价格
 *     2. 自动灰掉不能点选的属性
 *     3. 自动点选可用的第一个属性
 */
function Selector(id,jsData){
	this.id = id;
	this.jsData = jsData;
	this.selected = [];
	this.data = {};
	this.elements = [];
	this.init();
}

Selector.prototype = {
	/**
	 * 初始化
	 */
	init:function(){
		this.initData();
		this.initElements();
		this.initActive();
		if (this.elements.length > 1) {
			this.filterDisable(1);
		}
		this.bindEvent();
	},
	/**
	 * 格式化数据
	 */
	initData: function() {
		var data = JSON.parse(this.jsData);
		var _data = {};
		for (var k in data) {
			var tmp = data[k].split(',');
			var arr = [];
			tmp.forEach(function(v) {
				var sp = v.split('##');
				sp[1] && arr.push(sp[1]);
			});
			_data[k] = arr;
		}
		this.data = _data;
	},
	/**
	 * 收集可用的属性组合
	 */
	initElements:function(){
		var elements = [];
		$('.size-select').each(function(i,items){
			var arr = [];
			$(items).children('a').each(function(j,item){
				item.setAttribute('data-aix', i + ',' + j);
				arr.push({
					el: item,
					val: $(item).text()
				});
			});
			elements.push(arr);
		});
		this.elements = elements;
	},
	/**
	 * 初始化当前属性
	 */
	initActive:function(){
		var attr = this.data[this.id];
		var it = this;
		this.elements.forEach(function(items, i) {
			items.forEach(function(item, j) {
				if (item.val === attr[i]) {
					it.setActive(item, true);
					it.selected.push(item);
				}
			});
		});
	},
	/**
	 * 置灰不可用属性
	 */
	filterDisable: function(x) {
		if (!this.elements[x]) {
			return;
		}
		var item = this.selected[0],
			data = this.data,
			enabled = [];
		for (var k in data) {
			if (data[k][0] === item.val) {
				enabled.push(data[k][1]);
			}
		}
		this.elements[x].forEach(function(item) {
			if (enabled.indexOf(item.val) === -1) {
				item.el.className = 'dis';
				item.isDisable = true;
			}
		});
	},
	/**
	 * 邦定事件
	 */
	bindEvent:function(){
		var it = this;
		$('.dialog_scroll').on('click',function(e){
			if (e.target.getAttribute('data-aix')) {
				//console.log(e.target.innerText)
				it.handleClick(e.target)
			}
		});
	},
	/**
	 * 点击属性标签事件
	 */
	handleClick: function(target) {
		var aix = target.dataset.aix.split(','),
			x = parseInt(aix[0]),
			y = parseInt(aix[1]),
			item = this.elements[x][y];
		if (item.isActive || item.isDisable) {
			return false;
		}
		if (this.selected[x].isActive) {
			this.setActive(this.selected[x], false);
		}
		this.setActive(item, true);
		this.selected[x] = item;
		x++;
		if (this.elements[x]) {
			this.clear(x);
			this.filterDisable(x);
			this.setDefaultActive(x);
		}
		var id=this.findId();
		if(id){
			this.requestData(id);
		}
	},
	/**
	 * 查找当前属性组合所对应的商品id
	 */
	findId: function() {
		var arr = [],
			data = this.data;
		this.selected.forEach(function(item) {
			arr.push(item.val);
		});
		for (var k in data) {
			var values = data[k];
			if (values.join() === arr.join()) {
				return k;
			}
		}
		return false;
	},
	/**
	 * 标记/取消 活动标签
	 */
	setActive: function(item, status) {
		item.el.className = status ? 'active' : '';
		item.isActive = status;
	},
	/**
	 * 标记/取消 不可用标签
	 */
	setDisable: function(item, status) {
		item.el.className = status ? 'dis' : '';
		item.isDisable = !!status;
	},
	/**
	 * 设置活动标签
	 */
	setDefaultActive: function(x) {
		var items = this.elements[x];
		if (!items) {
			return;
		}
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (!item.isDisable) {
				this.setActive(item, true);
				this.selected[x] = item;
				break;
			}
		}
	},
	/**
	 * 清除所有标记
	 */
	clear: function(x) {
		if (!this.elements[x]) {
			return;
		}
		this.elements[x].forEach(function(item) {
			item.el.className = '';
			item.isDisable = false;
			item.isActive = false;
		});
	},
	/**
	 * 获取数据
	 */
	requestData:function(id){
		var it = this;
		$.ajax({
			url:baseRoot+'/sps-'+id+'.h',
			dataType:'json',
			success:function(result){
				if(!result||result.returnCode===-1){
					return false;
				}
				it.id = id;
				it.updateView(result.object);
			}
		});
	},
	/**
	 * 更新属性界面
	 */
	updateView:function(result){
		if(!this.modeBox){
			this.modeBox = $('#goods-sure');
		}
		var imgsrc = baseRoot+'/resources/images/load.gif',
		    stock = 1,
		    text = '<span>¥'+formatPrice(result.salesPrice)+'</span>';
		if(result.picList&&result.picList[0]){
			imgsrc=result.picList[0];
		}
		this.modeBox.find('img').attr('src',imgsrc);
		if(result.stock&&result.stock.stock){
			stock = result.stock.stock;
		}
		text += '<em>库存<i>'+stock+'</i>件</em>';
		this.modeBox.find('.left').html(text);
	}
}

 
/**
 * 收藏商品
 */
function Favorite(singleCode,productCode,collectFlag){
	this.singleCode = singleCode;
	this.collectFlag = parseInt(collectFlag);
	this.productCode = productCode;
	this.handleNode = $(".goods_fav");
	this.time = 1500;
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
		url : baseRoot + "/collect/add.h",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":it.singleCode,
			"productCode":it.productCode
		}
	}).then(function(result){
		if(result.status==='success'){
			it.handleNode.addClass('been');
			it.collectFlag=1;
			Dialog.tips('已收藏',it.time);
		}
	},function(result){
		if(result.responseText==='noLogin'){
			redictToLogin();
		}
	})
}

/**
 * 取消收藏
 */
Favorite.prototype.delFavorite = function(){
	var it = this;
	$.ajax({
		url : baseRoot + "/collect/deleteCollect.h",
		type : "post",
		dataType : "json",
		data : {
			"singleCode":it.singleCode
		},
		success : function(result){
			if(result.returnCode===0){
				it.handleNode.removeClass('been');
				it.collectFlag=0;
				Dialog.tips('取消收藏',it.time);
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
 /*
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
*/
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
			code = selector.id;
		dailog.css({"bottom":"-100%"});
		mask.hide();
		if(code !== singleCode){
			var url = baseRoot+'/sp-'+code+'.h';
			if(selNum>1){
				url +='?selNum='+selNum;
			}
			location.href= url;
		}
	});
}

/***
 * 检查是否登陆
 */
function checkIsMember(callback){
	$.ajax({
		url:baseRoot + '/membercenter/findMemberInfo.h',
		dataType:'json'
	}).then(function(res){
		if(res.returnCode===0){
			callback(res);
		}else{
			redictToLogin();
		}
	});
}

/**
 * 登陆跳转
 */
function redictToLogin(){
	var url = baseRoot+'/sp-'+singleCode+'.h';
	if(selNum&&selNum>1){
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
		url:baseRoot + '/cart/countNumber.h',
		dataType:'json',
		success:function(res){
			if(res&&res.returnCode===0&&res.object>0){
				cartNode.html('<em>'+res.object+'</em>');
			}
		}
	})
}

/**
 * 添加到购物车
 * @author <278500368@qq.com>
 */
function addCart(code,buyed){
	$.ajax({
		url:baseRoot+'/cart/saveOrUpdateCart.h',
		dataType:'json',
		data:{singleCode:code,qty:buyed,figureUpFlag:true}
	}).then(function(res){
		var message = '添加失败';
		if(res&&res.returnCode===0){
			getCartBuyed();
			message = '添加成功';
		}
		Dialog.tips(message,3000);
	},function(error){
		if(error.responseText==='noLogin'){
			redictToLogin();
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
		var eventType = e.target.getAttribute('data-event');
		if(eventType ==='show-size'){
			checkIsMember(function(){
				$(".info-spec").click();
			});
		}
	});

	//点击加入购物车，立即购买
	var lock = false;
	$('.goodsSureBtn').on('click',function(e){
		if(lock) return false;
		lock = true;
		var $btn = $(e.target),
			code = selector.id,
			num = numberPick.value;
		if($btn.hasClass('goods-add')){
			addCart(code,num);
			setTimeout(function(){
				lock = false;
			},3000);
			return false;
		}
		if($btn.hasClass('goods-buy')){
			$('.mask').hide();
			$('.goodsDialog').css({"bottom":"-100%"});
			Dialog.lock.show('正在生成订单,请稍候...');
			location.href=baseRoot+'/cart/confirmOrder.h?singleCodes='+code+'&qtys='+num;
			return false;
		}
	});
});


