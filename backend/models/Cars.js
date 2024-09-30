const Sequelize = require('sequelize');
const db = require('../db/connection');

const Car = db.define('cars', {
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 2015,
            max: 2025,
        },
    },
}, {
    timestamps: true,
});

module.exports = Car;