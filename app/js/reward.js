
$(function(){
  
  $('.reward-list li').on('click', function(){
    $('.reward-list li, #input-reward').removeClass('active');
    $(this).addClass('active');
    $('.reward-input input').val('');
  })

  $('#input-reward').on('input keyup change', function(){
    var $this = $(this);
    var v = $this.val();
    if(v&&/^\d+$/.test(v)){
      $('.reward-list li').removeClass('active');
      $this.addClass('active');
    }else{
      $this.removeClass('active');
      $('.reward-list li').eq(3).addClass('active');
    }
  });

  //微信支付
  $('.reward-submit').on('click',function(){
    var elem = $('.reward-box').find('.active');
    var v;
    if(elem.get(0).tagName.toLowerCase()==='li'){
      v = elem.text().replace(/\D/g,'');
    }else{
      v = elem.val();
    }

    $.prompt('将支付的金额为：'+v)
  });

});