const pool = require('../config/dabaBaseContoller');

module.exports ={
    obtenerTodosLosGrupos: async () => {
        try {
          const result = await pool.query("SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo, m.materia, p.profesor FROM grupos g JOIN materias m ON g.idMateria = m.idMateria JOIN profesores p ON g.idProfesor = p.idProfesor");
          return result;
        } catch (error) {
          console.error(
            "Ocurrió un problema al consultar la lista de grupos: ",
            error
          );
          throw error;
        }
      },
    
      eliminarGrupo: async (idgrupo) => {
        try {
          const result = await pool.query("DELETE FROM grupos WHERE idgrupo = ?", [
            idgrupo,
          ]);
          return result.affectedRows > 0;
        } catch (error) {
          console.error("Error al eliminar el registro", error);
          throw error;
        }
      },
    
      insertarGrupo: async (nuevogrupo) => {
        try {
          const result = await pool.query("INSERT INTO grupos SET ?", nuevogrupo);
          return result.insertId;
        } catch (error) {
          console.error("Error al insertar el registro", error);
          throw error;
        }
      },
    
      actualizarGrupo: async (idgrupo, actualizacion) => {
        try {
          const resultado = await pool.query(
            "UPDATE grupos SET ? WHERE idgrupo = ?",
            [actualizacion, idgrupo]
          );
          return resultado.affectedRows > 0;
        } catch (error) {
          console.log("Error al actualizar grupo", error);
          throw error;
        }
      },
    
      obtenerGrupoPorID: async (idgrupo) => {
        try {
          const [grupo] = await pool.query(
            "SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo, m.materia, p.  FROM grupos g JOIN materias m ON g.idMateria = m.idMateria JOIN profesores p ON g.idProfesor = p.idProfesor WHERE idgrupo = ?",
            [idgrupo]
          );
          
          return grupo;
        } catch (error) {
          console.log(
            "Ocurrió un problema al obtener información del grupo",
            error
          );
          throw error;
        }
      },
      obtenerTodosLosGrupos: async () => {
        try {
          const result = await pool.query("SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo, m.materia, p.profesor FROM grupos g JOIN materias m ON g.idMateria = m.idMateria JOIN profesores p ON g.idProfesor = p.idProfesor");
          return result;
        } catch (error) {
          console.error(
            "Ocurrió un problema al consultar la lista de grupos: ",
            error
          );
          throw error;
        }
      },
    
      actualizarGrupo: async (idgrupo, actualizacion) => {
        try {
          const resultado = await pool.query(
            "UPDATE grupos SET ? WHERE idgrupo = ?",
            [actualizacion, idgrupo]
          );
          return resultado.affectedRows > 0;
        } catch (error) {
          console.log("Error al actualizar grupo", error);
          throw error;
        }
      },
    
      obtenerGrupoPorID: async (idgrupo) => {
        try {
          const [grupo] = await pool.query(
            "SELECT * FROM grupos WHERE idgrupo = ?",
            [idgrupo]
          );
          return grupo;
        } catch (error) {
          console.log(
            "Ocurrió un problema al obtener información del grupo",
            error
          );
          throw error;
        }
      },
      // Obtener la lista de todos los estudiantes
      obtenerTodosLosEstudiantes: async () => {
        try {
          const result = await pool.query("SELECT * FROM estudiantes");
          return result;
        } catch (error) {
          console.error(
            "Ocurrió un problema al consultar la lista de estudiantes: ",
            error
          );
          throw error;
        }
      },
    
      obtenerDetallesGrupo: async (idgrupo) => {
        try {
          
          const [result] = await pool.query(
            "SELECT g.num_grupo, ge.idestudiante, CONCAT(e.nombre, ' ', e.apellido) AS Nombres_Completo, c.carrera FROM grupos g JOIN grupo_estudiantes ge ON g.idgrupo = ge.idgrupo JOIN estudiantes e ON ge.idestudiante = e.idestudiante JOIN carreras c ON e.idcarrera = c.idcarrera WHERE g.idgrupo = ?", [
              idgrupo,
            ]);
            return result;
        } catch (error) {
          console.error(
            "Ocurrió un problema al consultar la lista de estudiantes: ",
            error
          );
          throw error;
        }
        
      },
    
      // Eliminar un estudiante de un grupo
      eliminarEstudianteDeGrupo: async (idgrupoestudiante) => {
        try {
          const result = await pool.query(
            "DELETE FROM grupo_estudiantes WHERE idgrupoestudiante = ?",
            [idgrupoestudiante]
          );
          return result.affectedRows > 0;
        } catch (error) {
          console.error("Error al eliminar el estudiante del grupo", error);
          throw error;
        }
      },
      // Asignar grupo
      asignarGrupo: async (asignacion) => {
        try {
          const result = await pool.query(
            "INSERT INTO grupo_estudiantes SET ? ",
            asignacion
          );
          console.log("resultado: ", result);
          return result;
        } catch (error) {
          console.log("Ocurrio un problema al asignar el grupo", error);
        }
      },
      

};