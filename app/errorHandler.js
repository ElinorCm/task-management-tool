const res = require("express/lib/response");

const errorHandler = {

    handleError: (res, code, message) => {
        res.status(code);
        res.json(message);
    },

    handleSignupError: (res, message) => {
        res.status(401);
        res.json(message);
    },

    handleNotFound: (req, res) => {
        res.status(404).json({error: "Page not found"}); 
    }
};

module.exports = errorHandler; 