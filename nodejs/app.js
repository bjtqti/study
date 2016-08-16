var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var ejs = require('ejs');

app.listen(8000,function(){
	console.log('http://localhost:8000')
});

var tweets = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
// parse application/json
//app.use(bodyParser.json());

app.get('/',function(req,res){
	var title = 'hello',
		header = "Welcome to node express";
	res.render('index',{
		locals:{
			'title':title,
			'header':header,
			'tweets':tweets,
			stylesheets:['/public/style.css']
		}
	});
})

app.post('/send', express.bodyParser(), function(req, res) {
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet)
		if (acceptsHtml(req.headers['accept'])) {
			res.redirect('/', 302)
		} else {
			res.send({
				status: "ok",
				message: "Tweet received"
			})
		}
	} else {
		// 没有 tweet ？
		res.send({
			status: "nok",
			message: "No tweet received"
		})
	}
})

app.get('/tweets',function(req,res){
	res.send(tweets)
});

function acceptsHtml(header) {
	var accepts = header.split(',')
	for (i = 0; i < accepts.length; i += 0) {
		if (accepts[i] === 'text/html') {
			return true
		}
	}
	return false
}