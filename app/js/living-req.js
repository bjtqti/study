$(function(){

  $('.nav-tab li').on('click', function(){
    var $this = $(this);
    if($this.hasClass('on')){
      return;
    }
    $this.addClass('on').siblings().removeClass('on');
    $('.tab-content').removeClass('active').eq($this.index()).addClass('active');
  });

  // 编辑
  $('.living-req').on('click', '.req-edit', function(){
    $.prompt('编辑操作...');
  });
  
  // 删除
  $('.living-req').on('click', '.req-delete', function(){
    $('#delete-confirm').fadeIn(1000);
  });

  // 支付
  $('.living-req').on('click', '.req-pay', function(){
    $.prompt('支付操作...');
  });

  // 取消删除
  $('.confirm-no').on('click', function(){
    $('#delete-confirm').fadeOut();
  });

  // 确认删除
  $('.confirm-yes').on('click', function(){
    $.prompt('删除操作...');
    $('#delete-confirm').hide(500);
  });

  // 调试
  // $('.nav-tab li').eq(2).trigger('click');

});



