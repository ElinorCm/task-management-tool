const { Tag } = require('../models');
const errorHandler = require('../errorHandler');
const assert = require('assert');

const tagController = {

    all: async (req,res) => {
        try {
            const tags = await Tag.findAll({
                attributes : {
                    exclude : ['created_at', 'updated_at']
                }
            })
            res.send(tags);
        } catch(error) {
            res.status(500);
            res.json("Une erreur innatendue s'est produite");
            console.error(error);
        }
    },

    getOne: async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id)) {

            try {
                const tag = await Tag.findByPk(id);
                res.json(tag);

            } catch (error) {
                errorHandler.handleError(res, 404, { message: 'tag not found' });
            }
        } else {
            errorHandler.handleError(res,500, { message: 'servor error' });
        }

    },

    updateOne: async (req, res) => {

        const id = Number(req.params.id);

        try {
            const tag = await Tag.update(req.body, { where: { id } });
            res.json(`The work is done`);

        } catch (error) {
            errorHandler.handleError(res, 404, { message: 'Tag not found' });
        }

    },

    create: async (req, res) => {
     
        try {

            assert.ok(Boolean(req.body.name), 'le nom du tag doit être précisé'); 

                const tag = await Tag.create({
                    name : req.body.name,
                    color : req.body.color,
                });
                res.json(tag);
           
        } catch (error) {
            errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
        }
    },

    delete: async (req, res) => {

        const id = Number(req.params.id);
        if (!isNaN(id)) {

            try {
                const tag = await Tag.findByPk(Number(id));
                tag.destroy();
                res.json('The work is done');
            } catch (error) {
                errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
            }
        } else {
            errorHandler.handleError(res, 404, { message: 'Tag not found' });
        }
    }

}; 

module.exports = tagController; 