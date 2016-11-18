/**
 * 优惠券切换
 * @param tabId 选项卡id
 * @param pageId 切换的页面id
 * @param total 总数
 * @param pageSize 一页的数据条数
 * 0未使用(包含已生效、未生效)
 * 3已失效(已失效，包括已使用和已过期)
 * @author <278500368@qq.com>
 */

function CouponTab(tabId,pageId,total,pageSize){
	var container = document.getElementById(tabId),
	    view = document.getElementById(pageId),
	   	pageSize = parseInt(pageSize),
	   	totalPage = Math.ceil(total/pageSize),
	    tabs = container.children,
	    flag = 'data-index';
	
	for(var i = 0,n=tabs.length;i<n;i++){
		tabs[i].setAttribute(flag,i);
	}
	this.container = container;
	this.view = view.children;
	this.tabs = tabs;
	this.flag = flag;
	this.activeIndex = 0;
	this.prevIndex=null;
	this.pageInfo = [
		{pageIndex:1,totalPage:totalPage,status:0,pageSize:pageSize},
		{pageIndex:0,totalPage:1,status:3,pageSize:pageSize}
	];
	this.bindEvent();
}

/**
 * 邦定事件
 */

CouponTab.prototype.bindEvent=function(){
	this.container.addEventListener('click',this,false);
	this.view[0].addEventListener('scroll',this.handleScroll.bind(this),false);
	this.view[1].addEventListener('scroll',this.handleScroll.bind(this),false);
}

/**
 * 选项卡切换事件
 */
CouponTab.prototype.handleEvent=function(e){
	var target = this.filterTarget(e.target),
		activeTab = this.tabs[this.activeIndex];
	if(!target || target === activeTab){
		return false;
	}
	var index = target.getAttribute(this.flag);
	activeTab.className='';
	target.className='current';
	this.prevIndex = this.activeIndex;
	this.activeIndex = parseInt(index);
	this.handleChange();
}
/**
 * 页面滑动事件
 */
CouponTab.prototype.handleScroll=function(e){
	var target = $(e.target),
		scrollTop = target.scrollTop(),
        windowHeight = target.height(),
　　    scrollHeight = target[0].scrollHeight-20;
　　if(scrollTop + windowHeight >= scrollHeight){
　　　　this.getCoupons();
　　}
	//console.log(scrollTop,windowHeight,scrollHeight)
}

/**
 * 过滤目标节点
 */
CouponTab.prototype.filterTarget=function(target){
	var parent = this.container,
		flag = this.flag;
	while(target !== parent){
		if(target.hasAttribute(flag)){
			return target;
		}
		target = target.parentNode;
	}
	return false;
}

/**
 * 切换优惠券类型
 */
CouponTab.prototype.handleChange=function(){
	var it = this;
	if(this.isAnimating){
		return false;
	}
	switch(this.activeIndex){
		case 0://未使用
			this.showValide();
			break;
		case 1://已失效
			this.showInValide();
			break;
		default:
			break;
	}
}

/**
 * 切换到未使用券
 */
CouponTab.prototype.showValide=function(){
	var it=this,
		activePage = $(this.view[this.activeIndex]),
		prevPage = $(this.view[this.prevIndex]),
		toRight='pt-page-moveFromRight',
		toLeft='pt-page-moveToLeft';
	this.isAnimating = true;
	prevPage.addClass(toLeft);
	activePage.removeClass('hide').addClass(toRight);
	setTimeout(function(){
		it.isAnimating = false;
		prevPage.removeClass('page-current '+toLeft).addClass('hide');
		activePage.addClass('page-current').removeClass(toRight);
		setTimeSet();
	},600);
}

/**
 * 切换到失效券
 */
CouponTab.prototype.showInValide=function(){
	if(this.pageInfo[this.activeIndex].pageIndex<1){
		this.getCoupons();
	}
	var it=this,
		activePage = $(this.view[this.activeIndex]),
		prevPage = $(this.view[this.prevIndex]),
		toLeft='pt-page-moveFromLeft',
		toRight='pt-page-moveToRight';
	this.isAnimating = true;
	prevPage.addClass(toRight);
	activePage.removeClass('hide').addClass(toLeft);
	setTimeout(function(){
		it.isAnimating = false;
		prevPage.removeClass('page-current '+toRight).addClass('hide');
		activePage.addClass('page-current').removeClass(toLeft);
		setTimeSet();
	},600);
}

/**
 * 获取优惠券
 */
CouponTab.prototype.getCoupons=function(){
	var //loading = $('#load-box'),
	    activeIndex = this.activeIndex,
	    pageInfo = this.pageInfo[activeIndex],
	    pageSize = pageInfo.pageSize,
	    it = this;
	if(this.locked) {
		return;
	}
	if(pageInfo.pageIndex >= pageInfo.totalPage){
		return false;
	}
	pageInfo.pageIndex++;
	//loading.show();
	this.locked=true;
	$.ajax({
		url:baseRoot+'/coupon/findByPage.h',
		type:'post',
		dataType : "json",
		data:{
			status:pageInfo.status,
			currentPage:pageInfo.pageIndex,
			pageSize:pageSize
		},
		success:function(res){
			//console.log(res);
			it.locked = false;
			if(!res){
				return;
			}
			if(pageInfo.pageIndex===1){
				pageInfo.totalPage = Math.ceil(res.totalCount/pageSize);
			}
			//loading.hide();
			if(res.result.length>0){
				it.createCouponHtml(res.result);
			}else{
				pageInfo.pageIndex===1 && it.showEmpty();
			}
		}
	});
}

/**
 * 没有优惠券
 */
CouponTab.prototype.showEmpty=function(){
	var view = this.view[this.activeIndex];
	view.children[0].className = 'empty';
}

/**
 * 格式化日期
 */
CouponTab.prototype.formatDate=function(dateTime,sep){
	//2016-08-10 10:24:17 to 2016.08.10
	// var d = new Date(dateTime),
	//     arr = [d.getFullYear(),d.getMonth()+1,d.getDate()];
	sep = sep || '.';
	// for(var i = 0;i<3;i++){
	// 	arr[i] = arr[i] < 10 ? '0'+ arr[i]:arr[i]
	// }
	return dateTime.split(/\s+/)[0].replace(/\-/g,sep);
}

/**
 * 拼接优惠券模版
 */
CouponTab.prototype.createCouponHtml=function(data){
	function statusIcon(status){
		if(status === 1) return '<div class="beUsed"></div>';
		if(status === 2) return '<div class="expired"></div>';
		return '';
	}
	function createHtml(d){
		var node = document.createElement('div');
		node.className = 'coupon';
		node.innerHTML = '<div class="left">'+
	 			'<div class="price"><em>¥</em>'+d.money+'</div>'+
	        	'<div class="term">满'+d.ruleObject.songAccount+'使用</div>'+        
	        '</div>'+
	        '<div class="right">'+            
	        	'<div class="kind">微商城www.tepin.com</div>'+          
	        	'<div class="date">'+format(d.issueDate)+'-'+format(d.validityDate)+'</div>'+        
	        	'<div class="explain">'+d.ruleObject.description+'</div>'+        
	            statusIcon(d.status)+           
	        '</div>';
		return node;
	}
	var oFragment = document.createDocumentFragment(),
		format = this.formatDate;
	for(var i=0,n=data.length;i<n;i++){
		oFragment.appendChild(createHtml(data[i]));
	}
 	this.view[this.activeIndex].appendChild(oFragment);       
}

function setTimeSet(){
	var windowH = $(window).height(),
		toTop = $(".toTop");
	if($(".page-current").scrollTop() < (windowH/3) ){
		toTop.hide();
	}else{
		toTop.show();
	}
}

// @author <278500368@qq.com>
function parseUrl(query){
	var param = location.search;
	if(param !== ''){
		var arr = param.split('&');
		for(var i =0,n=arr.length;i<n;i++){
			var tmp = arr[i].split('=');
			if(tmp[0]===query){
				return tmp[1];
			}
		}
	}
	return false;
}

// JavaScript Document

$(document).ready(function(){
	lineSet(".polyTabs,.polyTabs ul li i");
	var pageSize = parseUrl('pageSize')||10,
	    winH = $(window).height(),
	    headH = $(".polyTabs").height()+1;
	$(".poly").css({"height":winH - headH});
	var tab = new CouponTab('tabs-wrap','page-content',totalCount,pageSize);
});
