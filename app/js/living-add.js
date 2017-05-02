$(function(){
  
  // $.datetimepicker.setLocale('zh');
  // 选择时间
  $('.form-time input').datetimepicker({
    format: 'Y-m-d H:i',
    lang: 'ch'
  });

  // 文件图片预览
  $('#matchLogo').on('change', function(){
    var file = this.files[0];
    var $img = $('.file-token img').get(0);

    var blob = $img.src;
    $img.src = '';

    if(/^blob/i.test(blob)){
      // 释放前一个资源所占的内存
      URL.revokeObjectURL(blob);
    }

    if(!file){
      return false; // 未选择文件直接返回
    }

    // 类型判断
    // 2016.7.9 对input添加了image限制，这里可以忽略
    if(!/^image\/\w+/i.test(file.type)){
      $.prompt('请上传图片文件！')
      return false;
    }

    $img.src = URL.createObjectURL(file);
  });

  // 提交
  $('.form-submit').on('click', function(){

    var $title = $('#title').val();
    var $startTime = $('#startTime').val();
    var $endTime = $('#endTime').val();
    var $homeTeam = $('#homeTeam').val();
    var $visitTeam = $('#visitTeam').val();
    var $matchIntro = $('#matchIntro').val();
    
    $.prompt('提交');
  });


});



