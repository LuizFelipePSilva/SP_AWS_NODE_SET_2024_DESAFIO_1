const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./db/connection.js');
const cars = require('./models/Cars.js');
const app = express();
const port = 3333;
const Sequelize = require('sequelize')


// configs
app.use(express.json())
app.use('/api/v1', require('./routes/routes.js'))


db.authenticate()
  .then(() => {
    console.log('Conectou ao banco de dados');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.listen(port, () => {
  console.log('Server iniciado!!')
  setInterval(() => {
    console.log('Verificação periodica de 10 min.')
  }, 600000);

})
