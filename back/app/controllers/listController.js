const errorHandler = require('../errorHandler');
const { List, User } = require('../models');
const assert = require('assert');

const listController = {

    getAll: async (req, res) => {
        try {
            const cards = await List.findAll({
                attributes: {
                    exclude: ['created_at', 'updated_at']
                },
                where : {
                    user_id : 1
                }, 
                include: [
                    {
                        association: "cards",
                        include: [{
                            association: "tags"
                        }]
                    }
                ],
                order: [
                    ["position", "ASC"], ["cards", "position", "ASC"]
                ]
            })
            res.json(cards);
        } catch (error) {
            errorHandler.handleError(res, 500, { message: 'servor error' });
        }
    },

    getOne: async (req, res) => {

        const id = Number(req.params.id);

        if (!isNaN(id)) {

            try {
                const list = await List.findByPk(id, {
                    attributes: {
                        exclude: ['created_at', 'updated_at']
                    },
                    include: [
                        {
                            association: "cards",
                            include: [{
                                association: "tags"
                            }]
                        }
                    ],
                    order: [
                        ["position", "ASC"], ["cards", "position", "ASC"]
                    ]
                });
                res.json(list);

            } catch (error) {
                errorHandler.handleError(res, 404, { message: 'list not found' });
            }
        } else {
            errorHandler.handleError(res, 500, { message: 'servor error' });
        }

    },

    getAllByUserId: async (req, res) => {
        const id = Number(req.session.user.id);

        try {
            const lists = await List.findAll({
                where: { user_id: id },
            })
            res.json(lists);
        } catch (error) {
            errorHandler.handleError(res, 404, { message: error.message })
        }
    },

    getOneByUserId: async (req, res) => {
        const id = Number(req.params.id);

        try {
            const list = await List.findByPk(id);
            assert.ok(Boolean(list), `la liste ${req.params.id} n'existe pas`);
            res.json(list);
        } catch (error) {
            errorHandler.handleError(res, 404, { message: error.message })
        }
    },

    update: async (req, res) => {

        const id = Number(req.params.id);
        // const user_id = req.session.user.id;
        const user_id = 1; 

        try {
            const list = await List.findByPk(id);
            assert.ok(Boolean(list), 'list not found');

            if (req.body.name) {
                list.name = req.body.name;
            }

            if (req.body.position) {

                const lists = await List.findAll({
                    where: { user_id },
                })
                // La position doit-??tre un entier positif
                // La position doit-??tre sup??rieure ?? z??ro et inf??rieure au nombre de liste
                assert.ok(!Number.isInteger(req.body.position), 'la position doit ??tre un entier');  
                assert.ok(req.body.position > 0 || req.body.position < lists.length +1, `la position doit ??tre un entier compris entre 0 et ${lists.length}`);
                // si nouvelle position < ancienne position 
                // tout ce qui est entre ancienne position et nouvelle position prend +1
                // < ancienne position >= nouvelle position  
                if (req.body.position < list.position) {
                    for (l of lists) {
                        if (l.position >= req.body.position && l.position < list.position) {
                            l.update({ position: l.position + 1 });
                        }
                    }
                    // si nouvelle position > ancienne position
                    // tout ce qui est entre ancienne position et nouvelle position prend -1
                    // > ancienne position <= nouvelle position 
                } else if (req.body.position > list.position) {
                    for (l of lists) {
                        if (l.position <= req.body.position && l.position > list.position) {
                            l.update({ position: l.position - 1 });
                        }
                    }
                }
                list.position = req.body.position;
            }
            await list.save();
            res.json(list);
        } catch (error) {
            errorHandler.handleError(res, 404, { message: error.message });
        }

    },

    create: async (req, res) => {

        const { name } = req.body;
        // const user_id = req.session.user.id;
        const user_id = 1; 

        try {

            assert.ok(Boolean(name), 'le nom de la liste doit ??tre pr??cis??');

            /*
            // On r??cup??re les listes associ??es aux users pour en conna??tre le nombre
            const lists = await List.findAll({
                where: { user_id }
            });

            // On placera automatiquement la nouvelle liste en derni??re position
            const position = lists.length + 1;
            */

            const position = await List.count()+1;

            // On cr??e la nouvelle liste 
            const list = await List.create({
                name,
                position,
                user_id
            });

            res.json(list);

        } catch (error) {
            errorHandler.handleError(res, 500, { message: error.message });
        }
    },

    delete: async (req, res) => {

        const id = Number(req.params.id);
        if (!isNaN(id)) {

            try {
                const list = await List.findByPk(Number(id));
                list.destroy();
                res.json('The work is done');
            } catch (error) {
                errorHandler.handleError(res, 500, { message: 'Unexpected servor error' });
            }
        } else {
            errorHandler.handleError(res, 404, { message: 'List not found' });
        }
    }

};

module.exports = listController; 