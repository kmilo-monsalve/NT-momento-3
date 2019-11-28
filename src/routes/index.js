const express = require('express')
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../keys');//Importar la configuración de la base de datos
const router = express.Router();

const pool = mysql.createPool(database)//Entorno de prueba

pool.getConnection((err, connection) =>{
    
    if(connection) connection.release();
    console.log('DB is connect');
    return;
})

pool.query = promisify(pool.query);  

router.get('/', async (req, res ) =>{
    const notices = await pool.query('SELECT * FROM notices')
    res.render('notices/list', {notices})
})

router.get('/add', (req, res) =>{
    res.render('notices/notice')
})

router.post('/add', (req, res) =>{
    const {title,description} = req.body
    const newNotice = {
         title, 
         description
    }
    pool.query('INSERT INTO notices set ?', [newNotice])
    console.log(newNotice);
    res.redirect('/')
})

router.get('/delete/:title',  (req, res) => {
    const { id } = req.params;
     pool.query('DELETE FROM notices WHERE title = ?', [title]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/');
});

module.exports = router 