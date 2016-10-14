 
//侧边栏
$('#side-bar').on('mouseover mouseout click','li',function(e){
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

$('.z-mask').on('click',function(e){
	if(e.target.className==='close'){
		this.style.display = 'none';
	}
})

//返回顶部
function toTop(){
	$('body').animate({
		scrollTop: 0 
	}, 500);
}

function handleClick(index){
	switch(index){
		case 0:
			publishRequest('发布需求',false);
			break;
		case 3:
			publishRequest('问题反馈',true);
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

function publishRequest(title,flag){
	var mask = $('.z-mask');
	mask.find('.title').text(title);
	if(flag){
		mask.find('.tips').hide();
		mask.find('.submit').text('提交问题');
	}else{
		mask.find('.tips').show();
		mask.find('.submit').text('点击发布');
	}	
	mask.show();
}
