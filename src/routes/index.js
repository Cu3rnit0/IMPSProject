// Este archivo sera utilizado para configurar todas las rutas principales
const express = require('express');
const router = express.Router();
const estudiantesRepository = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const profesoresRepository = require('../repositories/ProfesoresRepository');
const materiasRepository = require('../repositories/MateriasRepository'); // Agregado
const grupoRepository = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriasRepository'); // Agregado
const profesoresQuery = require('../repositories/ProfesoresRepository'); // Agregado
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (request,response) => {
    response.render('home/home');
    });

// Mostrar todos los estudiantes
router.get('/',  isLoggedIn, async (request, response) => {
    const estudiantes = await estudiantesRepository.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes });
});

// Mostrar formulario para agregar un nuevo estudiante
router.get('/agregar',  isLoggedIn, async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('estudiantes/agregar', { lstCarreras });
});

// Agregar un estudiante
router.post('/agregar',  isLoggedIn, async(request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    const resultado = await estudiantesRepository.insertarEstudiante(nuevoEstudiante);
    response.redirect('/estudiantes');
});

// Eliminar un estudiante
router.get('/eliminar/:idestudiante',  isLoggedIn, async(request, response) => {
    const { idestudiante } = request.params;
    const resultado = await estudiantesRepository.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});
// Mostrar formulario para actualizar un estudiante
router.get('/actualizar/:idestudiante',  isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await estudiantesRepository.obtenerEstudiantePorId(idestudiante);
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('estudiantes/actualizar', { estudiante, lstCarreras });
});

// Actualizar un estudiante
router.post('/actualizar/:idestudiante',  isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { nombre, apellido, email, idcarrera, usuario };

    const resultado = await estudiantesRepository.actualizarEstudiante(idestudiante, nuevoEstudiante);

    if (resultado) {
        console.log('Estudiante actualizado con éxito');
    }
    response.redirect('/estudiantes');
});

// Mostrar todos las carreras
router.get('/carreras',  isLoggedIn, async (request, response) => {
    const carreras = await carrerasQuery.obtenerTodosLasCarreras();
    response.render('carreras/listado', { carreras });
});

// Mostrar formulario para agregar una nueva carrera
router.get('/carreras/agregar',  isLoggedIn, (request, response) => {
    response.render('carreras/agregar');
});

// Agregar una carrera
router.post('/carreras/agregar',  isLoggedIn, async(request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };
    const resultado = await carrerasQuery.insertarCarrera(nuevaCarrera);
    response.redirect('/carreras');
});

// Eliminar una carrera
router.get('/carreras/eliminar/:idcarrera',  isLoggedIn, async(request, response) => {
    const { idcarrera } = request.params;
    const resultado = await carrerasQuery.eliminarCarrera(idcarrera);
    if(resultado > 0){
        console.log('Carrera eliminada con éxito');
    }
    response.redirect('/carreras');
});


router.get('/profesores',  isLoggedIn, async (request, response) => {
    const profesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores });
});

router.get('/profesores/agregar',  isLoggedIn, (request, response) => {
    response.render('profesores/agregar');
});

router.post('/profesores/agregar',  isLoggedIn, async (request, response) => {
    const { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idProfesor, profesor, apellido, fechanacimiento, profesion, genero, email };
    const resultado = await profesoresRepository.insertarProfesor(nuevoProfesor);
    response.redirect('/profesores');
});


router.get('/actualizar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const profesor = await profesoresRepository.obtenerProfesorPorId(idProfesor);
    response.render('profesores/actualizar', { profesor });
});

router.post('/actualizar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const { profesor } = request.body;
    const nuevoProfesor = { profesor };

    const resultado = await profesoresRepository.actualizarProfesor(idProfesor, nuevoProfesor);

    response.redirect('/profesores');
});

router.get('/eliminar/:idProfesor',  isLoggedIn, async (request, response) => {
    const { idProfesor } = request.params;
    const resultado = await profesoresRepository.eliminarProfesor(idProfesor);
    if (resultado > 0) {
        console.log('Profesor eliminado con éxito');
    }
    response.redirect('/profesores');
});


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
    response.redirect('/materias');
});



router.get('/actualizar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    console.log('ID de la Materia:', idMateria); // Verifica si el ID se obtiene correctamente
    const materia = await materiaRepository.obtenerMateriaPorId(idMateria);
    response.render('materias/actualizar', { materia });
});


// Actualizar una materia
router.post('/actualizar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const { materia } = request.body;
    const nuevaMateria = { materia };

    const resultado = await materiaRepository.actualizarMateria(idMateria, nuevaMateria);

    response.redirect('/materias');
});

// Eliminar una materia
router.get('/eliminar/:idMateria',  isLoggedIn, async (request, response) => {
    const { idMateria } = request.params;
    const resultado = await materiaRepository.eliminarMateria(idMateria);
    if (resultado > 0) {
        console.log('Materia eliminada con éxito');
    }
    response.redirect('/materias');
});
// Obtener todos los grupos
router.get('/grupos',  isLoggedIn, async (request, response) => {
    const grupos = await grupoRepository.obtenerTodosLosGrupos();
    response.render('grupos/listado', { grupos });
});

// Mostrar formulario para agregar un nuevo grupo
router.get('/grupos/agregar',  isLoggedIn, async(request, response) => {
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();  // Cambiado de materiasQuery a materiasRepository
    const lstProfesores = await profesoresRepository.obtenerTodosLosProfesores();
    response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Agregar un grupo
router.post('/grupos/agregar',  isLoggedIn, async(request, response) => {
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };
    const resultado = await grupoRepository.insertarGrupo(nuevoGrupo);  // Cambiado de queries a grupoRepository
    response.redirect('/grupos');
});

// Actualizar un grupo
router.post('/grupos/actualizar/:idgrupo',  isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const actualizacionGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };

    const resultado = await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect('/grupos');
});

router.get('/grupos/actualizar/:idgrupo',  isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    console.log("mira la wea del objeto grupo : " + grupo.idMateria + " profesor¨: " + grupo.idProfesor);
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresRepository.obtenerTodosLosProfesores();
    console.log("Lista de Materias:", lstMaterias);
    console.log("Lista de Profesores:", lstProfesores);
    response.render('grupos/actualizar', { grupo, lstMaterias, lstProfesores });
});

// Eliminar un grupo
router.get('/grupos/eliminar/:idgrupo',  isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    const resultado = await grupoRepository.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        console.log('Grupo eliminado con éxito');
    }
    response.redirect('/grupos');
});

//Asignar
// ... (otras importaciones y configuraciones)

router.post('/grupos/asignar',  isLoggedIn, async (req, res) => {
    try {
        const idgrupo = req.body.idgrupo;
        const alumnos = JSON.parse(req.body.alumnos);

        // Primero, puedes realizar alguna validación o procesamiento de los datos.

        // Luego, puedes insertar los alumnos en el grupo en tu base de datos.
        for (const alumno of alumnos) {
            const idestudiante = alumno.idEstudiante;

            // Aquí puedes utilizar tu función de inserción de estudiantes en grupos.
            // Por ejemplo, si tienes una función llamada `insertarEstudianteEnGrupo` en tu repositorio,
            // podrías usarla de la siguiente manera:

            const exito = await queries.insertarEstudianteEnGrupo(idestudiante, idgrupo);

            if (!exito) {
                console.error(`Error al asignar estudiante ${idestudiante} al grupo ${idgrupo}`);
                // Aquí puedes manejar el error de alguna manera.
            }
        }

        // Una vez completada la asignación, puedes redirigir o enviar una respuesta JSON, según tu aplicación.
        res.redirect('/grupos'); // Por ejemplo, puedes redirigir de vuelta a la lista de grupos.
    } catch (error) {
        console.error('Error al procesar la asignación de alumnos:', error);
        res.status(500).send('Ocurrió un error al asignar alumnos al grupo');
    }
});


router.get('/grupos/asignar/:idgrupo',  isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    // Obtener todos los estudiantes
    const estudiantes = await estudiantesRepository.obtenerTodosLosEstudiantes();
    response.render('grupos/asignar', { idgrupo, estudiantes });
});


module.exports = router;
