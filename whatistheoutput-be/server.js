'use strict';

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const questionsRoute = require('./routes/questions');

mongoose.connect(`mongodb+srv://${process.env.U}:${process.env.P}@whatistheoutput-bekgg.mongodb.net/whatistheoutput?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connection established to DB!');
})
.catch((error) => {
  console.log(error);
});

app.use((req, res, next) => {
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
app.use(express.static('assets'));
app.use('/questions', questionsRoute);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + './public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
