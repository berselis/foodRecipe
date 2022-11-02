const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Types = require('../models/types.model');

const Ingredients = db.define('ingredients', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'type_id',
        references: {
            ket: 'id',
            model: Types
        }
    },
    urlImg: {
        type: DataTypes.STRING,
        field: 'url_img',
        validate: {
            //isUrl: true
        }
    }
}, {
    timestamps: false
});

module.exports = Ingredients






