const pool = require('../config/dabaBaseContoller');

module.exports ={
 
obtenerTodasLasCarreraras : async()=> {
    try{
        const result = await pool.query('SELECT * FROM carreras');
        return result;
    }catch{
        console.error('ocurrio un problemon en la consulta de carreras',error);
    }
},

obtenerCarreraPorID : async(idcarrera)=>{
    try{
        const result = await pool.query('SELECT * FROM carreras WHERE idCarrera = ?',[idcarrera]);
        return result[0];
    }catch(error){
        console.error('Error al obtener la carrera por id',error);
        throw error;
    }
},

insertarCarrera: async (nuevaCarrera) => {
    try {
        const result = await pool.query('INSERT INTO carreras SET ?', [nuevaCarrera]);
        return result.insertId;
    } catch (error) {
        console.error('Error al insertar la carrera', error);
    }
},

actualizarCarrera: async (idcarrera, nuevaCarrera) => {
    try {
        const result = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [nuevaCarrera, idcarrera]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar la carrera', error);
    }
},

eliminarCarrera: async (idcarrera) => {
    try {
        const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al eliminar la carrera', error);
    }
}

}