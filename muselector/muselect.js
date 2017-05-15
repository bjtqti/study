window.onload=function(){
	var muselect = new MuSelect('articleIds');
}

function MuSelect(id){
	this.init(id);
	this.isFolding = false;
	this.selectData = [];
	this.selectedIndex = 0;
}

MuSelect.prototype.init=function(id){
	var container = document.getElementById(id);
	var selects = container.getElementsByTagName('select');
	this.select1 = selects[0];
	this.select2 = selects[1];
	this.container = container;
	this.setSelectSize();
	this.bindEvent();
}

MuSelect.prototype.bindEvent=function(){
	var me = this;

	this.container.onclick = function(e){
		var target = e.target;
		var tagName = target.dataset.tag;
		if(!tagName){
			target = e.target.parentNode;
			tagName = target.dataset.tag;
		}
		switch(tagName){
			case 'input':
				me.toggleHandle();
				break;
			case 'all':
				me.handleSelectAll();
				break;
			case 'invert':
				me.handleSelectInvert();
				break;	
			case 'select':
				var index = target.selectedIndex;
				var option = target.options[index];
				me.handleClickOption(option,true);
				break;
			case 'selected':
				var index = target.selectedIndex;
				var option = target.options[index];
				me.handleClickOption(option,false);
				break;
			default:
				me.handleUnknowEvent(e);
				break;
		}
	}
}

MuSelect.prototype.setSelectSize=function(){
	var select1 = this.select1;
	var select2 = this.select2;
	var options = select1.options;
	var length = options.length;
	select1.style.display='none';
	select2.style.display='none';
	select1.size = length;
	select2.size = 0;
	this.total = length;
}

MuSelect.prototype.toggleHandle = function(){
	var status = this.isFolding;
	this.select1.style.display = status ? 'none':'block';
	this.select2.style.display = status ? 'none':'block';
	this.isFolding = !status;
}

MuSelect.prototype.handleSelectAll = function(){
	if(!this.isFolding){
		return false;
	}
	if(this.select1.size===0){
		return false;
	}
	var options1 = this.select1.innerHTML;
	var options2 = this.select2.innerHTML;
	this.select2.innerHTML =  options1 + options2;
	this.select1.innerHTML = '';
	this.select1.size = 0;
	this.select2.size = this.select2.options.length;
}

MuSelect.prototype.handleSelectInvert = function(){
	if(!this.isFolding){
		return false;
	}
	var options1 = this.select1.innerHTML;
	var options2 = this.select2.innerHTML;
	this.select2.innerHTML =  options1;
	this.select1.innerHTML = options2;
	this.select1.size = this.select1.options.length;
	this.select2.size = this.select2.options.length;
}

MuSelect.prototype.handleUnknowEvent = function(e){
	console.log(e)
	return false;
}

MuSelect.prototype.handleClickOption = function(option,isAdd){

	if(isAdd){
	 	this.select1.removeChild(option);
	 	this.select2.appendChild(option);
	}else{
	 	this.select2.removeChild(option);
	 	this.select1.appendChild(option);
	}
	this.select2.size = this.select2.options.length;
	this.select1.size = this.select1.options.length;
}

 

 
