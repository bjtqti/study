
/**
 * 滑屏插件
 * @author 蛙哥 <278500368@qq.com>
 * @version 1.0.2
 */
function TabSlide(){
	this.activeIndex = 0;
	this.initMenu();
	this.initContent();
}

TabSlide.prototype = {
	initMenu:function(){
		var tab = this;
		this.menu = new Swiper('#swiper-menu',{
			slidesPerView:5,
			allowSwipeToPrev:false,
			allowSwipeToNext:false,
			initialSlide:tab.activeIndex,
			onTap:function(swiper){
				var clickedIndex = swiper.clickedIndex;
				if(clickedIndex === tab.activeIndex){
					return;
				}
				tab.updateActiveMenu(swiper,clickedIndex);
				tab.content.slideTo(clickedIndex);
			}
		})
	},
	initContent:function(){
		var tab = this;
		this.content = new Swiper('#swiper-main',{
			initialSlide:tab.activeIndex,
			onInit:function(swiper){
				var height = tab.cacleHeight();
				swiper.container.css({
					height:height+'px'
				});
				swiper.slides.each(function(i,item){
					var scrolls = $(item).find('.scroll');
					scrolls.each(function(i,s){
						s.style.height = height + 'px';
					});
				});
			},
			onTap:function(s,e){
				if(e.target.className==='icon-zhu'){
					tab.onClick();
				}
			},
			onSlideChangeEnd:function(swiper){
				tab.updateActiveMenu(tab.menu,swiper.activeIndex);
			}
		});
	},
	updateActiveMenu:function(swiper,index){
		var tab = this;
		if(swiper.activeIndex === index){
			return;
		}
		swiper.activeIndex=index;
		tab.activeIndex = index;
		swiper.updateClasses();
	},
	cacleHeight:function(){
		var screenHeight = window.innerHeight;
		var topHeight = $('#topline').height();
		return screenHeight - topHeight;
	},
	onClick:function(){
		//回调接口
	}
}

/**
 * 播放视频
 */
function videoplay(){
	document.getElementById('main-video').play();
}

/**
 * 暂停视频
 */
function videostop(){
	document.getElementById('main-video').pause();
}

 
/**
 * 点击切换排行榜
 */
function handleClickSwitch(){
	var activeIndex = 0;
	var menu = $('#top-list');
	var children = menu.children();
	var items = menu.siblings('.top-list-item');
	var activeName = 'active';
	menu.on('click',function(e){
		var index = parseInt(e.target.dataset.index)||0;
		if(index !== activeIndex){
			children.eq(activeIndex).removeClass(activeName);
			children.eq(index).addClass(activeName);
			items.eq(activeIndex).removeClass(activeName);
			items.eq(index).addClass(activeName);
			activeIndex = index;
		}
	});
	children.eq(activeIndex).addClass(activeName);
	items.eq(activeIndex).addClass(activeName);
}

/**
 * 助威程序入口
 */
function iZan(){
	return new iZan.init();
}

iZan.init = function(){
	this.mask = $('#mask');
	this.picker = new NumberPicker();
	this.banner = new BannerSelect();
	this.cart = new Carts();
	this.isActive = false;
	this.initChild();
	this.bindEvent();
}
/**
 * 助威相关方法
 */
iZan.init.prototype = {
	//隐藏蒙版
	hideMask:function(){
		this.isActive = false;
		this.mask.removeClass('trans-show').addClass('trans-hide');
		videoplay();
	},
	//显示蒙版
	showMask:function(){
		this.isActive = true;
		this.mask.removeClass('trans-hide').addClass('trans-show');
		videostop();
	},
	//邦定事件
	bindEvent:function(){
		var me = this;
		$('.team-box').on('click',function(e){
			var eventName = e.target.dataset.event;
			if(eventName ==='team-a'){
				return me.handleClickTeam('a');
			}
			if(eventName === 'team-b'){
				return me.handleClickTeam('b');
			}
		});
		this.mask.on('click',function(e){
			var eventName = e.target.dataset.event;
			if(eventName === 'submit'){
				return me.handleSubmit();
			}
			if(eventName === 'confirm'){
				return me.handleConfirm(e);
			}
			if(eventName === 'goods'){
				return me.handleClickIcon(e.target.dataset.icon);
			}
		});
	},
	//点击助威
	handleClickTeam:function(team){
		if(this.isActive){
			return;
		}
		this.team = team;
		this.showMask();
	},
	//初始化容器
	initChild:function(){
		var width = 80;
		var height = 80;
		var blank = 15;
		var goods = this.getListData();
		var count = goods.length;
		var wrap = this.mask.find('.goods-list');
		var ul = document.createElement('ul');
		ul.style.width = count * (width+blank*2) + 'px';
		for(var i=0;i<goods.length;i++){
			var li = document.createElement('li');
			var d = goods[i];
			li.style.width = width+'px';
			li.style.height = height + 'px';
			li.style.margin = blank + 'px';
			li.innerHTML = '<i data-event="goods" data-icon="'+d.id+'" class="'+d.icon+'"></i>';
			ul.appendChild(li);
		};
		wrap.append(ul);
		this.goods = goods;
	},
	//点击提交助威物品
	handleSubmit:function(){
		//$.ajax()
		console.log(this.cart.list)
		this.hideMask();
	},
	//点击助威物品
	handleClickIcon:function(id){
		//console.log(id);return;
		if(!this.attrBox){
			this.attrBox = this.mask.find('.attr-box');
		}
		this.goodsId=id;
		this.attrBox.show();
		this.picker.reset();
		this.renderAttribute(id);
	},
	//点击确认物品属性
	handleConfirm:function(e){
		//什么商品？什么品牌 ？ 数量 ？
		if(!this.checkBox){
			this.checkBox = this.mask.find('.check-box');
		}
		var banner = this.banner.getActiveBanner();
		var goods = this.currentGoods;
		//console.log(banner.id,this.banner.bannerId)
		this.cart.add({
			id:this.goodsId,
			bannerId:banner.id,
			buyed:this.picker.buyed,
			price:banner.price,
			icon:goods.listIcon
		});
		var total = this.cart.getTotal();
		this.checkBox.find('.count').text(total+'元');
		this.renderTotalBar();
		//console.log(this.cart.cart)
		this.attrBox.hide();
	},
	renderTotalBar:function(){
		var wrap = this.checkBox.find('.right');
		var data = this.cart.list;
		var frg = document.createDocumentFragment();
		wrap.html('');
		for(var i=0;i<data.length;i++){
			var d = data[i];
			var li = document.createElement('li');
			li.innerHTML = '<i class="'+d.icon+'"></i><i>x</i><i class="num">'+d.buyed+'</i>';
			frg.appendChild(li);
		}
		wrap.append(frg);
	},
	renderAttribute:function(id){
		//console.log(this.goods)
		var data = this.findGoodsById(id);
		if(data){
			this.attrBox.find('.goods-img').css({
				'background-image':'url('+data.img+')'
			});
			this.banner.render(data.banner);
			this.currentGoods = data;
		}
	},
	findGoodsById:function(id){
		var goods = this.goods;
		for(var i=0;i<goods.length;i++){
			if(goods[i].id === id){
				return goods[i];
			}
		}
		return false;
	},
	getListData:function(){
		return [
			{
				id:'icon1',
				icon:'icon-yd2',
				listIcon:'icon-yd',
				img:'../images/img-001.jpg',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon2',
				icon:'icon-shorts2',
				listIcon:'icon-shorts',
				img:'../images/img-002.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon3',
				icon:'icon-shirt2',
				listIcon:'icon-shirt',
				img:'../images/img-003.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon4',
				icon:'icon-bound2',
				listIcon:'icon-bound',
				img:'../images/img-004.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon5',
				icon:'icon-water2',
				listIcon:'icon-water',
				img:'../images/img-005.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon6',
				icon:'icon-pai2',
				listIcon:'icon-pai',
				img:'../images/img-006.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			},
			{
				id:'icon7',
				icon:'icon-money2',
				listIcon:'icon-money',
				img:'../images/img-007.png',
				banner:[{
					id:'banner16',
					price:150.00,
					active:'买6送一',
					logo:'../images/lining.png'
				},
				{
					id:'banner17',
					price:160.00,
					active:'买6送一',
					logo:'../images/victor.png'
				}]
			}
		]
	}
}

/**
 * 数字选择
 */
function NumberPicker(){
	var wrap = $('.number-picker');
	var elements = wrap.children();
	//var minusButton = elements.eq(0);
	//var plusButton = elements.eq(2);
	var inputBox = elements.eq(1).find('input');
	this.minNum = 1;
	this.maxNum = 99999;
	this.wrap = wrap;
	this.inputBox = inputBox;
 	this.buyed = 1; //购物数量
	this.numWrap = $('.fixed-number');
	this.numbers = [6,8,9,12,18];//可选的吉数
	this.activeIndex = 0;
	this.initChild();
	this.bindEvent();
}
/**
 * 数字选择相关操作
 */
NumberPicker.prototype = {
	initChild:function(){
		var numWrap = this.numWrap;
		var children = [];
		var numbers = this.numbers;
		var frg = document.createDocumentFragment();
		for(var i=0;i<numbers.length;i++){
			var li = document.createElement('li');
			li.innerText = numbers[i];
			children.push(li);
			frg.appendChild(li);
		}
		numWrap.append(frg);
		this.children = children;
		this.buyed = numbers[0];
		this.update();
	},
	reset:function(){
		var numbers = this.numbers;
		this.buyed = numbers[0];
		this.update();
	},
	bindEvent : function(){
		var me = this;
		this.numWrap.on('click',function(e){
			var num = $(e.target).text();
			me.buyed = parseInt(num);
			me.update();
		});
		this.wrap.on('click',function(e){
			var eName = e.target.className;
			switch(eName){
				case 'plus':
					me.plus();break;
				case 'minus':
					me.minus();break;
				default:
					//console.log(eName)
					break;
			}
		});
	},
	plus:function(){
		if(this.buyed < this.maxNum){
			this.buyed++;
			this.update();
		}
	},
	minus:function(){
		if(this.buyed > this.minNum){
			this.buyed--;
			this.update();
		}
	},
	update:function(){
		var buyed = this.buyed;
		this.inputBox.val(buyed);
		if(this.activeItem){
			this.activeItem.removeClass('on');
			this.activeItem = null;
		}
		var index = this.numbers.indexOf(buyed);
		if(index > -1){
			var activeItem = $(this.children[index]);
			this.activeItem = activeItem;
			activeItem.addClass('on');
		}
	}
}
/**
 * 品牌选择
 */

function BannerSelect(){
	var banner = $('#mask').find('.banner-box');
	this.bannerBox = banner;
	this.bindEvent();
}
BannerSelect.prototype = {
	render:function(data){
		if(!data||data.length<1){
			return;
		}
		this.bannerBox.html('');
		var frg = document.createDocumentFragment();
		var children = [];
		for(var i = 0;i<data.length;i++){
			var d = data[i];
			var ul = document.createElement('ul');
			ul.innerHTML = '<li class="logo"><img src="'+d.logo+'"></li><li>'+d.active+'</li><li><p>'+d.price+'元件</p></li>'
			ul.setAttribute('data-banner',d.id);
			ul.className = 'd-flex';
			children.push(ul);
			frg.appendChild(ul);
		}
		this.bannerData = data;
		this.children = children;
		this.bannerBox.append(frg);
		this.init();
	},
	init:function(){
		this.activeItem = $(this.children[0]);
		this.bannerId = this.bannerData[0].id;
		this.activeItem.addClass('on');
	},
	bindEvent:function(){
		var me = this;
		this.bannerBox.on('click',function(e){
			var target = me.findTarget(e.target);
			if(target){
				me.update(target);
			}
		});
	},
	update:function(clickItem){
		var bannerId = clickItem.dataset.banner;
		if(bannerId===this.bannerId){
			return;
		}
		this.activeItem.removeClass('on');
		this.activeItem = $(clickItem);
		this.activeItem.addClass('on');
		this.bannerId = bannerId;
	},
	findTarget:function(target){
		while(target !== this.bannerBox){
			if(target.dataset.banner){
				return target;
			}
			target = target.parentNode;
		}
		return false;
	},
	getActiveBanner:function(){
		var data = this.bannerData;
		for(var i=0;i<data.length;i++){
			if(data[i].id===this.bannerId){
				return data[i];
			}
		}
		return null;
	}
}
/**
 * 弹出对话框
 */
function Dialog(){
	var dialog = $('#dialog');
	this.dialog = dialog;
	this.bindEvent();
}

Dialog.prototype = {
	show:function(){
		this.dialog.show();
	},
	hide:function(){
		this.dialog.hide();
	},
	bindEvent:function(){
		var me = this;
		this.dialog.on('click',function(e){
			var team = e.target.dataset.team;
			if(team){
				me.callback(team);
			}
		});
	},
	callback:function(team){
		//回调接口
	}
}

/**
 * 购物车
 */
function Carts(){
	this.list = [];
}

Carts.prototype = {
	add:function(item){
		var index=this.check(item.id);
		if(index !==-1){
			this.list[index]=item;
		}else{
			this.list.push(item);
		}
	},
	check:function(id){
		var cart = this.list;
		for(var i=0;i<cart.length;i++){
			if(cart[i].id===id){
				return i;
			}
		}
		return -1;
	},
	getTotal:function(){
		var count = 0;
		var cart = this.list;
		for(var i=0;i<cart.length;i++){
			var d = cart[i];
			count += d.price * d.buyed;
		}
		return count;
	}
}

$(document).ready(function(){
	videoplay();
	var zan = iZan();
	var dailog = new Dialog();
	var tab = new TabSlide();
	tab.onClick=function(){
		dailog.show();
	}
	dailog.callback = function(team){
		console.log(team)
		zan.handleClickTeam(team);
		this.hide();
	}
	handleClickSwitch();
});


