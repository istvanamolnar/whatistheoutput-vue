'use strict';

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const dotenv = require('dotenv').config();

const questionsRoute = require('./routes/question');

mongoose.connect(`mongodb+srv://istvanamolnar:password@whatistheoutput-bekgg.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection established to DB');
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.BACKEND_SERVER_BASE_URL}`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken, userId, email'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.use('/questions', questionsRoute);


app.listen(port, () => console.log(`Server is running on port ${port}!`));
