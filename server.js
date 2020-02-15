const express = require('express');
const dotenv = require('dotenv');
//route file

const bootcamps = require('./routes/bootcamps')

//load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

//Mount router

app.use('/api/v1/bootcamps',bootcamps)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.PORT} node on port ${PORT}`)
);
