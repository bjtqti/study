$(function(){
  
  // 编辑操作
  $('.match-status').on('click', '.op-edit', function(){
    var $status = $(this).parents('.status-list');
    var name = $status.find('.status-name').text();
    var description = $status.find('.status-description').text();
    var score = $status.find('.status-score').text();
    var id = 'id' // 应该有个ID指示为具体哪一条数据

    var $editBox = $('#edit-box');
    $editBox.find('#editName').val(name);
    $editBox.find('#editDescription').val(description);
    $editBox.find('#editScore').val(score);
    $editBox.find('#tempID').val(id);

    $editBox.show(800);
  });

  // 删除
  $('.match-status').on('click', '.op-delete', function(){
    var id = 'id';

    $.prompt('确定删除？',{
      buttons: { '取消': false, '确定': true },
      submit: function(e,v,m,f){
        if(v){
          // 删除操作
          $.prompt('删除')
        }
      }
    });
  });

  // 编辑确定
  $('#edit-box .edit-submit').on('click', function(){
    var id = $('#edit-box #tempID').val();

    // 相关操作

    $('#edit-box').hide(500);

    $.prompt('对ID为：'+id+'的数据进行编辑修改');
  });

});



