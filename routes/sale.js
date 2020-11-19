'use strict'

var express = require('express');
var SaleController = require('../controllers/sale');
var routerSale = express.Router();
var crypto = require('crypto');
var multer = require('multer');

routerSale.post('/save-sale', SaleController.saveSale);
routerSale.get('/sale/:id?', SaleController.getSale);
routerSale.get('/sales', SaleController.getSales);
routerSale.put('/sale/:id', SaleController.updateSale);
routerSale.delete('/sale/:id', SaleController.deleteSale);

module.exports = routerSale; 