const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');
// Endpoint para mostrar todos los estudiantes
router.get('/', isLoggedIn, async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});
// Endpoint que permite mostrar el formulario para actualizar un estudiante
router.get('/actualizar/:idestudiante', isLoggedIn,async (request, response) => {
    try {
        const { idestudiante } = request.params;
        const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
        const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
        response.render('estudiantes/actualizar', { estudiante, lstCarreras });
    } catch (error) {
        console.error('Error al obtener el estudiante por ID', error);
        // Maneja el error según tu lógica
    }
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', isLoggedIn,async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});

// Endpoint para agregar un estudiante
router.post('/agregar',isLoggedIn, async(request, response) => {
    // Falta agregar logica
    try {
        const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
        const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

        const resultado = await queries.insertarEstudiante(nuevoEstudiante);

        if (resultado) {
            request.flash('error', 'Ocurrió un problema al guardar el registro ');
            console.log('ok');
        } else {
            request.flash('success', 'Registro insertado con éxito');
            console.log('ok1');
        }

        response.redirect('/estudiantes');
    } catch (error) {
        console.error(error);
        request.flash('error', 'Ocurrió un error inesperado');
        response.redirect('/estudiantes');
    }
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante',isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para actualizar un estudiante
router.get('/actualizar/:idestudiante',isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('estudiantes/actualizar', { estudiante, lstCarreras });
});

// Endpoint para actualizar un estudiante
router.post('/actualizar/:idestudiante',isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.actualizarEstudiante(idestudiante, nuevoEstudiante);

    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }
    response.redirect('/estudiantes');
});

module.exports = router;

