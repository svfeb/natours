const express = require('express');

const app = express();
const morgan = require('morgan');

const globalErrorhandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRoute = require('./router/tourrouter');
const userRoute = require('./router/userrouter');

//middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorhandler);

module.exports = app;
