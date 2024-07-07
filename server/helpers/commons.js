const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {SECRET} = process.env;

const utils = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
    },

    jwtToken(payload) {
        const token = jwt.sign(payload, SECRET, {expiresIn: '24h'});
        return token;
    },

    validatePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
}

module.exports = utils;