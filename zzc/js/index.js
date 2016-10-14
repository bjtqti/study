 
//侧边栏
$('#side-bar').delegate('li','mouseover mouseout click',function(e){
	var index = $(this).index();
	switch(e.type){
		case 'mouseover':
			handleMouseover(index,this);
			break;
		case 'click':
			handleClick(index);
			break;
		case 'mouseout':
			handleMouseout(index,this);
			break;
		default:
			break;
	}
	return false;
});

//返回顶部
function toTop(){
	$('body').animate({
		scrollTop: 0 
	}, 500);
}

function handleClick(index){
	switch(index){
		case 0:
			alert('需求发布');
			break;
		case 3:
			alert('问题反馈');
			break;
		case 4:
			toTop();
			break;
		default:
			break;
	}
}

function handleMouseover(index,target){
	if([0,1,3].indexOf(index)!== -1){
		target.children[1].style.display='block';
	}
}

function handleMouseout(index,target){
	if([0,1,3].indexOf(index)!== -1){
		target.children[1].style.display='none';
	}
}
