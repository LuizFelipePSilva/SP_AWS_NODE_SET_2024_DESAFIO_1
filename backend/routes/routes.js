const express = require('express')
const api = express.Router()
const Car = require('../models/Cars')
const CarItem = require('../models/CarItem')

//Usando o Get Geral!
api.get('/cars', (req,res) => {

})
//Usando o metodo POST
api.post('/cars', async (req, res) => {
  const {brand, model, year, items } = req.body;

  if (!brand) {
      return res.status(400).json({ error: 'brand is required' });
  }
  if(!model) {
    return res.status(400).json({ error: 'model is required' });
  }
  if(year === undefined) {
    return res.status(400).json({ error: 'year is required' });
  }

  if (year < 2015 || year > 2025) {
      return res.status(400).json({ error: 'year should be between 2015 and 2025' });
  }
  try {
      const existingCar = await Car.findOne({ where: { brand, model, year } });

      if (existingCar) {
          return res.status(409).json({ error: 'there is already a car with this data' });
      }
      const newCar = await Car.create({
          brand,
          model,
          year,
      });

      if (items && items.length > 0) {
          const carItems = items.map(item => ({ name: item, car_id: newCar.id }));
          await CarItem.bulkCreate(carItems); 
      }

      // Retorna o carro criado
      return res.status(201).json(newCar);
  } catch (error) {
      console.error('Erro ao criar o carro:', error);
      return res.status(500).json({ error: 'Erro ao criar o carro' });
  }
});
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