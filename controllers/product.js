'use strict'

var Product = require('../models/product');
// var fs = require('fs');
var path = require('path');

var controller = {

    saveProduct: function (req, res, next) {
        var product = new Product();
        var params = req.body;

        product.name = params.name;
        product.description = params.description;
        product.product = params.product;
        product.category = params.category;
        product.cost = params.cost;
        product.price = params.price;
        product.offer = params.offer;
        product.stock = params.stock;
        product.image = params.image;
        product.imageAlt = params.imageAlt;
        product.stockTalles = params.stockTalles;
        product.featured = params.featured;
        product.activated = params.activated;

        product.save((err, productStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el producto.' })
            if (!productStored) return res.status(404).send({ message: 'No se ha podido guardar el producto' })
            return res.status(200).send({ product: productStored });
        });
    },
    
    getProduct: function (req, res) {
        var productId = req.params.id;
        if (productId === null) return res.status(404).send({ message: 'El producto no existe.' });

        Product.findById(productId, (err, product) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!product) return res.status(404).send({ message: 'El producto no existe' });
            return res.status(200).send({ product });
        })
    },

    getProducts: function (req, res) {
        Product.find({}).sort('-product').exec((err, products) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!products) return res.status(404).send({ message: 'No hay productos para mostrar' });
            return res.status(200).send({ products });
        })
    },


    updateProduct: function (req, res) {
        var productId = req.params.id;
        var update = req.body;

        Product.findByIdAndUpdate(productId, update, { new: true }, (err, productUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!productUpdated) return res.status(404).send({ message: 'No existe el producto ha actualizar' });
            return res.status(200).send({
                product: productUpdated
            })
        });
    },

    deleteProduct: function (req, res) {
        var productId = req.params.id;

        Product.findByIdAndRemove(productId, (err, productRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el producto' });
            if (!productRemoved) return res.status(404).send({ message: 'No se puede eliminar ese producto' });
            return res.status(200).send({
                product: productRemoved
            });
        });
    },
    
    uploadImage: function async (req, res) {

        var productId = req.params.id;
        var fileName = 'Imagen no subida...';
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        Product.findByIdAndUpdate(productId, { image: file_path }, {new: true}, (err, productUpdated) => {
            if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
            
            if(!productUpdated){        
                res.status(404).send({message: 'No se ha podido actualizar el album'});
            }

            productUpdated.image = file_path;
            return res.status(200).send({
                product: productUpdated
            });
            }
        )
    }

}

module.exports = controller;