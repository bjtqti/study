function Selector(id,str){
			this.id = id;
			this.str = str;
			this.selected=[];
			this.data={};
			this.init();
		}
		Selector.prototype = {
			init:function(){
				this.initData();
				this.initElements();
				this.initActive();
				if(this.elements.length>1){
					this.filterDisable(1);
				}
				this.bindEvent();
			},
			initData:function(){
				var data = JSON.parse(this.str);
				var _data = {};
				for(var k in data){
					var tmp = data[k].split(',');
					var arr = [];
					tmp.forEach(function(v){
						arr.push(v.split('##')[1]);
					});
					_data[k] = arr;
				}
				this.data=_data;
			},
			initElements:function(){
				var elements=[];
				var items= document.querySelectorAll('.selector');
				for(var i=0;i<items.length;i++){
					var item = items[i].querySelectorAll('a');
					var arr = [];
					for(var j=0;j<item.length;j++){
						var node = item[j];
						node.aix=[i,j];
						arr.push({el:node,val:node.innerText});
					}
					elements.push(arr);
				}
				this.elements = elements;
			},
			bindEvent:function(){
				var it = this;
				document.querySelector('.container').onclick=function(e){
					if(e.target.aix){
						//console.log(e.target.innerText)
						it.handleClick(e.target)
					}	
				}
			},
			initActive:function(){
				var attr = this.data[this.id];
				var it = this;
				this.elements.forEach(function(items,i){
					items.forEach(function(item,j){
						if(item.val===attr[i]){
							it.setActive(item,true);
							it.selected.push(item);
						}
					});
				});
			},
			filterDisable:function(x){
				if(!this.elements[x]){
					return;
				}
				var item = this.selected[0];
				var data = this.data;
				var enabled = [];
				for(var k in data){
					if(data[k][0]===item.val){
						enabled.push(data[k][1]);
					}
				}
				this.elements[x].forEach(function(item){
					if(enabled.indexOf(item.val)===-1){
						item.el.className='dis';
						item.isDisable = true;
					}
				});
			},
			handleClick:function(target){
				//console.log(target.getAttribute('data-pos'))
				var aix=target.aix;
				var x=aix[0],y=aix[1];
				var item = this.elements[x][y];
				if(item.isActive||item.isDisable){
					return false;
				}
				if(this.selected[x].isActive){
					this.setActive(this.selected[x],false);
				}
				this.setActive(item,true);
				this.selected[x]=item;
				x++;
				if(this.elements[x]){
					this.clear(x);
					this.filterDisable(x);
					this.setDefaultActive(x);
				}
				console.log(this.getId())
			},
			getId:function(){
				var arr = [];
				var data = this.data;
				this.selected.forEach(function(item){
					arr.push(item.val);
				});
				for(var k in data){
					var values = data[k];
					if(values.join()===arr.join()){
						return k;
					}
				}
				return false;
			},
			setActive:function(item,status){
				item.el.className=status?'active':'';
				item.isActive=status;
			},
			setDefaultActive:function(x){
				var items=this.elements[x];
				if(!items){
					return;
				}
				for(var i=0;i<items.length;i++){
					var item = items[i];
					if(!item.isDisable){
						this.setActive(item,true);
						this.selected[x]=item;
						break;
					}
				}
			},
			clear:function(x){
				if(!this.elements[x]){
					return;
				}
				this.elements[x].forEach(function(item){
					item.el.className='';
					item.isDisable = false;
					item.isActive=false;
				});
			}
		}