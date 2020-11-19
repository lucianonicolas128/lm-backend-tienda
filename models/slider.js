'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = Schema({
    name: String,
    image: String
})

module.exports = mongoose.model('Slider', SliderSchema);