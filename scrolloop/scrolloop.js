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
	var node = wrap.children[0];
	var stack = [];
	var height = getHeight(wrap); //==$(wrap).height();
	var time = (second || 1) * 1000; // 滚动间隔；
	for(var i =0,n=node.children.length;i<n;i++){
		stack.push(i);
	}
	function next(){
		var index = stack.shift();
		var distance = index * height;
		node.style.transform = 'translate3d(0, -' + distance + 'px, 0)';
		stack.push(index);
		if(index>0){
			node.style['-webkit-transition-duration']='800ms';
			node.style['transition-duration']='800ms';
		}else{
			node.style['-webkit-transition-duration']='0ms';
			node.style['transition-duration']='0ms';
		}
		setTimeout(function() {
			next();
		}, time);
	}
	next();
}