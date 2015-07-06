var express = require('express'),
	productRouter = require('./productRouter')

router = express.Router();
module.exports = router;

router.use('/product', productRouter);
