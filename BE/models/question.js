const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { type: Array, required: true},
  answers: { type: Array, required: true},
  description: { type: String, required: true}
});

module.exports = mongoose.model('Question', questionSchema);
