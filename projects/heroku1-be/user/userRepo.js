
var mongoose = require('mongoose'),
	_ = require('lodash'),
	User = require('./userDb');

exports.getUsers = function(cb) {
	User.find().exec(cb);
}

