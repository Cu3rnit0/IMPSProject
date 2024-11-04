const express = require('express');
const router = express.Router();
const materiaRepository = require('../repositories/MateriasRepository');
const { isLoggedIn } = require('../lib/auth');
// Obtener todas las materias
router.get('/',  isLoggedIn, async (request, response) => {
    const materias = await materiaRepository.obtenerTodasLasMaterias();
    response.render('materias/listado', { materias });
});

// Mostrar formulario para agregar una nueva materia
router.get('/agregar',  isLoggedIn, (request, response) => {
    response.render('materias/agregar');
});

// Agregar una nueva materia
router.post('/agregar',  isLoggedIn, async (request, response) => {
    const { idMateria, materia } = request.body;
    const nuevaMateria = { idMateria, materia };
    const resultado = await materiaRepository.insertarMateria(nuevaMateria);

    if (resultado) {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
    } else {
        request.flash('success', 'Registro insertado con exito');
    }
    response.redirect('/materias');
});

// Mostrar formulario para actualizar una materia
router.get('/actualizar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    response.render('materias/actualizar', { materia });
});

// Actualizar una materia
router.post('/actualizar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const { materia } = request.body;
    const nuevaMateria = { materia };

    const resultado = await materiaRepository.actualizarMateria(idMateria, nuevaMateria);

    if(resultado){
        request.flash('success', 'Registro actualizado con exito');
     } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
     }

    response.redirect('/materias');
});
router.get('/actualizar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    console.log('Materia a actualizar:', materia); // Verifica si la materia se obtiene correctamente
    response.render('materias/actualizar', { materia });
});

// Eliminar una materia
router.get('/eliminar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const resultado = await materiaRepository.eliminarMateria(idMateria);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/materias');
});

module.exports = router;
