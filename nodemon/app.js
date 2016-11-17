'use strict';
const fs = require('fs');
const DIR = __dirname;
 
const rename = (a,b)=>{
	fs.rename(DIR+'/'+a,DIR+'/'+b,(err)=>{
		if(err){
			console.log(err);
		}
		console.log('success')
	});
}

//rename('test.txt','test_01.txt');

const del = (file)=>{
	fs.unlink(DIR+'/'+file,(err)=>{
		if(err) throw err;
		console.log('successfully deleted '+file);
	})
}

// del('index.html');

const stat = ()=>{
	fs.stat('./test.txt',(err,stats)=>{
		if(err){
			throw err;
		}
		console.log(`stats: ${JSON.stringify(stats)}`);
	})
}

// stat();

const read = (fileName)=>{
	fs.readFile(fileName,(err,data)=>{
		console.log(data.toString())
	});
}

const access=(fileName)=>{
	fs.access(fileName,fs.R_OK|fs.W_OK,(err)=>{
		console.log(err ? 'no access!':'can read/write');
		return !!err;
	});
}

// access('/test.txt');

const append = (file,data)=>{
	if(access(file)) return false;
	fs.appendFile(file,data,(err)=>{
		if(err) throw err;
		console.log('The data was appended to file');
	})
}

// append('test.txt','\r\n data to append')

const dir=(path)=>{
	fs.readdir(path,(err,data)=>{
		console.log(data)
	});
}

// dir('./');