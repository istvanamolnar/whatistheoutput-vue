'use strict';

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const questionsRoute = require('./routes/questions');
const addQuestionRoute = require('./routes/addQuestion');

mongoose.connect(`mongodb+srv://${process.env.U}:${process.env.P}@whatistheoutput-bekgg.mongodb.net/whatistheoutput?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection established to DB');
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTEND_SERVER_BASE_URL}`);
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
app.use('/addQuestion', addQuestionRoute);


app.listen(port, () => console.log(`Server is running on port ${port}!`));
