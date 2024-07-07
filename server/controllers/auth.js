const {validationResult} = require('express-validator');
const uuid = require('uuid');
const utils = require('../helpers/commons');
const {validate} = require('../middleware/validations');
const Auth = require('../models/auth');


/**
 * @function createUser
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const createUser = (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body;
    // validates fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: validate(req).array()});

    const userId = uuid.v4();
    const userValues = [userId, firstName, lastName, email, utils.hashPassword(password), phone];

    // create user's organisation during registration
    const orgId = uuid.v4();
    const name = firstName + "'s Organisation";
    const description = 'This is default description for '+name;
    const orgValues = [orgId, name, description, userId];

    Auth.createOrg(orgValues)

    // registers new user
    Auth.register(userValues, res);
}

/**
 * @function loginUser
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const loginUser = (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: validate(req).array()});
    const userEmail = [email];
    Auth.login(userEmail, res, password);
}

module.exports = {
    createUser,
    loginUser
}