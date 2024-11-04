const express = require('express');
const router = express.Router();
const profesoresRepository = require('../repositories/ProfesoresRepository');
const { isLoggedIn } = require('../lib/auth');
// Agrega esta función para formatear la fecha
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Obtener todos los profesores
router.get('/',  isLoggedIn, async (request, response) => {
    const profesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores });
});

// Mostrar formulario para agregar un nuevo profesor
router.get('/agregar',  isLoggedIn, (request, response) => {
    
    response.render('profesores/agregar');
});

// Agregar un nuevo profesor
router.post('/agregar',  isLoggedIn, async (request, response) => {
    const { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email };
    const resultado = await profesoresRepository.insertarProfesor(nuevoProfesor);


    response.redirect('/profesores');
    
});

// Mostrar formulario para actualizar un profesor
router.get('/actualizar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const profesor = await profesoresRepository.obtenerProfesorPorId(idProfesor);
    response.render('profesores/actualizar', { profesor, messages: request.flash() });
});

// Actualizar un profesor
router.post('/actualizar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const { profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { profesor, apellido, fechanacimiento, profesion, genero, email };

    const resultado = await profesoresRepository.actualizarProfesor(idProfesor, nuevoProfesor);
    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }

    response.redirect('/profesores');
});

// Eliminar un profesor
router.get('/eliminar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const resultado = await profesoresRepository.eliminarProfesor(idProfesor);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/profesores');
});

module.exports = router;
