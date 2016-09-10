 
//express_demo.js 文件
var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/index.html', function (req, res) {
	//console.log(__dirname)
    res.sendFile( __dirname + "/views/index.html" );
   //res.json(JSON.stringify({a:3}))
});

app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })

var bs = require('browser-sync').create();
app.listen(3000, function(){
    bs.init({
        open: false,
        ui: false,
        notify: false,
        proxy: 'localhost:3000',
        files: ['./views/**'],
        port: 8080
    });
    console.log('App (dev) is going to be running on port 8080 (by browsersync).');
});