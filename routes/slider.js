'use strict'

// imports & requires
var express = require('express');
var SliderController = require('../controllers/slider');
var routerSlider = express.Router();
require('../cloudinary.config');
var upload = require('../multer');

// routes
routerSlider.post('/save-slider', SliderController.saveSlider);
routerSlider.get('/slider/:id', SliderController.getSlider);
routerSlider.get('/sliders', SliderController.getSliders);
routerSlider.put('/slider/:id', SliderController.updateSlider);
routerSlider.delete('/slider/:id', SliderController.deleteSlider);
routerSlider.post('/image-upload-slider/:id', upload.single("image"), SliderController.uploadImage);


module.exports = routerSlider;