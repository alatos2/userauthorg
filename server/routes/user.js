const express = require('express');
const {getUser, createOrg, getAllOrg, getOrg, addUserToOrg} = require('../controllers/user');
const authentication = require('../middleware/auth');

const userRoute = express.Router();

userRoute.get('/users/:id', authentication, getUser);
userRoute.post('/organisations', authentication, createOrg);
userRoute.get('/organisations', authentication, getAllOrg);
userRoute.get('/organisations/:orgId', authentication, getOrg);
userRoute.post('/organisations/:orgId/users', addUserToOrg);

module.exports = userRoute;