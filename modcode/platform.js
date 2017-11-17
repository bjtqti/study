function isWechat() {
	var ua = navigator.userAgent.toLowerCase();
	return /micromessenger/i.test(ua);
}

function isQQBrowser() {
	var ua = navigator.userAgent.toLowerCase();
	return /Mobile MQQBrowser/i.test(ua);
}

function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	return /android/i.test(ua);
}

var ua =  navigator.userAgent,
    uv = navigator.appVersion,
    isAndroid = (/android/gi).test(uv),
    isTouchPad = (/hp-tablet/gi).test(uv),
    isIphone = (/iphone|ipod/gi).test(ua),
    isIpad = (/ipad/gi).test(ua),
    isIOS = isIphone || isIpad,
    isIOS7 = isIOS && (/OS\s7/gi).test(ua);