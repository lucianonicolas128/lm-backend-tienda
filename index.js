'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://lucianonicolas:nosleep.14@cluster0.bzoab.gcp.mongodb.net/catita?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://lmestudio:nosleep.14@cluster0.dtg6a.mongodb.net/lmshop?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");

        	// Creacion del servidor
        	app.listen(process.env.PORT || port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
            });
            
            return null;

        })
		.catch(err => console.log(err));


		// app.set('port', process.env.PORT);
		
		// app.listen(app.get('port'), () =>{
		// 	console.log(`server on port ${app.get('port')}`)
		// })
		
// mongoose.connect('mongodb://localhost:27017/levelapp' ,{ useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
// 	console.log("Conexión a la base de datos establecida satisfactoriamente...");

// 	// Creacion del servidor
// 	app.listen(port, () => {
// 		console.log("Servidor corriendo correctamente en la url: localhost:3700");
// 	});

// })
// .catch(err => console.log(err));