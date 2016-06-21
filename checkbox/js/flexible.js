'use strict';
(function(win) {
	
	var doc=win.document,
		docEl=doc.documentElement,
		metaEl=doc.querySelector('meta[name="viewport"]'),
		dpr=1,
		scale=1,
		name='',
		timer=null;

	if (metaEl) {
		var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
		if (match) {
			scale = parseFloat(match[1]);
			dpr = parseInt(1 / scale);
		}
	}

	var UA = win.navigator.appVersion,
		isIPhone = UA.match(/iphone/gi),
		isAndroid = UA.match(/android/gi),
		isApp = UA.match(/NewsApp/gi),
		isPc = UA.match(/Windows/gi) || UA.match(/Macintosh/gi);

	if( isIPhone ){
		name = 'ios-style dpr-'+win.devicePixelRatio;
	}else if( isAndroid ){
		name = 'android-style';
	}else if( isPc ){
		name = 'pc-style';
	}
	docEl.className = name;

	function refreshRem(){
		var width = docEl.getBoundingClientRect().width;
		if (width / dpr > 540) {
			width = 360 * dpr;
		}
		var rem = width / 10;
		docEl.style.fontSize = rem + 'px';
	}

	win.addEventListener('resize', function() {
		clearTimeout(timer);
		timer = setTimeout(refreshRem, 300);
	}, false);

	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 14 * dpr + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function(e) {
			doc.body.style.fontSize = 14 * dpr + 'px';
		}, false);
	}

	refreshRem();

})(window);