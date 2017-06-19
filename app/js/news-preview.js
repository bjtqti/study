$(function(){

  $('.nav-tab li').on('click', function(){
    var $this = $(this);
    if($this.hasClass('on')){
      return;
    }
    $this.addClass('on').siblings().removeClass('on');
    $('.tab-content').removeClass('active').eq($this.index()).addClass('active');
  });

  $('#slider').Swipe({
    auto: 3000,
    callback: function(index, elem) {
      $('.slide-dot li').removeClass('cur').eq(index).addClass('cur');
    }
  });

  // 调试
  // $('.nav-tab li').eq(2).trigger('click');

});



