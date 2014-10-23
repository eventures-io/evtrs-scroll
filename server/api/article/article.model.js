'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  content: String,
  type: String,
  publDate: Date,
  modDate: Date
});

module.exports = mongoose.model('Article', ArticleSchema);