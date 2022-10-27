const { Sequelize } = require('sequelize');
const config = require('../../config');

const db = new Sequelize({
    dialect: 'postgres',
    host: config.db.host,
    username: config.db.username,
    password: config.db.password,
    database: config.db.nameDb,
    port: config.db.port
});

module.exports = db;
