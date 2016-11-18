// JavaScript Document

$(document).ready(function(){
	inputDel();
	logBtn();
	lineSet(".notLogged .user_form p,.notLogged .user_form input#btn");
});

var wait=60;
function time(obj) {
	if (wait == 0) {
		obj.removeAttribute("disabled");
		obj.setAttribute("class", ""); 
		obj.value="获取验证码";
		wait = 60;
	}else{
		obj.setAttribute("disabled", true);
		obj.setAttribute("class", "disabled"); 
		obj.value="重新获取("+wait+"s)";										//wait + "s后重新获取";
		wait--;
		setTimeout(function() {
			time(obj);
		},1000)
	}
}

function logBtn(){
	$(".notLogged .loginBtn").on("click",function(){
		$(this).addClass("dis-btn");
	});
}

/* 输入删除 */
function inputDel(){
	
	$(".notLogged .user_form span input").focus(function(){
		$(".notLogged .user_form span .del").hide();
		if($(this).val() != ""){
			$(this).next(".del").css({"display":"block"});
		}else{
			$(this).next(".del").hide();
		}
	})
	
	$(".notLogged .user_form span .del").click(function(){
		$(this).prev().focus();
		$(this).prev().attr("value","");
		$(this).hide();
	})
	
	$(".notLogged .user_form span input").bind('input propertychange', function() {
		if($(this).val() != ""){
			$(this).next(".del").css({"display":"block"});
		}else{
			$(this).next(".del").hide();
		}
	})
}