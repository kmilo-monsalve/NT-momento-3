const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');//Importar la configuración de la base de datos

const pool = mysql.createPool(database)//Entorno de prueba

pool.getConnection((err, connection) =>{
    
    if(connection) connection.release();
    console.log('DB is connect');
    return;
})

pool.query = promisify(pool.query);  

module.exports = pool; 