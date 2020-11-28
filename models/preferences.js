'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PreferencesSchema = Schema({
	nameCommerce: String,
	descriptionCommerce: String,
	
	nameBankAccount: String,
	CBUBank: Number,
	boxTypeBank: String,
	nameBank: String,

	terminosYCondiciones: String,

	phoneContact: String,
	emailContact: String,
	ubicationContact: String,
	facebook: String,
	instagram: String,
	twitter: String,
	linkedin: String,
	firstColor: String,
	secondColor: String,
	imageBanner: String,
	
})

module.exports = mongoose.model('Preferences', PreferencesSchema);