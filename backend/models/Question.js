const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
