'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = Schema({
    date: String,
    products: String,
    nameClient: String,
    phoneClient: String,
    emailClient: String,
    shipping: String,
    address: String,
    pay: String,
    total: Number,
    status: String
});

module.exports = mongoose.model('Sale', SaleSchema);