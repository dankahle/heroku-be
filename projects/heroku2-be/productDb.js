var mongoose = require('mongoose'),
	products = require('./products.json'),
	util = require('util')


var connstr;
if (process.env.NODE_ENV == 'production')
	connstr = util.format('mongodb://%s:%s@ds030817.mongolab.com:30817/dankdb', process.env.dbproduct, process.env.dbpassword);
else
	connstr = 'mongodb://localhost:27017/db';

console.log('mongo connected to:', process.env.NODE_ENV == 'production'? 'mongolab': 'localhost');
var db = mongoose.createConnection(connstr)
db.on('error', function (err) {
	console.error(err);
})

var productSchema = mongoose.Schema({
	name: String,
	price: Number
});

var Product = db.model('heroku2be_product', productSchema);

// refresh products

Product.remove({}, function (err) {
	if (err) return console.error(err);

	Product.create(products, function (err) {
		if (err)
			return console.error(err);
	})
})


module.exports = Product;
