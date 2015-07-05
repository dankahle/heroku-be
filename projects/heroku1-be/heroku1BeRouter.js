var express = require('express'),
	userRouter = require('./userRouter')

router = express.Router();
module.exports = router;

router.use('/user', userRouter);
