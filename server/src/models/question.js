const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questiontype: {
    type: String,
    required: true,
  },
  options:{
    type: Array,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

mongoose.model('Question', Question);
