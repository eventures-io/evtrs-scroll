'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title:{type: String, required: true, index: { unique: true, sparse: true }},
  content: {type: String,required: true},
  publDate: Date,
  modDate: Date
});

module.exports = mongoose.model('Article', ArticleSchema);