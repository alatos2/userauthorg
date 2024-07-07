const User = require('../models/user');
const uuid = require('uuid');

/**
 * @function getUser
 * @description user gets their own record or user record in organisations they belong to or created
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const getUser = (req, res) => {
    const {id} = req.params;
    const userId = [id];
    User.getUser(userId, res);
}

/**
 * @function createOrg
 * @description user can create their new organisation
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const createOrg = (req, res) => {
    const {name, description} = req.body;
    const orgId = uuid.v4();
    // const name = req.decode.firstName + "'s Organisation";
    const orgValues = [orgId, name, description, req.decode.userId];
    User.createOrg(orgValues, res)
}

/**
 * @function getAllOrg
 * @description gets all your organisations the user belongs to or created.
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const getAllOrg = (req, res) => {
    const {userId} = req.decode;
    User.getAllOrg([userId], res);
}

/**
 * @function getOrg
 * @description user gets a single organisation record
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const getOrg = (req, res) => {
    const {orgId} = req.params;
    User.getOrg([orgId], res);
}

/**
 * @function addUserToOrg
 * @description  adds a user to a particular organisation
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
const addUserToOrg = (req, res) => {
    const {userId} = req.body;
    const {orgId} = req.params;
    User.addUserToOrg([orgId],[userId], res);
}

module.exports = {
    getUser,
    createOrg,
    getAllOrg,
    getOrg,
    addUserToOrg
};