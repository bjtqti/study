/**
 * 解析url
 */
function parseUrl(url){
	var arr = url.split('?'),
		host = arr[0],
		path = arr[1],
		result = {host:host};
	if(path){
		arr = path.split('&');
		for(var i =0,n=arr.length;i<n;i++){
			var tmp = arr[i].split('='),
				key = tmp[0],
				val = tmp[1];
			result[key] = val;
		}
	}
	return result;
}
/**
 * 解析url逆过程
 */
function reverserUrl(param) {
	var temp={},
		arr = [];
 	for(var i in param){
 		if(i==='host'||param[i]===null){
 			continue;
 		}
 		temp[i]=param[i];
 	}
	for(var i in temp){
		arr.push(i + '=' + temp[i]);
	}
	if(arr.length){
		return param.host+'?'+arr.join('&');
	}
	return host;
}


var filterData = {
	types : {
		storeIds:'门店',
		brandIds:'品牌',
		categoryIds:'类别'
	},
	storeIds:[],
	categoryIds:[],
	brandIds:[],
	subSelector:null,
	resetIds:function(){
		this.storeIds=[];
		this.categoryIds=[];
		this.brandIds = [];
	},
	getIdsData:function(){
		var param = parseUrl(location.href),
			storeIds=param.storeIds,
			categoryes=param.categoryIds,
			brandIds=param.brandIds;
		this.storeIds = storeIds?storeIds.split(','):[];
		this.categoryIds = categoryes ? categoryes.split(','):[];
		this.brandIds=brandIds?brandIds.split(','):[];
	},
	findSelectedName:function(dataList,id){
		var result = '';
		dataList.forEach(function(items){
			items.children.forEach(function(item){
				item.children.forEach(function(it){
					if(id===it.id){
						result=items.name+'-'+item.name;
						return;
					}
				})
			})
		});
		return result;
	},
	findSubCategory:function (category,id){
		var result = [];
		category.forEach(function(items,i){
			items.children.forEach(function(item,j){
				if(item.id===id){
					result = item.children;
					return;
				}
				item.children.forEach(function(it){
					if(it.id===id){
						result = item.children;
						return;
					}
				});
			})
		});
		return result;
	},
	getSiderData:function (){
		var	that = this,
		    sideMenu = $('#side-bar'),
			selectorNode = $('#selector-type'),
			subSideMenu=$('#sub-side-bar');
		this.selectorNode = selectorNode;
		$.ajax({
			url:baseRoot+'/category/findScreenData.html',
			dataType : "json",
			success:function(result){
				//console.log(result)
				var	cate = '',
				    data = result.object,
				    store = that.createNodeHTML(data.storeList,'storeIds',that.storeIds),
					subCate = that.createSubNodeHtml(data.categoryList,that.categoryIds),
				    brand = that.createNodeHTML(data.brandList,'brandIds',that.brandIds);
				if(that.categoryIds.length){
					var id = that.categoryIds[0],
					    _data = that.findSubCategory(data.categoryList,id),
					    selectedName = that.findSelectedName(data.categoryList,id);
					selectorNode.html(selectedName);
					cate = that.createNodeHTML(_data,'categoryIds',that.categoryIds);
				}
				sideMenu.html(store+brand+cate);
				subSideMenu.html(subCate);
				that.category = data.categoryList;
			}
		});
	},
	handleSubCategory:function(){
		var that = this,
			sideBar = $('#side-bar');
			selectorNode = this.selectorNode;
		$('#sub-menu-slider').on('click',function(e){
			var target = e.target;
			if(target.className==='tit'){
				var p = $(target.parentNode);
				if(p.hasClass('topCls')){
					p.removeClass("topCls");
				}else{
					p.addClass('topCls');
				}
			}
			//点选子分类
			if(target.getAttribute('data-code')){
				//console.log(target.getAttribute('data-code'))
				var data = target.getAttribute('data-code').split(','),
				    subdata = that.findSubCategory(that.category,data[0]),
				    cate = that.createNodeHTML(subdata,'categoryIds');
				if(that.subSelector){
					that.subSelector.removeClass('act');
					sideBar.children().last().remove();
					sideBar.append($(cate));
				}else{
					sideBar.append($(cate));
				}
				that.categoryIds = [];
				that.subSelector = $(target);
				that.subSelector.siblings().removeClass('act').end().addClass('act');
				$(this).removeClass("rollIn-slideLeft");
				selectorNode.html(data[1]);
			}
		});
	},
	handleCategory:function(){
		var that = this,
			selectorNode=this.selectorNode,
			subMenuSlider = $('#sub-menu-slider');
		$('#menu-slider').on('click',function(e){
			var target = e.target;
			//折叠
			if(target.className==='tit'){
				var parent = $(target.parentNode);
				if(parent.hasClass("menuCls")){
					parent.removeClass("menuCls");
				}else{
					parent.addClass("menuCls");
				}
				return;
			}
			//取消
			if(target.className==='cancel-btn'){
				that.handleClose();
				return;
			}
			//确定
			if(target.className==='menu-sure'){
				var param = parseUrl(location.href);
				if(that.categoryIds.length){
					param.categoryIds = that.categoryIds.join(',')
				}else{
					delete param.categoryIds;
				}
				if(that.storeIds.length){
					param.storeIds = that.storeIds.join(',');
				}else{
					delete param.storeIds;
				}
				if(that.brandIds.length){
					param.brandIds = that.brandIds.join(',');
				}else{
					delete param.brandIds;
				}
				that.handleClose();
				location.href=reverserUrl(param);
				return;
			}
			//清除
			if(target.className==='clear-btn'){
				selectorNode.html('全部分类');
				if(that.subSelector){
					that.subSelector.removeClass('act');
				}
				that.resetIds();
				$('#side-bar').children().each(function(){
					$(this.children[1]).children().removeClass('act').eq(0).addClass('act');
				});
				return;
			}
			//全部分类
			if(target.className==='kind'||target.parentNode.className==='kind'){
				subMenuSlider.addClass("rollIn-slideLeft");
				return;
			}
			//点选门店，品牌, 类别
			if(target.getAttribute('data-code')){
				var p = $(target),
					code = target.getAttribute('data-code').split(','),
					id=code[0],
	 				name=code[1];
	 			if(id==='all'){
	 				p.addClass('act').siblings().removeClass('act');
	 				that[name] = [];
	 			}else{
	 				p.siblings().eq(0).removeClass('act');
					if(p.hasClass('act')){
						p.removeClass('act');
						var index = that[name].indexOf(id);
						if(index!== -1){
							that[name].splice(index,1);
						}
					}else{
						p.addClass('act');
						that[name].push(id);
					}
	 			}
			}
		});
	},
	handleClose:function(){
		$('#menu-slider').removeClass("rollIn-slideLeft");
		$('#sub-menu-slider').removeClass("rollIn-slideLeft");
		$('#main').removeClass("rollOut-slideLeft");
	},
	/**
	 * 创建分类内容
	 */
	createSubNodeHtml:function (data,selected){
		if(!data.length) return '';
		selected = selected ||[];
		var html = '',
			className='';
		data.forEach(function(items,i){
			html += '<div class="list-fold-box topCls">'+
			'<span class="tit">'+items.name+'<i></i></span>';
			if(items.children.length){
				html += '<div>';
				items.children.forEach(function(item){
					className = '';
					item.children.forEach(function(it){
						if(selected.indexOf(it.id) != -1){
							className = ' class="act"';
							return;
						}
					});
					html += '<span data-code="'+item.id+','+items.name+'-'+item.name+'"'+className+'>'+item.name+'<em></em></span>';
				});
				html += '</div>';
			}
			html += '</div>';
		});
		return html;
	},
	/**
	 * 创建菜单内容
	 */
	createNodeHTML:function (data,name,selected){
		if(!data.length){
			return '';
		}
		selected = selected || [];
		var head = [],
			end = [],
			types = filterData.types,
		    className = selected.length ? '': 'class="act"',
		    html = '<div class="list-fold-box">'+
		'<span class="tit">'+types[name]+'<i class="down-icon"></i></span>'+
		'<div><span data-code="all,'+name+'" '+className+'>全部</span>';
	 
		data.forEach(function(item,i){
			if(selected.indexOf(item.id)!== -1){
				head.push(item);
			}else{
				end.push(item);
			}
		});
		var sortData = head.concat(end);
		sortData.forEach(function(item,i){
			className = selected.indexOf(item.id) != -1?'class="act"':'';
			html +='<span data-code="'+item.id+','+name+'" '+className+'>'+item.name+'</span>'
		});
		html += '</div></div>';
		return html;
	},
	/**
	 * 筛选排序
	 */
	searchOrder:function (){
		var param = parseUrl(location.href),
		    sortPrice = param.sortPrice,
		    menu = $("#menu-slider"),
		    main = $('#main'),
		    items = $(".search_order > a");
		if(sortPrice){
			if(sortPrice==='desc'){
				items.removeClass("active").eq(1).addClass("active");
			}else{
				items.removeClass("active").eq(1).addClass("jiageDouble");
			}
		}
		items.on('click', function(){
			var _this = $(this),
				url = location.href;
			switch(_this.index()){
				case 0:
					items.removeClass("active jiageDouble");
					_this.addClass("active");
					delete param.sortPrice;
					param.sortAuditTime = 'desc';
					location.href=reverserUrl(param);
					break;
				case 1:
					delete param.sortAuditTime;
					if(_this.hasClass("jiageDouble")){
						_this.addClass("active");
						items.removeClass("jiageDouble");
						param.sortPrice = 'desc';
						location.href=reverserUrl(param);
					}else{
						_this.addClass("jiageDouble");
						items.removeClass("active");
						param.sortPrice = 'asc';
						location.href=reverserUrl(param);
					}
					break;
				case 2:
					items.removeClass("active jiageDouble");
					_this.addClass("active");
					menu.addClass("rollIn-slideLeft");
					main.addClass("rollOut-slideLeft");
					break;
				default:
					break;
			}
		});
	}
};

function Pages(totalCount,pageSize){
	this.pageIndex=1;
	this.pageSize=pageSize;
	this.totalPages = totalCount / this.pageSize;
	this.bindEvent();
}

Pages.prototype.handleScroll = function(e){
	var it = this,
		target = $(e.target),
		scrollTop = target.scrollTop(),
        windowHeight = target.height(),
        scrollHeight = target[0].scrollHeight-20;
	if(scrollTop + windowHeight >= scrollHeight){
		it.getPageData(it.pageIndex+1);
		//console.log(scrollTop,windowHeight,scrollHeight)
	}
}

Pages.prototype.bindEvent=function(){
	var that = this;
	$('#page-node').on('scroll',function(e){
		that.handleScroll(e);
	});
}

Pages.prototype.getPageData=function(pageIndex){
	var it = this;
	if(this.lock) return;
	if(this.pageIndex > this.totalPages) return;
	this.lock = true;
	$.ajax({
		url:baseRoot+'/product/findProductListByPage.html',
		dataType : "json",
		data:{pageIndex:pageIndex,pageSize:it.pageSize},
		success:function(result){
			it.lock = false;
			it.pageIndex=pageIndex;
			if(result&&result.returnCode===0){
				it.appendDataToPage(result.object.result);
			}
		}

	})
}

Pages.prototype.createPageHtml=function(data){
	if(!data||!data.code) return '';
	var temp = '<a href="'+baseRoot+'/sp-'+data.code+'.html">'+
                '<div>'+
                    '<div class="pic">'+
                        '<img class="lazy" data-original="'+baseRoot+'/resources/images/pic-goods.jpg" />'+
                        '<span class="store">'+(data.counter?data.counter.storeName:"")+'</span>'+
                    '</div>'+
                    '<div class="detail">'+
                        '<span>'+data.title+'</span>'+
                        '<em>¥'+data.salesPrice+'</em>'+
                    '</div>'+
                '</div>'+
            '</a>';
    return temp;
}

Pages.prototype.appendDataToPage=function(data){
	if(!data||!data.length){
		return false;
	}
	var text = '';
	for(var i=0,n=data.length;i<n;i++){
		text += this.createPageHtml(data[i]);
	}
	$('#page-node').append($(text));
}

function listHeight(){
	var winH = $(window).height();
	var footH = $("footer").height();
	var headH = $(".search_order").height();
	var marginH = parseInt($(".goods-list").css("margin-top"))*2;
	$(".goods-list").css({"height":winH - headH - footH - marginH});
	$(".menu-list").css({"height":winH - headH - footH});
	$(".second-slider .list-fold").css({"height":winH - headH});
	
}

function lazyLoad(){
	$("img.lazy").lazyload({
		placeholder : "../images/load.gif",
		effect: "fadeIn"
	});
}

// JavaScript Document

$(document).ready(function(){
	filterData.getIdsData();
	filterData.getSiderData();
	filterData.searchOrder();
	filterData.handleCategory();
	filterData.handleSubCategory();
	new Pages(totalCount,pageSize);
	listHeight();
	lazyLoad();
	lineSet(".empty a,.search_order a span,footer,.search_order,.menu-head,.nav-btn,.list-fold-box > div span,.second-head,.second-slider .list-fold-box,.second-slider .list-fold-box > div span");
});

 

 
