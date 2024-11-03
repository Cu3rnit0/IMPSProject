const pool = require('../config/databaseController');

module.exports = {
    obtenerTodasLasMaterias: async () => {
        try {
            const result = await pool.query('SELECT * FROM materias');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de materias: ', error);
            throw error;
        }
    },


    obtenerMateriaPorId: async (idMateria) => {
        try {
            const result = await pool.query('SELECT * FROM materias WHERE idMateria = ?', [idMateria]);
            return result[0];
        } catch (error) {
            console.error('Error al obtener la materia por ID', error);
            throw error;
        }
    },

    insertarMateria: async (nuevaMateria) => {
        try {
            const result = await pool.query('INSERT INTO materias SET ?', [nuevaMateria]);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar la materia', error);
            throw error;
        }
    },

    actualizarMateria: async (idMateria, nuevaMateria) => {
        try {
            const result = await pool.query('UPDATE materias SET ? WHERE idMateria = ?', [nuevaMateria, idMateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la materia', error);
            throw error;
        }
    },

    eliminarMateria: async (idMateria) => {
        try {
            const result = await pool.query('DELETE FROM materias WHERE idMateria = ?', [idMateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la materia', error);
            throw error;
        }
    }
}
