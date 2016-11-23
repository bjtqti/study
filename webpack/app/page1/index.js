"use strict";

import _ from "lodash";

//import fetch from "isomorphic-fetch";
require('./index.css');

function component() {
	var element = document.createElement('div');
	var text = _.map(['Hello', 'webpack','!'],(item)=>{
		return item;
	});
	element.className = 'container';
	element.innerHTML = text.join(' ');

	return element;
}

window.addEventListener('DOMContentLoaded',function(){
	document.body.appendChild(component());
});


