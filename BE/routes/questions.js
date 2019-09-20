const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

const Question = require('../models/questions');
router.get('/', (req, res) => {
  const numOfQuestions = Number(req.query.num) + 1;
  Question.find().limit(numOfQuestions)
  .then((questions) => {
    res.status(200).json(questions);
  })
  .catch(() => {
    res.status(500).json({
      message: 'Something went wrong, please try again later.',
    });
  });
});

module.exports = router;
