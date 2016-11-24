
var mySwiper = new Swiper('.swiper-container',{
	autoplay : 5000,//可选选项，自动滑动
	loop : true,//可选选项，开启循环
	pagination : '.pagination'
});
 
var dom = document.querySelector('.back-to-top');
var go  = new GoTop(dom);
