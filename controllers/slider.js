'use strict'


var Slider = require('../models/slider');
var fs = require('fs');
var path = require('path');

var controller = {
    saveSlider: function(req, res){
        var slider = new Slider();
        var params = req.body;

        slider.name = params.name;
        slider.image = params.image;

        slider.save((err, sliderStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar la imagen.'})
            if(!sliderStored) return res.status(404).send({message: 'No se ha podido guardar la imagen'})
            return res.status(200).send({slider: sliderStored});
        });
    },
    
    getSlider: function(req, res){
        var sliderId = req.params.id;
        if(sliderId === null) return res.status(404).send({message: 'La imagen no existe.'});

        Slider.findById(sliderId, (err, slider) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!slider) return res.status(404).send({message: 'La imagen no existe'});

            return res.status(200).send({slider});
        })
    },

    
    getSliders: function(req, res){
        Slider.find({}).sort('-name').exec((err, sliders) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!sliders) return res.status(404).send({message: 'No hay imagenes para mostrar'});
            
            return res.status(200).send({sliders});
        })
    },
    
    updateSlider: function(req, res){
        var sliderId = req.params.id;
        var update = req.body;

        Slider.findByIdAndUpdate(sliderId, update, {new:true}, (err, sliderUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!sliderUpdated) return res.status(404).send({message: 'No existe la imagen ha actualizar'});
            return res.status(200).send({
                slider: sliderUpdated
            })
        });
    },
    
    deleteSlider: function(req, res){
        var sliderId = req.params.id;
        
        Slider.findByIdAndRemove(sliderId, (err, sliderRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar la imagen'});
            
            if(!sliderRemoved) return res.status(404).send({message: 'No se puede eliminar esa categoria'});

            return res.status(200).send({
                slider: sliderRemoved
            });
        });
    },
    
    uploadImage: function async (req, res) {

        var sliderId = req.params.id;
        var fileName = 'Imagen no subida...';
        var file_path = req.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        Slider.findByIdAndUpdate(sliderId, { image: file_path }, {new: true}, (err, sliderUpdated) => {
            if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
            
            if(!sliderUpdated){        
                res.status(404).send({message: 'No se ha podido actualizar el album'});
            }

            sliderUpdated.image = file_path;
            return res.status(200).send({
                slider: sliderUpdated
            });
            }
        )
    }

}

module.exports = controller;