const sequelize = require('../database');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

User.init({
    firstname: {
        type: DataTypes.TEXT, 
        allowNull: false
    }, 
    lastname: {
        type: DataTypes.TEXT, 
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    tableName: "user",
    modelName: "User"
});


module.exports = User;