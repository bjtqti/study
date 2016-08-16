var http = require('http'),
	qs = require('querystring'),
	assert = require('assert');

var opts = {
	host : 'localhost',
	port : 8000,
	path : '/send',
	method : 'POST',
	headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
}

var postData = {tweet:"test"}

var content = qs.stringify(postData);  
//console.log(content); // => tweet=test
var req = http.request(opts,function(res){
	res.setEncoding('utf8');
	var data = "";
	res.on('data',function(d){
		data += d;
	});
	
	res.on('end',function(){
		assert.strictEqual(data,'{"status":"ok","message":"Tweet received"}');
	})
});

//send post data
req.write(content);
req.end();