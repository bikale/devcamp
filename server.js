const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const colors = require('colors');
//load env vars

dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//route file
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser

app.use(express.json());

//Middleware

// const logger = (req, res, next) => {
//   req.hello = 'hello world';
//   console.log('Middleware running');
//   next();
// };

// app.use(logger);

// Dev logging middleware

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

//Mount router

app.use('/api/v1/bootcamps', bootcamps);

//Mounting error handler

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process

  server.close(() => process.exit(1));
});
