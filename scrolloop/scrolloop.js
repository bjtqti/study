/**
 * 获取高度
 */
function getHeight(node) {
	var div = node.getBoundingClientRect();
	if (div.height) {
		return div.height;
	} else {
		return div.bottom - div.top;
	}
}
/**
 * 竖直方向轮回滚动函数
 * @param {string} id 行框包裹元素id
 * @param {int} second 滚动间隔；秒；
 */
function loopScrollTop(id, second) {
	var wrap = document.getElementById(id);
	var node = $(wrap.children[0]);
	var stack = [];
	var height = getHeight(wrap);
	var time = (second || 1) * 1000; // 滚动间隔；
	var item = node.children().last().clone();
	node.prepend(item);
	var itemLength =node.children().length;
	for(var i =0;i<itemLength;i++){
		stack.push(i);
	}
	node.css('top',-height+'px');
	stack.shift();
	function next(){
		var index = stack.shift();
		var distance = -(index * height)+'px';
		stack.push(index);
		node.animate({
			top:distance
		})
		setTimeout(function() {
			if(index===itemLength-1){
				node.css('top','0px');
			} 
			next();
		}, time);
	}
	next();
}