'use strict'

// Requires and imports
var express = require('express');
var CategoryController = require('../controllers/category');
require('../cloudinary.config');
var upload = require('../multer');
var routerCategory = express.Router();

// Routes
routerCategory.post('/save-category', CategoryController.saveCategory);
routerCategory.get('/category/:id', CategoryController.getCategory);
routerCategory.get('/categories', CategoryController.getCategories);
routerCategory.put('/category/:id', CategoryController.updateCategory);
routerCategory.delete('/category/:id', CategoryController.deleteCategory);

routerCategory.post('/image-upload/:id', upload.single("image"), CategoryController.uploadImage);


module.exports = routerCategory;