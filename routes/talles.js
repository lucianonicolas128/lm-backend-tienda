'use strict'

// imports & requires
var express = require('express');
var TalleController = require('../controllers/talles');
var routerTalles = express.Router();

// routes
routerTalles.post('/save-talle', TalleController.saveTalle);
routerTalles.get('/talle/:id', TalleController.getTalle);
routerTalles.get('/talles', TalleController.getTalles);
routerTalles.put('/talle/:id', TalleController.updateTalle);
routerTalles.delete('/talle/:id', TalleController.deleteTalle);

module.exports = routerTalles;