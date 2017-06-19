$(function(){

  $('.nav-tab li.list-nav').on('click', function(){
    var $this = $(this);
    if($this.hasClass('on')){
      return;
    }
    $this.addClass('on').siblings().removeClass('on');
    $('.tab-content').removeClass('active').eq($this.index()).addClass('active');
  });

  // 顶部类别
  $('.type-item').on('click', function(){
    var type = $(this).text();
    $.prompt('选择的类型为：'+type)
  });

  //
  $('.op-location').on('click', function(){
    console.log('定位操作...')
  });
  $('.op-search').on('click', function(){
    console.log('搜索操作...')
  });

});



