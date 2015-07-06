
var express = require('express'),
	repo = require('./contactRepository')

router = express.Router();
module.exports = router;

function pullOutErrMsg(err) {
	if(err.errors) {
		var message = '';
		for(prop in err.errors)
			message += err.errors[prop].message + '\n';
		err.message = message;
	}
}

function handleError(err) {
	pullOutErrMsg(err);
	console.error('pullout: ', err);
	throw err;
}


router.get('/', function(req, res){
	repo.getContacts( req.query, function(err, contacts) {
		if(err) return handleError(err);
		res.send(contacts);
		console.log('done')
	})
})

router.get('/page', function(req, res){
	repo.getContactsPage(req.query.pageno, req.query.pagesize, req.query.sort, function(err, resp) {
		if(err) return handleError(err);
		res.send(resp);
	})
})

router.get('/:id', function(req, res){
	repo.getOneContact(req.params.id, function(err, contact) {
		if(err) return handleError(err);
		if(err) return console.error(err);
		res.send(contact);
	})
})

router.post('/', function(req, res) {
	repo.add(req.body, function(err, contact) {
		if(err) return handleError(err);
		res.send(contact);
	})
})

router.put('/:id', function(req, res) {
	repo.update(req.body, function(err, contact) {
		if(err) return handleError(err);
		res.send(contact);
	})
})

router.delete('/:id', function(req, res){
	repo.remove(req.params.id, function(err, result) {
		if(err) return handleError(err);
		res.send(result);
	})
})


