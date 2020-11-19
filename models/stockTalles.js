'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockTallesSchema = Schema({
    talle: String,
    stockTalle: String
});

module.exports = mongoose.model('stockTalles', stockTallesSchema);