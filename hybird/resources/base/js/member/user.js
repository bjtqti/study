// JavaScript Document

$(document).ready(function(){
	lineSet("footer,.user-list a,.user-order .kind,.notLog a");
});

function register(){
	var backurl=encodeURIComponent(baseRoot+'/membercenter.html');
	window.location.href=sslHost+"/member/"+appKey+"/vshop/wap/register.html?tag=&responseType=code&redirectUrl="+backurl;
}