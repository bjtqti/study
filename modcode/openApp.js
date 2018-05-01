//协议为：com.baidu.tieba:// ，微信的：weixin:// 
//<meta name='apple-itunes-app' content='app-id=477927812'>  百度的appid
/**
 *  
 https://blog.csdn.net/liulinghuidage/article/details/53906813
 什么是 URL Scheme？
    android中的scheme是一种页面内跳转协议，是一种非常好的实现机制，通过定义自己的scheme协议，可以非常方便跳转app中的各个页面；通过scheme协议，服务器可以定制化告诉App跳转那个页面，可以通过通知栏消息定制化跳转页面，可以通过H5页面跳转页面等。

URL Scheme应用场景：
    客户端应用可以向操作系统注册一个 URL scheme，该 scheme 用于从浏览器或其他应用中启动本应用。通过指定的 URL 字段，可以让应用在被调起后直接打开某些特定页面，比如商品详情页、活动详情页等等。也可以执行某些指定动作，如完成支付等。也可以在应用内通过 html 页来直接调用显示 app 内的某个页面。综上URL Scheme使用场景大致分以下几种：

服务器下发跳转路径，客户端根据服务器下发跳转路径跳转相应的页面
H5页面点击锚点，根据锚点具体跳转路径APP端跳转具体的页面
APP端收到服务器端下发的PUSH通知栏消息，根据消息的点击跳转路径跳转相关页面
APP根据URL跳转到另外一个APP指定页面
 */
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



var log = function (msg){

}

var timeout,t=1000,hasApp=true;
setTimeout(function(){
    if(hasApp){
        log('installed app');
        //node.hide()
    }else{
        log('not installed app');
        //node.show();
        //downloadApp()
    }
},2000)

function testApp(){
    var t1 = Date.now();
    var ifr = document.createElement('iframe');  
    ifr.src = 'com.baidu.tieba://'; //your app scheme
    document.body.appendChild(ifr);
    timeout = setTimeout(function(){
        try_to_open_app(t1)
    },t);
}

function try_to_open_app(t1){
    var t2 = Date.now();
    if(!t1 || t2-t1 < t+200){
        ////若启动应用，则js会被中断较长时间，超出此范围  
        hasApp = false;
    }
}

