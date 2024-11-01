const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');

// Crear el pool de conexiones
const pool = mysql.createPool(database);

// Iniciar conexión con la base de datos
pool.getConnection((error, conexion) => {
    if (error) {
        switch (error.code) {
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_CON_COUNT_ERROR:
                console.error('DATABASE HAS TO MANY CONNECTIONS');
                break;
            case CONSTANTS.ECONNREFUSED:
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('DATABASE DENIED FOR USER');
                break;
            default:
                console.error('ERROR DE BASE DE DATOS NO ENCONTRADO');
                break;
        }
    }


    // Si la conexión es exitosa, imprimir mensaje indicando éxito
    if(conexion){
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;