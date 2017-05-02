$(function(){
  
  // 轮播图
  $('#slider').Swipe({
    auto: 4000,
    callback: function(index, elem) {
      $('.slide-dot li').removeClass('cur').eq(index).addClass('cur');
    }
  });

});



