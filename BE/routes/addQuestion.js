const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

const Question = require('../models/questions');

router.post('/', (req, res) => {
  const questionData = req.body;
  if (questionData.question && questionData.answers) {
    const newQuestion = {
      question: req.body.question.split('\n'),
      answers: req.body.answers,
      description: req.body.description.split('\n')
    };
    newQuestion.answers.forEach((answer, index) => {
      answer.isCorrect = Number(req.body.isCorrect) === index ? 1 : 0; 
    })
    const question = new Question(newQuestion);
      question.save()
      .then(() => res.status(200).json('Question saved'))
      .catch(err => console.log(err));
  } else {
    res.status(400).json('Missing data');
  }
});

module.exports = router;
