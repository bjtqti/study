$(function(){

  // 滚动消息
  $('.ol-scroll-text').marquee({duplicated: true});

  $('.nav-tab li').on('click', function(){
    var $this = $(this);
    if($this.hasClass('on')){
      return;
    }
    $this.addClass('on').siblings().removeClass('on');
    $('.tab-content').hide().eq($this.index()).show();
  });

  $('.reward-button').on('click', function(){
    window.location.href = 'reward.html';
  });

  $('.ol-status-share').on('click', function(){
    $.prompt('点击了分享...')
  });

  // 调试
  // $('.nav-tab li').eq(2).trigger('click');

});



