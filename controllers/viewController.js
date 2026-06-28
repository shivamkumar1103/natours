const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

exports.getOverview = async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
};

exports.getTour = async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review user rating',
  });

  if (!tour) {
    return next(new AppError('No tour found with that name.', 404));
  }
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `The ${tour.name} Tour`,
    tour,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

// get booked tours
exports.getMyTours = async (req, res) => {
  // 1) get bookings
  const bookings = await Booking.find({ user: req.user.id });
  // 2) find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  // 3) find tours with the returned IDs
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
};
