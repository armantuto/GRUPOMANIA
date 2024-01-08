const { Sequelize } = require('sequelize');

const database = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    port: 1433, // El puerto por defecto de MSSQL
    username: 'arma',
    password: '23411397',
    database: 'GRUPOMANIA',
    logging: false,
   
});

 exports.database = database;

