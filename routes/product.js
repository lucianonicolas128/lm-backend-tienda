'use strict'

// imports & requires
var express = require('express');
var ProductController = require('../controllers/product');
require('../cloudinary.config');
var upload = require('../multer');
var routerProduct = express.Router(); 

// routes
routerProduct.post('/save-product', ProductController.saveProduct);
routerProduct.get('/product/:id?', ProductController.getProduct);
routerProduct.get('/products', ProductController.getProducts);
routerProduct.get('/products/:category', ProductController.getProductsCategory);
routerProduct.put('/product/:id', ProductController.updateProduct);
routerProduct.delete('/product/:id', ProductController.deleteProduct);
routerProduct.post('/image-upload-product/:id', upload.single("image"), ProductController.uploadImage);

module.exports = routerProduct;
