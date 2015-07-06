var express = require('express'),
	productRouter = require('./product/productRouter')

router = express.Router();
module.exports = router;

router.use('/product', productRouter);
