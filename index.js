var express = require('express'),
	bodyParser = require('body-parser'),
	apiErrorHandler = require('api-error-handler'),
	expressDomainMiddleware = require('express-domain-middleware'),
	_ = require('lodash'),
	heroku1BeRouter = require('./projects/heroku1-be/heroku1BeRouter');
	//heroku2_be_productRouter = require('./projects/heroku2-be/productRouter');

var app = express()
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
	console.log('heroku-be entry:', req.method, req.url);
	next()
})

app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	if(req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if ('OPTIONS' == req.method)
		res.send(200);
	else
		next();
})

app.get('/', function(req, res) {
	res.send('heroku backend')
})

app.use('/heroku1-be', heroku1BeRouter);

app.use(function (req, res) {
	res.status(404).send('Oops, file not found')
})

app.use(apiErrorHandler())
app.listen(port, function(){
	console.log('listening on ' + port);
});
