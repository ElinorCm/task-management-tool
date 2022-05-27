const sequelize = require('../database');
const { Model, DataTypes } = require('sequelize');

class Card extends Model { }

Card.init({
    name: {
        type: DataTypes.TEXT, 
        allowNull: false
    }, 
    position: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }, 
    color: {
        type: DataTypes.TEXT, 
        allowNull: true
    }, 
}, {
    sequelize,
    tableName: "card",
    modelName:"Card"
});


module.exports = Card;