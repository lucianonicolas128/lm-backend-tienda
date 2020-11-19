'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TalleSchema = Schema({
    talleName: String,
    ancho: String,
    alto: String,
    detalle: String    
})

module.exports = mongoose.model('Talle', TalleSchema);