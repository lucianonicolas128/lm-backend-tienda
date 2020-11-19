'use strict'

var express = require('express');
var PreferencesController = require('../controllers/preferences');
var routerPreferences = express.Router();

routerPreferences.post('/save-preferences', PreferencesController.savePreferences);
routerPreferences.get('/preferences/:id', PreferencesController.getPreferences);
routerPreferences.get('preferenceses', PreferencesController.getPreferenceses);
routerPreferences.put('/preferences/:id', PreferencesController.updatePreferences);

module.exports = routerPreferences;