const pool = require('../config/dabaBaseContoller');

module.exports = {
    //CONSULTA PARA OBTENER TODOS LOS ESTUDIANTES
    obtenerTodosLosEstudiantes:  async()=>{
        try{
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        }catch(error) {
            console.log('ocurrio un problema al consultar lso estudiantes', error);
        }
    }
}