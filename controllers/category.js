'use strict'

var Category = require('../models/category');
var fs = require('fs');
var path = require('path');
const cloudinary = require('cloudinary').v2;

// var imageUrlCategory;

var controller = {
    saveCategory: function (req, res) {
        var category = new Category();
        var params = req.body;

        category.name = params.name;
        category.image = params.image;

        category.save((err, categoryStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar la categoria.' })
            if (!categoryStored) return res.status(404).send({ message: 'No se ha podido guardar la categoria' })
            return res.status(200).send({ category: categoryStored });
        });
    },

    getCategory: function (req, res) {
        var categoryId = req.params.id;
        if (categoryId == null) return res.status(404).send({ message: 'La categoria no existe.' });

        Category.findById(categoryId, (err, category) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!category) return res.status(404).send({ message: 'La categoria no existe' });

            return res.status(200).send({ category });
        })
    },


    getCategories: function (req, res) {
        Category.find({}).sort('-name').exec((err, categories) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!categories) return res.status(404).send({ message: 'No hay categorias para mostrar' });

            return res.status(200).send({ categories });
        })
    },


    updateCategory: function (req, res) {
        var categoryId = req.params.id;
        var update = req.body;

        Category.findByIdAndUpdate(categoryId, update, { new: true }, (err, categoryUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!categoryUpdated) return res.status(404).send({ message: 'No existe la categoria ha actualizar' });
            return res.status(200).send({
                category: categoryUpdated
            })
        });
    },


    deleteCategory: function (req, res) {
        var categoryId = req.params.id;

        Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar la categoria' });

            if (!categoryRemoved) return res.status(404).send({ message: 'No se puede eliminar esa categoria' });

            return res.status(200).send({
                category: categoryRemoved
            });
        });
    },

    uploadImage: function async (req, res) {

        var categoryId = req.params.id;
        var fileName = 'Imagen no subida...';
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        Category.findByIdAndUpdate(categoryId, { image: file_path }, {new: true}, (err, categoryUpdated) => {
            console.log('asdkajdlkjaslkdj');
            if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
            
            if(!categoryUpdated){        
                res.status(404).send({message: 'No se ha podido actualizar el album'});
            }

            categoryUpdated.image = file_path;
            return res.status(200).send({
                category: categoryUpdated
            });
            }
        )

        // console.log(req.file);
        // const image = {};
        // image.url = req.file.url;
        // image.id = req.file.public_id;
        // image.path = req.file.path;
        // console.log(req.file.path);

        // Image.create(image)
        // .then(newImage => res.json(newImage))
        // .catch(err => console.log(err));
    }
}


module.exports = controller;