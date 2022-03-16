const express = require('express');
const { verifyToken } = require('../../helpers/jwt');
const { isLoggedin } = require('../../helpers/auth-middleware');
const authController = require('./auth.controller')
const { checkValidate } = require('./auth.services');
const router = express.Router();
router.route('/login')
  .post(isLoggedin, checkValidate, authController.login);

router.route('/logout')
  .post();

router.route('/get-profile/:email')
  .get(isLoggedin, verifyToken, authController.getProfile);

router.route('/signup')
  .post(isLoggedin, checkValidate,  authController.signup);

router.route('/profile-update')
  .post(isLoggedin, checkValidate, authController.profileUpdate);

router.route('/forgot-password')
  .post(isLoggedin, checkValidate, authController.forgotPassword);

router.route('/reset-password')
  .post(isLoggedin, checkValidate, authController.resetPassword);

module.exports = router;