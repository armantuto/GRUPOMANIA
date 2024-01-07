const { Sequelize } = require('sequelize');

const database = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite', // puoi usare al momento sqlite poi lo mettiamo su mysql /sql server / postgresql quello che vuoi
    logging: false
  });

exports.database=database;
