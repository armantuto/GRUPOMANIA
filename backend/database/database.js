const { Sequelize } = require('sequelize');

const database = new Sequelize({
    dialect: 'mssql',
    host: 'localhost',
    port: 1433, // El puerto por defecto de MSSQL
    username: 'arma',
    password: '23411397',
    database: 'GRUPOMANIA',
    logging: false
});


// database.sync({ force: false }) // setea force a true para re-crear las tablas en cada inicio (en desarrollo)
//     .then(() => {
//         console.log('Base de datos sincronizada');
//         // Inicia tu aplicación aquí
//     })
//     .catch(err => console.error('Error al sincronizar la base de datos:', err));
exports.database = database;