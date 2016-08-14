var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());

app.get('/', function(req, res) {
	if (req.cookies.isVisit) {
		console.log(req.cookies);
		res.send("Welcome ," + req.cookies.isVisit);
	} else {
		res.cookie('isVisit', new Date(), {maxAge: 6000});
		res.send("First visit");
	}
});


app.listen(3000);
