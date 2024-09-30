const Sequelize = require('sequelize');
const db = require('../db/connection');

const CarItem = db.define('cars_items', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  car_id: {
      type: Sequelize.INTEGER,
      references: {
          model: 'cars', 
          key: 'id'     
      }
  }
});


module.exports = CarItem