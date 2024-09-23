const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS } = require('../utils/utils');

// Crear el pool de conexiones
const pool = mysql.createPool(database);

// Iniciar conexión con la base de datos
pool.getConnection((error, conexion) => {
    // Validar si la conexión tiene algún tipo de error
    if (error) {
        switch (error.code) {
            case CONSTANTS.PROTOCOL_CONNECTION_LOST: // Notar la corrección en el nombre de la constante
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
            case CONSTANTS.ER_CON_COUNT_ERROR: // Demasiadas conexiones
                console.error('DATABASE HAS TOO MANY CONNECTIONS');
                break;
            case CONSTANTS.ECONNREFUSED: // Conexión rechazada (error tipográfico corregido)
                console.error('DATABASE CONNECTION WAS REFUSED');
                break;
            case CONSTANTS.ER_ACCESS_DENIED_ERROR: // Acceso denegado
                console.error('ACCESS DENIED FOR USER');
                break;
            default:
                console.error('UNKNOWN DATABASE ERROR:', error);
                break;
        }
    }

    // Si la conexión es exitosa, imprimir mensaje indicando éxito
    if (conexion) {
        console.log('Conexión establecida con la base de datos');
        conexion.release(); // Liberar la conexión
    }

    return;
});

// Configurar promisify para permitir async/await con pool.query
pool.query = promisify(pool.query);

module.exports = pool;
