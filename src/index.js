const express = require('express');

//Inicializaciones 
const app = express();
 
require('dotenv').config()

// Ajuste del servidor 
app.set('port',process.env.PORT || 4500);

//configuracion de rutas 
app.use(require('./routes')); 

//INICIAR SERIVDOR 
app.listen(app.get('port'),()=> {
    console.log('SERVIDOR INICIADO EN EL PUERTO:',app.get('port'));
});
