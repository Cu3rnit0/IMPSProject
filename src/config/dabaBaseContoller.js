const mysql = require('mysql2');
const { promisify }= require('util');
const  { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');
const { error, Console } = require('console');

const pool = mysql.createPool(database);//se crea el  pool de conexiones



//inica conaexion con la base de datos
pool.getConnection((error,conexion) => {
    //validar si la conexion tiene algun tipo de errror 
    if(error){
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNNECTION_LOST:
                //indicaque la concexion con la db perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
              // indica que existen demasiadas conexiones
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('DATABASE HAS TO MANY CONNECTIONS');
                break;
              //INDICA QUE LA CONEXION FUE RECHAZADA 
            case CONSTANTS.ENCONNREFUSED:
                Console.error('DATABASE CONNECTION WAS REFUSED');
                break;
              //INDICA QUE EL ACCESO ESTA DENEGADO
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                Console.error('ACCESS DENIED FOR USER'); 
                break;
        }
    }
    //SI LA CONEXION ES EXITOSA , IMPRIMIR UN MENSAJE INDICANDOLO 
    if (conexion){
        console.log('Conexion esatablecida conla base de datos');
        conexion.release();
    } 
    return;
});

//configurando PROMISIY para permitir cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports = pool;