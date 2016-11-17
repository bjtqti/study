'use strict';
const fs = require('fs');
const DIR = __dirname;
 
const rename = (a,b)=>{
	fs.rename(DIR+'/'+a,DIR+'/'+b,function(err){
		if(err){
			console.log(err);
		}
		console.log('success')
	});
}

//rename('test.txt','test_01.txt');