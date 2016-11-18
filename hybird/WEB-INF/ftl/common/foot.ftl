<footer id="footer">
  	<a href="${SERVER_WAP_INDEX}"><i></i>首页</a>
    <a href="${SERVER_WAP_SHOP}/store/storetList.h"><i></i>分类</a>
    <a href="${SERVER_WAP_SHOP}/cart/cartList.h"><i></i>购物车</a>
    <a href="${SERVER_WAP_SHOP}/membercenter.h"><i></i>我的</a>
</footer>
<script>
var $footer = $('#footer').children();
!function(){
	var url=window.location.href.split('/'),
		name = url.pop();
	if(name.indexOf('?') != -1){
		name = name.split('?')[0];
	} 
	switch(name){
		case 'storetList.h':
		case 'findProductList.h':
			$footer.eq(1).attr({'class':'hover'});
			break;
		case 'cartList.h':
			$footer.eq(2).attr({'class':'hover'});
			break;
		case 'membercenter.h':
			$footer.eq(3).attr({'class':'hover'});
			break;
		default:
			console.log(name)
			break;
	}
}();
</script>