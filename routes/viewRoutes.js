const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);
module.exports = router;
