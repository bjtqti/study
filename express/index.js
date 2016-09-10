//express_demo.js 文件
var express = require('express');
var app = express();
var util=require('util');

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/index.html', function (req, res) {
  
   //res.send('Hello World');
   res.json(JSON.stringify({a:3}))
})

var server = app.listen(3000, function () {
 	console.log(util.isArray([]))
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})