'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    description: String,
    category: String,
    cost: Number,
    price: Number,
    offer: Number,
    image: String,
    imageAlt: String,
    stock: Number,
    stockTalles: String,
    featured: Boolean,
    activated: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);