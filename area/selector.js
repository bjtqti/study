// import data from 'region.js'
/**
 * 省市区三级联动
 * @param {element} container 容器
 * @param {Object} config 配置信息
 * @author <278500368@qq.com> 蛙哥
 */

"use strict";

function Selector(container, config) {
	this.container = container;
	this.data = config.data||[];
	this.selected = {
		province: {
			id: config.pid,
			val:''
		},
		city: {
			id: config.cid,
			val:''
		},
		area: {
			id: config.aid,
			val:''
		}
	};
	this.init();
}

/**
 * 初始化
 */
Selector.prototype.init = function() {
	this._createSelect('province');
	this._createSelect('city');
	this._createSelect('area');
	this.createProvince();
	this.createCity();
	this.createArea();
	this.container.addEventListener('change', this, false);
}

/**
 * 创建包裹容器
 */
Selector.prototype._createSelect = function(type) {
	if (this.selected[type].node) {
		return this.selected[type].node;
	}
	var select = document.createElement('select');
	select['data-type']=type;
	this.container.appendChild(select);
	this.selected[type].node = select;
	return select;
}


/**
 * 邦定事件
 */
Selector.prototype.handleEvent = function(e) {
	var index = parseInt(e.target.selectedIndex);
	var type = e.target['data-type'];
	switch(type){
		case 'province':
			this.changePrivince(index);
			break;
		case 'city':
			this.changeCity(index);
			break;
		case 'area':
			this.changeArea(index);
			break;
		default:
			break;
	}
}

/**
 * 切换省
 */
Selector.prototype.changePrivince = function(index){
	var province = this.data[index];
	var city = province.children;
	var defaultCity = city[0];
	var area = defaultCity.children;
	var defaultArea = area?area[0]:{};
	this.selected.province.id = province.id;
	this.selected.province.val = province.value;
	this.selected.city.data = city;
	this.selected.city.id = defaultCity.id;
	this.createCity();
	this.selected.area.data = area;
	this.selected.area.id = defaultArea.id;
	this.createArea();
}

/**
 * 切换市
 */
Selector.prototype.changeCity = function(index){
	var currentCity = this.selected.city.data[index];
	var area = currentCity.children;
	this.selected.city.id = currentCity.id;
	this.selected.city.val = currentCity.value;
	if(area&&area.length){
		this.selected.area.data = area;
		this.selected.area.id = area[0].id;
		this.selected.area.val = area[0].value;
		this.createArea();
	}
}

/**
 *切换区
 */
Selector.prototype.changeArea = function(index){
 	var area = this.selected.area.data;
 	var currentArea;
 	if(area){
 		currentArea = area[index];
 		this.selected.area.id = currentArea.id;
 		this.selected.area.val = currentArea.value;
 		console.log(currentArea)
 	}
}

/**
 * 创建省
 */
Selector.prototype.createProvince = function() {
	var select = this.selected.province.node;
	var pid = this.selected.province.id;
	var province = this.data;
	if(!pid){
		this.selected.province.id = province[0].id;
		this.selected.province.val = province[0].value;
	}else{
		for(var i=0;i<province.length;i++){
			if(province[i].id===pid){
				this.selected.province.val = province[i].value;
				break;
			}
		}
	}
	var options = this.createOption(this.data,pid);
	select.appendChild(options);
}

/**
 * 创建市
 */
Selector.prototype.createCity = function() {
	var select = this.selected.city.node;
	var city = this.selected.city.data;
	var cid = this.selected.city.id;
	if(!city){
		var pid = this.selected.province.id;
		var province = this.data;
		for(var i=0,len=province.length;i<len;i++){
			if(province[i].id===pid){
				city = province[i].children;
				this.selected.city.data = city;
				break;
			}
		}
	}
	if(!cid){
		cid = city[0].id;
		this.selected.city.id=cid;
		this.selected.city.val = city[0].value;
	}else{
		for(var i=0;i<city.length;i++){
			if(city[i].id===cid){
				this.selected.city.val = city[i].value;
				break;
			}
		}
	}

	select.innerHTML=null;
	var options = this.createOption(city,cid);
	select.appendChild(options);
}

/**
 * 创建区
 */
Selector.prototype.createArea = function() {
	var select = this.selected.area.node;
	var area = this.selected.area.data;
	var aid = this.selected.area.id;
	select.style.visibility = 'hidden';
	select.innerHTML=null;
	if(!area){
		var city = this.selected.city.data;
		var cid = this.selected.city.id;
		for(var i=0;i<city.length;i++){
			if(city[i].id===cid){
				area = city[i].children;
				this.selected.area.data = area;
				break;
			}
		}
	}
	if(area){
		var options = this.createOption(area,aid);
		select.appendChild(options);
		if(!aid){
			aid = area[0].id;
			this.selected.area.id = aid;
			this.selected.area.val = area[0].value;
		}else{
			for(var i=0;i<area.length;i++){
				if(area[i].id===aid){
					this.selected.area.val = area[i].value;
					break;
				}
			}
		}
		select.style.visibility = 'visible'
	}else{
		this.selected.area.val='';
		this.selected.area.id='';
	}
}

/**
 * 创建选项
 */
Selector.prototype.createOption = function(data,id) {
	var options = document.createDocumentFragment();
	var option = document.createElement('option');
	if(data && data.length){
		for (var i = 0,len= data.length;i < len; i++) {
			option.text = data[i].value;
			option.value = data[i].id;
			if (data[i].id===id) {
				option.selected = true;
			}
			options.appendChild(option);
			option = document.createElement('option');
		}
	}
	return options;
}

/**
 * 获取选择的地址
 */
Selector.prototype.getAddress=function(){
	var province = this.selected.province;
	var city = this.selected.city;
	var area = this.selected.area;
	return {
		province:[province.id,province.val],
		city:[city.id,city.val],
		area:[area.id,area.val]
	};
}
 