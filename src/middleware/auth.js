const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const something = jwt.verify(token, config.secret);
        next();
    } catch (error) {
        res.status(401).json({
            type: 'error',
            message: 'Auth failed!'
        });
    }
};