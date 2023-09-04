const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  version: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  displayText: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('language', languageSchema);
