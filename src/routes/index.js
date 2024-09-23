//este archivo sera utilizado para configurar todas las rutas principales del sistema 
const express = require ('express');
const router = express.Router();
const estudianteRepository = require('../Repositories/EstudianteRepository');

// configura la ruta inicial de la app 
router.get('/',async(Request,response) =>{
    //probando conexion con la db
    const lstEstudiante = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('listado',lstEstudiante);

    response.send('Bienvenido al laboratorio de IMPS');

});

module.exports = router;