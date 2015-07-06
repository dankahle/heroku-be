var express = require('express'),
	contactRouter = require('./contact/contactRouter')

router = express.Router();
module.exports = router;

router.use('/contact', contactRouter);
