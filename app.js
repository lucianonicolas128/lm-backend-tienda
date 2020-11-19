'use strict'
// Imports
var express = require('express');
var bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2
var app = express();

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cargar archivos de Rutas
var products_routes = require('./routes/product');
var categories_routes = require('./routes/category');
var slider_routes = require('./routes/slider');
var preferences_routes = require('./routes/preferences');
var sale_routes = require('./routes/sale');
var talles_routes = require('./routes/talles');

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use('/api', products_routes);
app.use('/api', categories_routes);
app.use('/api', slider_routes);
app.use('/api', preferences_routes);
app.use('/api', sale_routes);
app.use('/api', talles_routes);

// Exportar
module.exports = app;