// JavaScript Document

$(document).ready(function(){
	lineSet("footer,.user-list a,.user-order .kind,.notLog a");
	displayLogoutButton();
});

/**
 * 注册
 * @author <278500368@qq.com>
 */
function register(){
	var backurl=encodeURIComponent(baseRoot+'/membercenter.h');
	window.location.href=sslHost+"/member/"+appKey+"/vshop/wap/register.html?tag=&responseType=code&redirectUrl="+backurl;
}

/**
 * 非微信浏览器显示退出登录
 * @author <278500368@qq.com>
 */
function displayLogoutButton(){
	if(!isWeiXin()){
		var btn = document.getElementById('btn-logout');
		btn.style.display='block';
		btn.onclick=function(){
			window.location.href=baseRoot+'/logout.h';
		}
	}
}