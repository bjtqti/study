function TableSort(id){
 		this.tbl = document.getElementById(id);
 		if(this.tbl && this.tbl.nodeName == 'TABLE'){
 			this.makeSortable();
 			this.makeZebra();
 		}
 	}

 	//生成斑马纹
 	TableSort.prototype.makeZebra = function(){
 		var tBody = this.tbl.tBodies[0].rows;
 		for(var i = 0;tBody[i];i++){
 			if(i%2){
 				tBody[i].style.backgroundColor = '#EAF2D3';
 			}else{
 				tBody[i].style.backgroundColor = 'white';
 			}
 		}
 	}

 	TableSort.prototype.makeSortable = function(){
 		var headings = this.tbl.tHead.rows[0].cells;
 		for(var i = 0;headings[i];i++){
 			headings[i].cIdx = i;
 			var a = document.createElement('a');
 			a.href = "#";
 			a.innerHTML = headings[i].innerHTML;
 			a.onclick = function(that){
 				return function(e){
 					//若要兼容ie系列请用e.target||e.srcElement代替this;
 					that.sortCol(this);
 					return false;
 				}
 			}(this);
 			headings[i].innerHTML = "";
 			headings[i].appendChild(a);
 		}
 	}

 	TableSort.prototype.sortCol=function(el){
 		//获取html表格中将被排序的那列数据
 		var rows = this.tbl.rows;
 		var alpha = [],numeric = [];
 		var aIdx = 0,nIdx = 0;
 		var th = el.parentNode;
 		var cellIndex = th.cIdx;

 		for(var i=1;rows[i];i++){
 			var cell = rows[i].cells[cellIndex];
 			var content = cell.textContent ? cell.textContent : cell.innerText;
	 		//区分文本和数字
	 		var num = content.replace(/(\$|\,|\s)/g,'');
	 		if(parseFloat(num)==num){
	 			numeric[nIdx++] = {
	 				value : Number(num),
	 				row : rows[i]
	 			}
	 		}else{
	 			alpha[aIdx++] = {
	 				value : content,
	 				row : rows[i]
	 			}
	 		}
 		}

 		//排序
 		var col = [],top,bottom;
 		if(th.className.match("asc")){
 			top = bubbleSort(alpha,-1);
 			bottom = bubbleSort(numeric,-1);
 			th.className = "dsc";
 		}else{
 			top = bubbleSort(alpha,1);
 			bottom = bubbleSort(numeric,1);
 			th.className = 'asc';
 		}

 		col = top.concat(bottom);
 		var tBody = this.tbl.tBodies[0];
 		//非常好的交换元素的方法
 		for(var i= 0;col[i];i++){
 			tBody.appendChild(col[i].row);
 		}
  		this.makeZebra();
 	}

    //冒泡排序
 	function bubbleSort(arr,dir){
 		var start,end;
 		if(dir ===1){
 			start = 0;
 			end = arr.length;
 		}else if(dir === -1){
 			start = arr.length -1;
 			end = -1;
 		}
 	 
 		var unsorted = true;

 		while(unsorted){
 			unsorted = false;
 			for(var i= start;i!=end;i=i+dir){
 				if(arr[i+dir] && arr[i].value > arr[i+dir].value){
 					//a=1,b=2;a=[b,b=a][0];==>a=2,b=1;
 					arr[i] = [arr[i+dir],arr[i+dir]=arr[i]][0];
 					unsorted = true;
 				}
 			}
 		}
 		return arr;
 	}

 	//拖动列
 	function ColumnDrag(id){
 		this.tbl = document.getElementById(id);
 		if(this.tbl && this.tbl.nodeName == 'TABLE'){
 			this.state = null;
 			this.prevX = null;
 			//this.cols = this.tbl.getElementsByTagName('col');
 			this.makeDraggable();
 		}
 	}

 	ColumnDrag.prototype.makeDraggable = function(){
 		//为IE添加末尾文本节点
 		for(var i =0;this.tbl.rows[i];i++){
 			var td = document.createElement('td');
 			td.style.display = 'none';
 			this.tbl.rows[i].appendChild(td);
 		}

 		//将头连在一起
 		var headings = this.tbl.tHead.rows[0].cells;
 		for(var i=0;headings[i];i++){
 			//解决Safari2.0.4中cellIndex始终为0的问题
 			headings[i].cIdx = i;
 			var a = document.createElement('a');
 			a.href="#";
 			a.innerHTML = "&larr; "+headings[i].innerHTML + "&rarr;";
 			a.onclick = function(){
 				return false;
 			}
 			headings[i].className += " draggable";
 			headings[i].onmousedown = function(that){
 				return function(e){
 					that.mousedown(e);
 					return false;
 				}
 			}(this);
 			headings[i].onmousemove = function(that){
 				return function(e){
 					that.mousemove(e);
 					return false;
 				}
 			}(this);
 			headings[i].onmouseup = function(that){
 				return function(e){
 					that.mouseup(e);
 					return false;
 				}
 			}(this);
 			a.onkeyup = function(that){
 				return function(e){
 					that.keyup(e);
 					return false;
 				}
 			}(this);
 			//headings[i].onmouseover = addHover;
 			//headings[i].onmouseout = removeHover;
 			//插入导向箭头
 			headings[i].innerHTML = '';
 			headings[i].appendChild(a);
 		}

 	}

 	ColumnDrag.prototype.mousedown = function(e){
 		e = e ? e : window.event;
 		var elm = e.target ? e.target : e.srcElement;
 		elm = elm.nodeName == 'A' ? elm.parentNode : elm;
 		//设置状态并点击"from"元素
 		this.state = "drag";
 		//elm.className = "down";
 		//this.cols[elm.cIdx].className = "drag";
 		this.from = elm;
 		//operaRefresh();
 	}

 	ColumnDrag.prototype.mousemove = function(e){
 		e = e ? e : window.event;
 		var x = e.clientX ? e.clientX : e.pageX;
 		var elm = e.target ? e.target : e.srcElement;
 		if(this.state == "drag" && elm != this.from){
 			var from = this.from.cIdx;
 			var to = elm.cIdx;

 			//确保鼠标移动的方向和位置交换一致
 			if((from>to && x<this.prevX)||(from<to && x>this.prevX)){
 				// //高亮列
 				// this.cols[from].className = "";
 				// this.cols[to].className = "drag";
 				//如果方向为正，将to增加一
 				if(from < to) to++;
 				var rows =  this.tbl.rows;
 				for(var i = 0;rows[i];i++){
 					rows[i].insertBefore(rows[i].cells[from],rows[i].cells[to]);
 				}
 				//更新cIdx值
 				var headings = this.tbl.tHead.rows[0].cells;
 				for(var i=0;headings[i];i++){
 					headings[i].cIdx = i;
 				}
 			}

 			this.prevX = x;
 		}
 	}


 	ColumnDrag.prototype.mouseup = function(e){
 		//e = e ? e : window.event;
 		//var elm = e.target ? e.target : e.srcElement;
 		//elm = elm.nodeName == "A" ? elm.parentNode : elm;
 		this.state= null;
 		//var col = this.cols[elm.cIdx];
 		//col.className = "dropped";
 		//operaRefresh();
 	}

 	ColumnDrag.prototype.keyup = function(e){
 		e = e ? e : window.event;
 		var elm = e.target ? e.target : e.srcElement;
 		var a = elm;
 		elm = elm.parentNode;
 		var headings = this.tbl.tHead.rows[0].cells;
 		switch(e.keyCode){
 			case 37://left
 				this.mousedown({target:elm});
 				var prevCellIdx = elm.cIdx == 0 ? 0 : elm.cIdx -1;
 				this.prevX = 2;
 				this.mousemove({
 					target : headings[prevCellIdx],
 					clientX :1
 				});
 				this.mouseup({target:elm});
 				a.focus();
 				break;
 				case 39: //right
 					this.mousedown({target:elm});
 					//用-2 修正ie中影子TD的问题
 					var nextCellIdx = elm.cIdx == headings.length -2 ? headings.length -2 : elm.cIdx + 1;
 					this.prevX = 0;
 					this.mousemove({
 						target :headings[nextCellIdx],
 						clientX : 1
 					});
 					this.mouseup();
 					a.focus();
 					break;
 		}
 	}