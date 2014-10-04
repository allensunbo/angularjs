var express = require('express');
var faker = require('faker');
var cors = require('cors');
var jwt = require('jwt-simple');
var moment = require('moment');

var bodyParser = require('body-parser');

var app = express();
app.use(cors());

var YOUR_SECRET_STRING = 'YOUR_SECRET_STRING';
app.set('jwtTokenSecret', YOUR_SECRET_STRING);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

//console.log(faker);
app.get('/random-user', function(req, res) {
	console.log('request:'+req);
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.get('/token', function(req, res) {
	var user = {name:'john', password:'password'};
	var expires = moment().add('days', 7).valueOf();
	var token = jwt.encode({
		iss: user.name,
		exp: expires
		}, app.get('jwtTokenSecret'));
 
	res.json({
		token : token,
		expires: expires,
		user: user
	});
});

app.post('/something', function(req, res, next){
  // do something
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if(token){
    console.log(token);
	// next();
	res.end(token);
  } else {
	next();
  }
});

app.listen(3000, function() {

});