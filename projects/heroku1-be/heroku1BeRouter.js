var express = require('express'),
	userRouter = require('./user/userRouter')

router = express.Router();
module.exports = router;

router.use('/user', userRouter);
