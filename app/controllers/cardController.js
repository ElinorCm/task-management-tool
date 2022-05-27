const errorHandler = require('../errorHandler');
const { Card, List } = require('../models');
const assert = require('assert');

const cardController = {

    all: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: ['tags'],
                attributes: {
                    exclude: ['created_at', 'updated_at']
                }
            })
            res.json(cards);
        } catch (error) {
            res.status(500);
            res.json("Une erreur innatendue s'est produite");
            console.error(error);
        }
    },

    getOne: async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id)) {

            try {
                const card = await Card.findByPk(id);
                res.json(card);

            } catch (error) {
                errorHandler.handleError(res, 404, { message: 'card not found' });
            }
        } else {
            errorHandler.handleError(res, 500, { message: 'servor error' });
        }

    },

    updateOne: async (req, res) => {

        const id = Number(req.params.id);

        try {
            const card = await Card.findByPk(id);
            assert.ok(Boolean(card), 'card not found');

            if (req.body.name) {
                card.name = req.body.name; 
            }

            if (req.body.position) {

                const cards = await Card.findAll({
                    where: { list_id : req.body.list_id},
                })
                // La position doit-être un entier positif
                // La position doit-être supérieure à zéro et inférieure au nombre de liste
                assert.ok(!Number.isInteger(req.body.position), 'la position doit être un entier');  
                assert.ok(req.body.position > 0 || req.body.position < cards.length +1, `la position doit être un entier compris entre 0 et ${cards.length}`);
                // si nouvelle position < ancienne position 
                // tout ce qui est entre ancienne position et nouvelle position prend +1
                // < ancienne position >= nouvelle position  
                if (req.body.position < card.position) {
                    for (c of cards) {
                        if (c.position >= req.body.position && c.position < card.position) {
                            c.update({ position: c.position + 1 });
                        }
                    }
                    // si nouvelle position > ancienne position
                    // tout ce qui est entre ancienne position et nouvelle position prend -1
                    // > ancienne position <= nouvelle position 
                } else if (req.body.position > card.position) {
                    for (c of cards) {
                        if (c.position <= req.body.position && c.position > card.position) {
                            c.update({ position: c.position - 1 });
                        }
                    }
                }
                card.position = req.body.position;
            }


            await card.save();
            res.json(card);

        } catch (error) {
            errorHandler.handleError(res, 404, { message: error.message });
        }

    },

    create: async (req, res) => {
        const name = req.body.name;
        // const position = parseInt(req.body.position);
        //const color = '#FOF';
        const list_id = parseInt(req.body.list_id);
        // const list_id = req.body.list_id; 
        /*
        // On récupère les listes associées aux users pour en connaître le nombre
        const lists = await Card.findAll({
            where: { list_id }
        });

        // On placera automatiquement la nouvelle liste en dernière position
        const position = lists.length + 1; 
        */

        const position = await Card.count({
            where: { list_id }
        })+1;

        try {
            const card = await Card.create({
                name,
                position,
                // color,
                list_id
            });
            res.json(card);

        } catch (error) {
            errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
        }
    },

    delete: async (req, res) => {

        const id = Number(req.params.id);
        
        if (!isNaN(id)) {

            try {
                const card = await Card.findByPk(Number(id));
                card.destroy();
                res.json('The work is done');
            } catch (error) {
                errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
            }
        } else {
            errorHandler.handleError(res, 404, { message: 'Card not found' });
        }
    },
    async getCardsInList(req, res) {
        const id = Number(req.params.id);

        try {
            const cards = await Card.findAll({
                where : { list_id : id }, 
            });

            res.json(cards);
        } catch (error) {
            errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
        }
    }

};

module.exports = cardController