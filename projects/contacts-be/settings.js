
var util = require('util');

var dbuser = process.env.dbuser,
	dbpassword = process.env.dbpassword,
	production =  process.env.NODE_ENV == 'production';


var exp = module.exports = {
	// env vars
	dbrefresh: process.env.dbrefresh && /\bcontacts-fe\b/.test(process.env.dbrefresh),

	projectName: 'contacts-be',
	dbNamespace: 'contactsbe_',
	production: production,
	development: !production
};

if (production) {
	if (!dbuser || !dbpassword)
		throw new Error(exp.projectName + ': missing dbuser/dbpassword environment vars')

	exp.connectionString = util.format('mongodb://%s:%s@ds030817.mongolab.com:30817/dankdb', dbuser, dbpassword);
}
else
	exp.connectionString = 'mongodb://localhost:27017/db';




