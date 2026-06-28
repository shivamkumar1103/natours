const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const helmetConfig = require('./utils/helmetConfig');
const sanitizeObject = require('./utils/sanitizeObject');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.set('query parser', 'extended');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Middleware

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// set security HTTP headers
app.use(helmetConfig);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use((req, res, next) => {
  if (req.body) {
    sanitizeObject(req.body);
  }
  next();
});

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Rate Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// Routes

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// 404 handler
app.use((req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
