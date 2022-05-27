const { User } = require('../models');
const errorHandler = require('../errorHandler');

const bcrypt = require('bcrypt');
const email = require('email-validation');
const assert = require('assert');

const userController = {

    signupAction: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            assert.ok(!Boolean(user), `L'utilisateur ${req.body.email} existe déjà`); // Si j'ai pas de user je plante 
            assert.ok(email.valid(req.body.email, true), `${req.body.email} n'est pas un email valide.`);
            assert.ok(req.body.password === req.body.passwordConfirm, `Les mots de passes ne correspondent pas`);

            const encryptedPwd = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPwd
            });

            await newUser.save();

            res.json('The work is done');

        } catch (err) {
            errorHandler.handleSignupError(res, err.message);
            console.error(err);
        }
    },

    loginAction: async (req, res) => {

        const user = await User.findOne({
            where: { email: req.body.email }
        });

        if (user) {

            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (isMatch) {
                req.session.user = user;
                delete req.session.user.password;
                return res.json(`Vous êtes connecté avec l'adresse ${req.body.email}`);
            } else {
                res.json('Mot de passe invalide')
            }

        } else {
            res.json('Email invalide')
        }

    },

    all: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500);
            res.json("Une erreur innatendu s'est produite");
            console.error(error);
        }
    }

};

module.exports = userController; 