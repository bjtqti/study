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