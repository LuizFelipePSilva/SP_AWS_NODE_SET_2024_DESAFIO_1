const express = require('express')
const api = express.Router()
const { Car, CarItem } = require('../models/index');
const {Op, where} = require('sequelize')


api.get('/cars', async (req, res) => {
let {limit, page} = req.query
const {brand, model, year} = req.query

limit = parseInt(limit)

if(isNaN(limit) || limit < 1) {
    limit = 5
}

if(limit > 10) {
    limit = 10
}

if(isNaN(page) || page < 1) {
    page = 1
}
const offset = parseInt((page - 1) * limit)

try {
    const count = await Car.count({
        where: {
            ...(brand && { brand: { [Op.like]: `%${brand}%` } }),
            ...(model && { model: { [Op.like]: `%${model}%` } }),
            ...(year && { year })
        },
    });
    const rows  = await Car.findAll({
        attributes: ['id', 'brand', 'model', 'year'],
        where: {
            ...(brand && { brand: { [Op.like]: `%${brand}%` } }),
            ...(model && { model: { [Op.like]: `%${model}%` } }),
            ...(year && { year })
        },
        include:[{
            model: CarItem,
            as: 'items',
            attributes: ['name']
        }],
        limit: limit,
        offset: offset
    }
)
if(count === 0) {
    return res.status(204).send()
}
let totalPages = Math.ceil(count/limit)   

const transformedRows = rows.map(car => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    items: car.items.map(item => item.name)
}))

res.status(200).json({
    count: count,
    pages: totalPages,
    data: transformedRows
})
} catch (err) {
    res.status(404).send({err: err.message})
}
})

api.post('/cars', async (req, res) => {
    const { brand, model, year, items } = req.body;

    if (!brand || typeof brand !== 'string') {
        return res.status(400).json({ error: 'brand is required' });
    }
    if (!model || typeof model !== 'string') {
        return res.status(400).json({ error: 'model is required' });
    }
    if (year === undefined || typeof year !== 'number') {
        return res.status(400).json({ error: 'year is required' });
    }
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'items is required' });
    }

    if (year < 2015 || year > 2025) {
        return res.status(400).json({ error: 'year should be between 2015 and 2025' });
    }

    const uniqueItemsSet = new Set(items)

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

            const carItems = [...uniqueItemsSet].map(item => ({ name: item, car_id: newCar.id }));
            await CarItem.bulkCreate(carItems);

        return res.status(201).json({ id: newCar.id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});;

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

api.patch('/cars/:id', async (req, res) => {
const userId = req.params.id
const brand = req.body.brand
const model = req.body.model
const year = req.body.year
const items = req.body.items

if(!userId) {
    return res.status(404).json({err: "id not specific"})
}
if (year !== undefined &&(year < 2015 || year > 2025)) {
    return res.status(400).json({ error: 'year should be between 2015 and 2025' });
}
let filteredItems = []
if(items) {
    if(!Array.isArray(items)) {
    return res.status(400).json({ error: "items should be an array" });
    }
        
    const uniqueItemsSet = new Set(items)
    if(uniqueItemsSet.size !== items.length) {
        return res.status(400).json({error: "items should not contain duplicates"})
    }
    filteredItems = items.filter(item => item)
}


try {
    const existingId = await Car.findOne({ where: {id: userId} });

    if (!existingId) {
        return res.status(404).json({ error: 'car not found' });
    }

    const verifyCar = {}
    const verifyCarItem = {}
    if(brand && typeof brand === "string") verifyCar.brand = brand
    if(model && typeof model === "string") verifyCar.model = model
    if(year && typeof year === "number" ) verifyCar.year = year
    if(items) verifyCarItem.name = items
    
    const existingCar = await Car.findOne({ where: verifyCar });

    if(existingCar){ 
    const existItemOfCar = await CarItem.findAll({
        where: {car_id: existingCar.id},
        attributes: ['name'],
        raw: true 
    })

    const itemsName = existItemOfCar.map(item => item.name)

    const sameLengh = items.length === itemsName.length

    const allExist = sameLengh && items.every(item => itemsName.includes(item))

    if (allExist) {
        return res.status(409).json({ error: 'there is already a car with this data' });
    }
    }


    const updateBody = {}
    if(brand && typeof brand === "string") updateBody.brand = brand
    if(model && typeof model === "string") updateBody.model = model
    if(year && typeof year === "number") updateBody.year = year

    if(Object.keys(updateBody).length > 0) {
        await Car.update(updateBody, {where: {id: userId}})
    }
    
    if(filteredItems.length > 0) {
        await CarItem.destroy({where: {car_id: userId}})
        const carItems = filteredItems.map(item => ({
            car_id: userId,
            name: item
        }))
    
        if(carItems.length > 0) {
            await CarItem.bulkCreate(carItems)
        }
    }
    return res.status(204).send()
} catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message})
}
})

module.exports = api