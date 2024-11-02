const pool = require('../config/databaseController');

module.exports = {
    obtenerTodosLosEstudiantes: async() => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes: ', error);
        }
    },

    obtenerEstudiantePorId: async (idestudiante) => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result[0]; // Devuelve el primer resultado (si hay alguno)
        } catch (error) {
            console.error('Error al obtener el estudiante por ID', error);
            throw error; // También puedes manejar el error según tu lógica
        }
    },

    eliminarEstudiante: async(idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    insertarEstudiante: async(nuevoEstudiante) => {
        try {
            const result = await pool.query("INSERT INTO estudiantes SET ? ", nuevoEstudiante);
            console.log(result);
            return result.insertId;

        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    actualizarEstudiante: async (idestudiante, nuevoEstudiante) => {
        try {
            const result = await pool.query('UPDATE estudiantes SET ? WHERE idestudiante = ?', [nuevoEstudiante, idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el estudiante', error);
        }
    }
};
