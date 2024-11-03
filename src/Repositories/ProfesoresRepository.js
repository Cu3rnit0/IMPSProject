const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los profesores
    obtenerTodosLosProfesores: async () => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de profesores: ', error);
        }
    },

    obtenerProfesorPorId: async (idProfesor) => {
        try {
            const result = await pool.query('SELECT * FROM profesores WHERE idProfesor = ?', [idProfesor]);
            return result[0]; // Devuelve el primer resultado (si hay alguno)
        } catch (error) {
            console.error('Error al obtener el profesor por ID', error);
            throw error; // También puedes manejar el error según tu lógica
        }
    },

    insertarProfesor: async (nuevoProfesor) => {
        try {
            const result = await pool.query('INSERT INTO profesores SET ?', [nuevoProfesor]);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el profesor', error);
        }
    },

    actualizarProfesor: async (idProfesor, nuevoProfesor) => {
        try {
            const result = await pool.query('UPDATE profesores SET ? WHERE idProfesor = ?', [nuevoProfesor, idProfesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el profesor', error);
        }
    },

    eliminarProfesor: async (idProfesor) => {
        try {
            const result = await pool.query('DELETE FROM profesores WHERE idProfesor = ?', [idProfesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el profesor', error);
        }
    }
}
