const { Sequelize } = require('sequelize');

// Alterar as credenciais para suas configurações do MySQL
const sequelize = new Sequelize('compasscar', 'root', 'truck207', {
  host: '172.25.112.1',  // ou o endereço onde o MySQL está rodando
  dialect: 'mysql',
  port: 3306,  // Porta padrão do MySQL, altere se necessário
  logging: false // Remova ou altere se quiser ativar logs de SQL
});

module.exports = sequelize;