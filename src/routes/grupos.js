const express = require("express");
const router = express.Router();
const queries = require("../repositories/GrupoRepository");
const materiasQuery = require("../repositories/MateriasRepository"); // Agregado
const estudiantesQuery = require("../repositories/EstudianteRepository");
const profesoresQuery = require("../repositories/ProfesoresRepository"); // Agregado
const axios = require("axios"); // Asegúrate de tener instalada la librería 'axios'
const GrupoRepository = require("../repositories/GrupoRepository");
const { isLoggedIn } = require('../lib/auth');
router.get("/",  isLoggedIn, async (request, response) => {
  try {
    const grupos = await queries.obtenerTodosLosGrupos();
    response.render("grupos/listado", { grupos });
  } catch (error) {
    response.status(500).send("Ocurrió un error al obtener los grupos");
  }
});

router.get("/agregar",  isLoggedIn, async (request, response) => {
  try {
    // Obtener lista de materias y profesores
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
    response.render("grupos/agregar", { lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de agregar");
  }
});

router.post("/agregar",  isLoggedIn, async (request, response) => {
  try {
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idMateria, idProfesor };
    await queries.insertarGrupo(nuevoGrupo);
    response.redirect("/grupos");
    
  } catch (error) {
    response.status(500).send("Ocurrió un error al agregar el grupo");
  }
});

router.get("/grupos/actualizar/:idgrupo",  isLoggedIn, async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    const lstMaterias = await materiasRepository.obtenerTodasLasMaterias();
    const lstProfesores =
      await profesoresRepository.obtenerTodosLosProfesores();
    console.log("ID de la Materia:", grupo.idMateria);
    console.log("ID del Profesor:", grupo.idProfesor);
    response.render("actualizar", { grupo, lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de modificar");
  }
});

router.post("/grupos/actualizar/:idgrupo",  isLoggedIn, async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idMateria, idProfesor } = request.body;

    const actualizacionGrupo = {
      num_grupo,
      anio,
      ciclo,
      idMateria,
      idProfesor,
    };
    await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al modificar el grupo");
  }
});

router.get("/eliminar/:idgrupo",  isLoggedIn, async (request, response) => {
  try {
    const { idgrupo } = request.params;
    await queries.eliminarGrupo(idgrupo);
    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al eliminar el grupo");
  }
});

router.post("/detalles/:idgrupo",  isLoggedIn, async (request, response) => {
  try {
    

    response.redirect(`/grupos/detalles/${request.params.idgrupo}`);
  } catch (error) {
    response.status(500).send("Ocurrió un error al procesar la acción del formulario");
  }
});


router.get("/detalles/:idgrupo",  isLoggedIn, async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const detallesGrupo = await queries.obtenerDetallesGrupo(idgrupo);
    
    response.render("grupos/detalles", { detallesGrupo });
  } catch (error) {
    response.status(500).send("Ocurrió un error al obtener los detalles del grupo");
  }
});

// Enpoint que permite navegar a la pantalla para asignar un grupo
router.get("/asignargrupo/:idgrupo",  isLoggedIn, async (request, reponse) => {
  const { idgrupo } = request.params;
  // Consultamos el listado de estudiantes disponible
  const lstEstudiantes = await estudiantesQuery.obtenerTodosLosEstudiantes();
  reponse.render("grupos/asignargrupo", { lstEstudiantes, idgrupo });
});
// Endpoint que permite asignar un grupo
router.post("/asignargrupo",  isLoggedIn, async (request, response) => {
  const data = request.body;
  let resultado = null;
  const result = processDataFromForm(data);
  for (const tmp of result.grupo_estudiantes) {
    //const asignacion = [tmp.idgrupo, tmp.idestudiante];
    //const { idgrupo, idestudiante } = tmp;
    //const asignacionObj = {idgrupo, idestudiante};
    resultado = await queries.asignarGrupo(tmp);
  }
  if (result) {
    request.flash("success", "Asignacion de grupo realizada con exito");
  } else {
    request.flash("error", "Ocurrio un problema al realizar asignacion");
  }
  response.redirect("/grupos");
});
// Función para procesar los datos del formulario
function processDataFromForm(data) {
  const result = {
    grupo_estudiantes: [],
  };
  for (const key in data) {
    if (key.startsWith("grupo_estudiantes[")) {
      const match = key.match(/\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = parseInt(match[1]);
        const property = match[2];
        if (!result.grupo_estudiantes[index]) {
          result.grupo_estudiantes[index] = {};
        }
        result.grupo_estudiantes[index][property] = data[key];
      }
    } else {
      result[key] = data[key];
    }
  }
  return result;
}



module.exports = router;
