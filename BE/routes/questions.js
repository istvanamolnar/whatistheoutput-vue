const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

const Question = require('../models/questions');
router.get('/', (req, res) => {
  const numOfQuestions = Number(req.query.num);
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

router.get('/getall', (req, res) => {
  Question.find().select()
  .then((questions) => {
    res.status(200).json(questions);
  })
  .catch(() => {
    res.status(500).json({
      message: 'Something went wrong, please try again later.',
    });
  });
});

router.post('/add', (req, res) => {
  const questionData = req.body;
  if (questionData.question && questionData.answers) {
    const newQuestion = {
      question: questionData.question.split('\n'),
      answers: questionData.answers,
      description: questionData.description.split('\n')
    };
    const question = new Question(newQuestion);
      question.save()
      .then(() => res.status(200).json('Question saved'))
      .catch(err => console.log(err));
  } else {
    res.status(400).json('Missing data');
  }
});


module.exports = router;
