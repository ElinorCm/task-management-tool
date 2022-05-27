const sequelize = require('../database');
const { Model, DataTypes } = require('sequelize');
const Card = require('./card');
const Tag = require('./tag');

class CardHasTag extends Model {}

CardHasTag.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Card,
            },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tag,
            },
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['card_id', 'tag_id'],
            },
        ],
        sequelize,
        tableName: 'card_has_tag',
        modelName:'CardHasTag',
        timestamps: false,
    }
);

module.exports = CardHasTag;