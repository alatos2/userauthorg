const express = require('express');
const {createUser, loginUser} = require('../controllers/auth');
const {validateCreateUser, validateLoginUser} = require('../middleware/validations');

const authRoute = express.Router();


authRoute.post('/register', validateCreateUser, createUser);
authRoute.post('/login', validateLoginUser, loginUser);

module.exports = authRoute;
