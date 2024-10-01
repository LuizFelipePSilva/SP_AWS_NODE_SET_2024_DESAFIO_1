const express = require('express')
const api = express.Router()
const { Car, CarItem } = require('../models/index');
const {Op, where} = require('sequelize')

//Usando o Get Geral!
api.get('/cars', (req, res) => {

})
//Usando o metodo POST
api.post('/cars', async (req, res) => {
    const { brand, model, year, items } = req.body;

    if (!brand) {
        return res.status(400).json({ error: 'brand is required' });
    }
    if (!model) {
        return res.status(400).json({ error: 'model is required' });
    }
    if (year === undefined) {
        return res.status(400).json({ error: 'year is required' });
    }
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'items is required' });
    }

    if (year < 2015 || year > 2025) {
        return res.status(400).json({ error: 'year should be between 2015 and 2025' });
    }
    const uniqueItemsSet = new Set(items)
    if(uniqueItemsSet.size !== items.length) {
        return res.status(400).json({error: "items should not contain duplicates"})
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

            const carItems = uniqueItems.map(item => ({ name: item, car_id: newCar.id }));
            await CarItem.bulkCreate(carItems);

        return res.status(201).json({ id: newCar.id });
    } catch (error) {
        console.error('Erro ao criar o carro:', error);
        return res.status(500).json({ error: error.message });
    }
});;
//Usando GET por ID
api.get('/cars/:id', async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        res.status(400).json({ error: "id is not informed" })
    }

    try {
        const findCar = await Car.findOne({ 
            where: { id: userId },
            include: [{
                model: CarItem,
                as: 'items',
                attributes: ['name']
        }
    ],
        attributes: ['id', 'brand', 'model', 'year']
        })

        if (!findCar) {
            return res.status(404).json({ error: "car not found" })
        }
        const cleanCarData = findCar.get({ plain: true });
        cleanCarData.items = cleanCarData.items.map(item => item.name)
        
        res.status(200).send({...cleanCarData})
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
//Usando DELETE
api.delete('/cars/:id', async (req, res) => {
const userId = req.params.id 

if(!userId){
    res.status(400).json({ error: "id is not informed" })
}

try {
    const car = await Car.findOne({where: {id: userId} })
    if(!car) {
    return res.status(404).json({ error: "car not found" })
    }

    CarItem.destroy({where: {car_id: userId}})
    Car.destroy({where: {id: userId} })

    return res.status(204).send()
} catch (err) {
    res.status(500).json({err: err.message})
}
})
//Usando PATCH
api.patch('/cars/:id', async (req, res) => {
const userId = req.params.id
const { brand, model, year, items } = req.body;

if(!userId) {
    return res.status(404).json({err: "id not specific"})
}
if (year < 2015 || year > 2025) {
    return res.status(400).json({ error: 'year should be between 2015 and 2025' });
}
const uniqueItemsSet = new Set(items)
if(uniqueItemsSet.size !== items.length) {
    return res.status(400).json({error: "items should not contain duplicates"})
}
const filteredItems = items ? items.filter(item => item) : []
try {
    const existingId = await Car.findOne({ where: {id: userId} });

    if (!existingId) {
        return res.status(404).json({ error: 'car not found' });
    }
    const existingCar = await Car.findOne({ where: { brand, model, year,} });
    const existItemOfCar = await CarItem.findOne({where: {name: items} })

    if (existingCar && existItemOfCar) {
        return res.status(409).json({ error: 'there is already a car with this data' });
    }
    const updateBody = {}
    if(brand) updateBody.brand = brand
    if(model) updateBody.model = model
    if(year) updateBody.year = year
    if(Object.keys(updateBody).length > 0) {
        await Car.update(updateBody, {where: {id: userId}})
    }

    await CarItem.destroy({where: {car_id: userId}})
    const carItems = filteredItems.map(item => ({
        car_id: userId,
        name: item
    }))

    if(carItems.length > 0) {
        await CarItem.bulkCreate(carItems)
    }
    return res.status(204).send()
} catch (error) {
    return res.status(500).json({error: error.message})
}
})

const existsOrError = () => {

}
module.exports = api