(function(doc){
	//收集各章节的链接位置
 	var pos = [],
 		//收集菜单上的项目
 	    links = doc.getElementsByTagName('a'),
 		//收集章节的标题
 	    titles = doc.getElementsByTagName('h1'),
 		//悬浮菜单
 	    menu = doc.getElementById('menubar'),
 		//当前选择项
 	    currentItem=null;

 	//添加红色样式
 	var addClass = function (element){
	 		currentItem && currentItem.removeAttribute('class');
	 		element.setAttribute('class','red');
	 		currentItem = element;
 		},

 	    //网页被卷去的高:
		getScrollTop = function (){
	    	return Math.ceil(document.body.scrollTop)+1;
		},

 		//计算滚动位置
	    startScroll = function (){
			var scrollTop = getScrollTop(),
			    len = titles.length,
			    i = 0;

			//第一条
			if(scrollTop>=0 && scrollTop<pos[0]){
				addClass(links[0]);
				return;
			}
			//最后一条
			if(scrollTop>=pos[len-1]){
				addClass(links[len-1]);
				return;
			}
			//中间
			for(;i<len;i++){
				if(scrollTop > pos[i] && scrollTop < pos[i+1]){
					addClass(links[i]);
					break;
				}
			}
	};

 	//点击列表中的链接变色
 	menu.onclick=function(e){
 		var target = e.target || e.srcElement;
 		 
 		if(target.nodeName.toLowerCase() === 'a'){
 			//列表项状态指示
 			addClass(target);
 			return;
 		}

 		if(target.nodeName.toLowerCase() === 'p'){
 			if(target.className == 'static'){
 				//隐藏菜单
 				this.className = 'menu slideIn';
 				setTimeout(function(){
 					target.className = 'static toShow';
 					target.innerHTML = '显示';
 				},1000);
 			}else{
 				//显示菜单
 				target.className = 'static';
 				target.innerHTML = '隐藏';
 				this.className = 'menu slideOut';
 			}
 		}
 	}

	//计算各章节的初始位置
	var ln = titles.length;
	while(--ln>-1){
		//titles[len].offsetParent.offsetTop = 0;
		pos.unshift(titles[ln].offsetTop);
	}

	startScroll();

	//监听滚动
    window.onscroll = function(){
  		startScroll()
    }

})(document);