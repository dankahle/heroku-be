
var express = require('express'),
	repo = require('./productRepo')

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
	repo.getProducts(function(err, products) {
		if(err) return handleError(err);
		res.send(products);
	})
})
