var express = require('express');
var faker = require('faker');
var cors = require('cors');

var app = express();
app.use(cors());

//console.log(faker);
app.get('/random-user', function(req, res) {
	console.log('request:'+req);
	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();
	res.json(user);
});

app.listen(3000, function() {

});