const express = require('express');
const authRoute = require('./auth/auth.route')
const router = express.Router();

router.use('/',authRoute);

module.exports.router = router;