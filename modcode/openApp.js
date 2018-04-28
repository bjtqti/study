//协议为：com.baidu.tieba:// ，微信的：weixin:// 
//<meta name='apple-itunes-app' content='app-id=477927812'>  百度的appid
document.getElementById('openApp').onclick = function(e){  
    // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为  
    // 否则打开a标签的href链接  
    var ifr = document.createElement('iframe');  
    ifr.src = 'com.baidu.tieba://';  
    ifr.style.display = 'none';  
    document.body.appendChild(ifr);  
    window.setTimeout(function(){  
        document.body.removeChild(ifr);  
    },3000)  
};  