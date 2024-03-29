const mongoose = require('mongoose');
const answer = require('./answer').schema;

const questionSchema = mongoose.Schema({
  question: { type: Array, required: true },
  answers: { type: [ answer ], required: true },
  description: { type: Array },
  reference: { type: String }
});

module.exports = mongoose.model('Question', questionSchema);
