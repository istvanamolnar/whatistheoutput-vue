const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  answer: { type: String, required: true},
  isCorrect: { type: Number, required: true}
});

module.exports = mongoose.model('Answer', answerSchema);
