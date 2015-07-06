var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	contacts = require('./contacts.json'),
	util = require('util'),
	settings = require('../settings.js');

console.log(settings.projectName + ' mongo:', settings.connectionString);
var db = mongoose.createConnection(settings.connectionString)
db.on('error', function (err) {
	console.error(settings.projectName, err);
})

var phoneSchema = new mongoose.Schema({
	type: String,
	phone: String
})

var emailSchema = new mongoose.Schema({
	type: String,
	email: String
})

var addrSchema = new mongoose.Schema({
	type: String,
	street: String,
	city: String,
	state: String,
	zip: String
})

var contactSchema = mongoose.Schema({
	_id: mongoose.SchemaTypes.ObjectId,
	firstName: String,
	lastName: String,
	birthDay: String,
	company: String,
	groups: [String],
	created: String,
	modified: String,
	phones: [phoneSchema],
	emails: [emailSchema],
	addrs: [addrSchema],
	notes: String
});
contactSchema.plugin(mongoosePaginate);
var Contact = db.model(settings.dbNamespace + 'contact', contactSchema);

// refresh contacts
if(settings.dbrefresh) {
	console.log(settings.projectName, 'database refresh')
	Contact.remove({}, function (err) {
		if (err) return console.error(err);

		Contact.create(contacts, function (err) {
			if (err)
				return console.error(err);
		})
	})

}


module.exports = Contact;
