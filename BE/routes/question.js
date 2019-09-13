const express = require('express');

const router = express.Router();

const Question = require('../models/question');

router.get('/', (req, res) => {
  Question.find({}, function(err, docs){
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Something went wrong, please try again later.',
      });
    }
    console.log('WTF');
    res.status(500).json(docs);
  })
  /* , ).select()
    .then((questions) => {
      console.log(questions)
      res.status(200).json(questions);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong, please try again later.',
      });
    }); */
});

module.exports = router;
