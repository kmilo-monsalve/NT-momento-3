const express = require ('express');
const morgan = require ('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//inicializadores 
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')

//Midedelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Variables globales
app.use((req, res, next) => {
    next()
})
//routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))

//public 
//starting the server 
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
    
})
