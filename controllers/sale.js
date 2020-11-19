'use strict'

var Sale = require('../models/sale');
var fs = require('fs');
var path = require('path');
var app = require('../app');

var controller = {
    
    saveSale: function(req, res){

        var sale = new Sale();
        var params = req.body;

        sale.date = params.date;
        sale.products = params.products;
        sale.nameClient = params.nameClient;
        sale.phoneClient = params.phoneClient;
        sale.emailClient = params.emailClient;
        sale.shipping = params.shipping;
        sale.address = params.address;
        sale.pay = params.pay;
        sale.total = params.total;
        sale.status = params.status;

        sale.save((err, saleStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el saleo.'})
            if(!saleStored) return res.status(404).send({message: 'No se ha podido guardar el saleo'})
            return res.status(200).send({sale: saleStored});
        });
    },

    getSale: function(req, res){
        var saleId = req.params.id;
        if(saleId === null) return res.status(404).send({message: 'El saleo no existe.'});

        Sale.findById(saleId, (err, sale) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!sale) return res.status(404).send({message: 'El saleo no existe'});

            return res.status(200).send({sale});
        })
    },

    getSales: function(req, res){
        Sale.find({}).sort('-nameClient').exec((err, sales) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!sales) return res.status(404).send({message: 'No hay saleos para mostrar'});
            
            return res.status(200).send({sales});
        })
    },

    
    updateSale: function(req, res){
        var saleId = req.params.id;
        var update = req.body;

        Sale.findByIdAndUpdate(saleId, update, {new:true}, (err, saleUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!saleUpdated) return res.status(404).send({message: 'No existe el saleo ha actualizar'});
            return res.status(200).send({
                sale: saleUpdated
            })
        });
    },

    deleteSale: function(req, res){
        var saleId = req.params.id;
        
        Sale.findByIdAndRemove(saleId, (err, saleRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar el saleo'});
            
            if(!saleRemoved) return res.status(404).send({message: 'No se puede eliminar ese saleo'});

            return res.status(200).send({
                sale: saleRemoved
            });
        });
    },
}

module.exports = controller;