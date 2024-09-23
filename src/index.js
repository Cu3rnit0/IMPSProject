const express = require('express');

//Inicializaciones 
const app = express();
 
// Ajuste del servidor 
app.set('port',process.env.PORT || 4000);

//INICIAR SERIVDOR 
app.listen(app.get('port'),()=> {
    console.log('SERVIDOR INICIADO EN EL PUERTO:',app.get('port'));
});
