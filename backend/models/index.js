const Car = require('./Cars');
const CarItem = require('./CarItem');

Car.hasMany(CarItem, { foreignKey: 'car_id', as: 'items' });
CarItem.belongsTo(Car, { foreignKey: 'car_id' });

module.exports = { Car, CarItem };