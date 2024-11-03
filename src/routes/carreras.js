const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Consulta para obtener todos las carreras
router.get('/', isLoggedIn, async (request, response) => {
    const carreras = await queries.obtenerTodosLasCarreras();
    response.render('carrera/listado', { carreras });
});

// Mostrar formulario para agregar una nueva carrera
router.get('/agregar', isLoggedIn, (request, response) => {
    response.render('carrera/agregar');
});

// Agregar una nueva carrera
router.post('/mantenimiento', isLoggedIn, async (request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };
    const resultado = await queries.insertarCarrera(nuevaCarrera);

    if (resultado) {
        request.flash('error', 'Ocurrió un problema al guardar el registro ');
        console.log('ok');
    } else {
        request.flash('success', 'Registro insertado con éxito');
        console.log('ok1');
    }

    response.redirect('/carreras');
});

router.get('/actualizar/:idcarrera', isLoggedIn, async (request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);
    response.render('carreras/actualizar', { carrera }); // Cambia 'carrera' a 'carreras'
});

// Actualizar una carrera
router.post('/actualizar/:idcarrera', isLoggedIn, async (request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    const nuevaCarrera = { carrera };

    const resultado = await queries.actualizarCarrera(idcarrera, nuevaCarrera);

    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }

    response.redirect('/carreras');
});


// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el 
    idcarrera
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/carreras');
});


module.exports = router;
