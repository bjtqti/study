$(function(){
  // 顶部返回
  $('.header-back').on('click',function(){
    if(document.referrer ==''|| document.referrer.indexOf(window.location.host) == -1){
      window.location = '#home';
    }else{
      window.history.go(-1);
    }
  });

  $('.header-op').on('click', function(){
    $.prompt('点击了顶部右侧按钮')
  });

  // 页面链接点击跳转
  $(document).on('click.href', '[data-href]', function(){
    var href = $(this).data('href');
    if(href){
      window.location.href = href;
    }
  });

});