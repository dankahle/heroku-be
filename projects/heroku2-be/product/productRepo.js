
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Product = require('./productDb');

exports.getProducts = function(cb) {
	Product.find().exec(cb);
}

