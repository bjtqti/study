"use strict";
import jquery from 'jquery';
var app = document.getElementById('app');
var p = document.createElement('p');
let now =  Date.now();
let text = "hello webpack : at "+now+" !!";
p.innerHTML  = text;
app.appendChild(p);
 
const fn=(a)=>{
	return console.log(a);
}

jquery(document).ready(()=>{
	fn(text);
	console.log(888)
});

module.exports = fn;
 