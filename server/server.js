require('./config/config');

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');


const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//configuracion global de rutas
app.use(require('./routes/index'))

// habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos Online', process.env.URLDB);

});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en puerto ${process.env.PORT}...`);
})