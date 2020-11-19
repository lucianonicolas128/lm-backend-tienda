'use strict'


var Talle = require('../models/talles');
var fs = require('fs');
var path = require('path');

var controller = {
    saveTalle: function(req, res){
        var talle = new Talle();
        var params = req.body;

        talle.talleName = params.talleName;
        talle.ancho = params.ancho;
        talle.alto = params.alto;
        talle.detalle = params.detalle;


        talle.save((err, talleStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar la imagen.'})
            if(!talleStored) return res.status(404).send({message: 'No se ha podido guardar la imagen'})
            return res.status(200).send({talle: talleStored});
        });
    },
    
    getTalle: function(req, res){
        var talleId = req.params.id;
        if(talleId === null) return res.status(404).send({message: 'La imagen no existe.'});

        Talle.findById(talleId, (err, talle) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!talle) return res.status(404).send({message: 'La imagen no existe'});

            return res.status(200).send({talle});
        })
    },

    
    getTalles: function(req, res){
        Talle.find({}).sort('-talle').exec((err, talles) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!talles) return res.status(404).send({message: 'No hay imagenes para mostrar'});
            
            return res.status(200).send({talles});
        })
    },
    
    updateTalle: function(req, res){
        var talleId = req.params.id;
        var update = req.body;

        Talle.findByIdAndUpdate(talleId, update, {new:true}, (err, talleUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!talleUpdated) return res.status(404).send({message: 'No existe la imagen ha actualizar'});
            return res.status(200).send({
                talle: talleUpdated
            })
        });
    },
    
    deleteTalle: function(req, res){
        var talleId = req.params.id;
        
        Talle.findByIdAndRemove(talleId, (err, talleRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar la imagen'});
            
            if(!talleRemoved) return res.status(404).send({message: 'No se puede eliminar esa categoria'});

            return res.status(200).send({
                talle: talleRemoved
            });
        });
    },

}

module.exports = controller;