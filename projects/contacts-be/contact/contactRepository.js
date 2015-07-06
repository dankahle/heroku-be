
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Contact = require('./contactDb');


exports.getContacts = function(params, cb) {
	var query = Contact.find().select('-created -sport -__v').lean();
	if(params.name) query = query.where('name').equals(params.name);
	if(params.minAge) query = query.where('age').gte(params.minAge)
	if(params.sort) query = query.sort(params.sort);

	query.exec(function(err, contacts) {
		cb(err, err? null: contacts.map(function(v,i) {
			v.rownum = i + 1;
			return v;
		}));
	});
};

exports.getContactsPage = function(pageNo, pageSize, sort, cb) {
	var opts =  {
		columns: '-created -modified -__v',
		lean: true,
		page: parseInt(pageNo),
		limit: parseInt(pageSize)
	};

	if(sort)
		opts.sortBy = sort;
	Contact.paginate({}, opts,
		function(err, data, pageCount, numRecords) {
/*
			var contacts = data.map(function(v,i) {
				v.rownum = (pageNo * pageSize - pageSize) + 1 + i;
				return v;
			})
*/
			cb(err, err? null: {numRecords: numRecords, data: data});
		});
};

var getOneContact = function(id, cb){
	Contact.findById(id).exec(function(err, contact) {
		if(err) return cb(err);
		if(!contact) return cb(new Error('Contact not found'));
		cb(null, contact);
	});
};

exports.getOneContact = function(id, cb) {
	getOneContact(id, function(err, contact) {
		cb(err, !err? contact.toObject(): undefined);
	})
};

exports.add = function(contact, cb) {
	new Contact(contact).save(cb);
};

exports.update = function(contact, cb) {
	getOneContact(contact._id, function(err, doc) {
		if(err) return cb(err);
		_.extend(doc, contact);
		doc.save(cb);// returns numAffected
	})
};

exports.remove = function(id, cb) {
	getOneContact(id, function(err, doc) {
		if(err) return cb(err);
		doc.remove(cb);// returns removed contact
	})
};

