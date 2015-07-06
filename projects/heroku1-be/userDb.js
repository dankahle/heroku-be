var mongoose = require('mongoose'),
	users = require('./users.json'),
	util = require('util')


var connstr;
if (process.env.NODE_ENV == 'production')
	connstr = util.format('mongodb://%s:%s@ds030817.mongolab.com:30817/dankdb', process.env.dbuser, process.env.dbpassword);
else
	connstr = 'mongodb://localhost:27017/db';

console.log('heroku1be: mongo connected to:', process.env.NODE_ENV == 'production'? 'mongolab': 'localhost');
var db = mongoose.createConnection(connstr)
db.on('error', function (err) {
	console.error(err);
})

var userSchema = mongoose.Schema({
	name: String,
	age: Number
});

var User = db.model('heroku1be_user', userSchema);

// refresh users

User.remove({}, function (err) {
	if (err) return console.error(err);

	User.create(users, function (err) {
		if (err)
			return console.error(err);
	})
})


module.exports = User;
