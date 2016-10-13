 

var sidebar = $('#side-bar');

sidebar.find('li').on('mouseover',function(e){
	e.preventDefault();
	var target = $(this).find('.ziceng');
	target && target.show();
	return false;
}).on('mouseout',function(e){
	e.preventDefault();
	var target = $(this).find('.ziceng');
	target && target.hide();
	return false;
}).on('click',function(){
	switch($(this).index()){
		case 0:
			alert('需求发布');
			break;
		case 3:
			alert('问题反馈');
			break;
		case 4:
			$('body').animate({ scrollTop: 0 }, 500);
			break;
		default:
			break;
	}
});