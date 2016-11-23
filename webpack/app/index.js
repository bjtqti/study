"use strict";

import _ from "lodash";
//import fetch from "isomorphic-fetch";

function component() {
	var element = document.createElement('div');

	element.innerHTML = _.map(['Hello', 'webpack'], function(item) {
		return item + ' ';
	});

	return element;
}

window.addEventListener('DOMContentLoaded',function(){
	document.body.appendChild(component());
});


