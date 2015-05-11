'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title:{type: String, required: true, index: { unique: true, sparse: true }},
  type: {type: String, required: true},
  content: {type: String},
  image: {type: String},
  publDate: Date,
  modDate: Date
});

module.exports = mongoose.model('Article', ArticleSchema);