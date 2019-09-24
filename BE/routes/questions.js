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
  Question.find()
  .then((questions) => {
    res.status(200).json(questions);
  })
  .catch(() => {
    res.status(500).json({
      message: 'Something went wrong, please try again later.',
    });
  });
});

router.delete('/delete', (req, res) => {
  Question.deleteOne({'_id': req.query.id})
  .then(() => {
    res.status(200).json('Question deleted');
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
    let newQuestion = {
      question: questionData.question.split('\n'),
      answers: questionData.answers,
      description: questionData.description,
      reference: questionData.reference
    };
    newQuestion.answers.forEach((answer, index) => {
      answer.isCorrect = (index === Number(questionData.correctOne) ? 1 : 0)
    })
    const question = new Question(newQuestion);
    question.save()
    .then(() => res.status(200).json('Question saved'))
    .catch(err => console.log(err));
  } else {
    res.status(400).json('Missing data');
  };
});

router.put('/update', (req, res) => {
  const updatedQuestion = req.body;
  updatedQuestion.answers.forEach((answer, index) => {
    answer.isCorrect = index === Number(updatedQuestion.correctOne) ? 1 : 0;
  })
  Question.findByIdAndUpdate(req.body._id, updatedQuestion)
  .then(() => {
    res.status(200).json('Question updated');
  })
  .catch(() => {
    res.status(500).json({
      message: 'Something went wrong, please try again later.',
    });
  });
});

module.exports = router;
