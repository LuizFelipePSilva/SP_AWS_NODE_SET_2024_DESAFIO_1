const express = require('express')
const api = express.Router()
const {Car, CarItem} = require('../models/Cars.js')

//Usando o Get Geral!
api.get('/cars', (req,res) => {

})
//Usando o metodo POST
api.post('/cars', async (req,res) => {
const { brand, model, year, items} = req.body

if (!brand || !model || !year) {
  return res.status(400).json({ error: 'brand is required'});
}

try {
  const existCar = await Car.findOne({where: {brand, model, year} })

  if(existCar) {
    res.status(409).send("there is already a car with this data")
  }

  const newCar = await Car.create({
    brand,
    model,
    year,
    items: items.map(item => ({name: item}))
  }, {
    include:[{mode: CarItem, as: 'items'}]
  })
  return res.send(201).json({id: req.body.id})
} catch (err) {
  if (err.name === 'SequelizeValidationError') {
    const yearError = err.errors.find(e => e.message.includes('year should be between'));
    if (yearError) {
        return res.status(400).json({ error: 'year should be between 2015 and 2025' });
    }
}

  console.error('Erro ao criar o carro:', err);
  return res.status(500).json({ error: 'Erro ao criar o carro' });
}

})
//Usando GET por ID
api.get('/cars/:id', (req,res) => {
  
})
//Usando DELETE
api.delete('/cars/:id', (req,res) => {
  
})
//Usando PATCH
api.patch('/cars', (req,res) => {
  
})

const existsOrError = () => {

}
module.exports = api