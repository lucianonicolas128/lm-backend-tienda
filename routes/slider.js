'use strict'

// imports & requires
var express = require('express');
var SliderController = require('../controllers/slider');
var routerSlider = express.Router();

// routes
routerSlider.post('/save-slider', SliderController.saveSlider);
routerSlider.get('/slider/:id', SliderController.getSlider);
routerSlider.get('/sliders', SliderController.getSliders);
routerSlider.put('/slider/:id', SliderController.updateSlider);
routerSlider.delete('/slider/:id', SliderController.deleteSlider);

module.exports = routerSlider;