const pool = require('../config/db');
const uuid = require('uuid');

class User {
    static async addUserToOrg(orgId, userId, res) {
        try {
            const userQuery1 = await pool.query('SELECT * FROM organisations WHERE orgid = $1', orgId);
            const getUser1 = userQuery1.rows[0];
            if (!getUser1) {
                return res.status(400).json({
                    "status": "Bad request",
                    "message": "Invalid organisation id",
                    "statusCode": 400
                })
            }
            const userQuery2 = await pool.query('SELECT * FROM users WHERE userid = $1', userId);
            const getUser2 = userQuery2.rows[0];
            if (!getUser2) {
                return res.status(400).json({
                    "status": "Bad request",
                    "message": "Invalid user id",
                    "statusCode": 400
                })
            }

            const orgQuery = await pool.query('INSERT INTO organisations (orgid,name,description,userid) VALUES ($1,$2,$3,$4) RETURNING *', [uuid.v4(), getUser1.name, getUser1.description, userId[0]]);
            const addOrg = orgQuery.rows[0];
            console.log('Successful - POST /organisations/:orgId/users')
            return res.status(200).json({
                'status': 'success',
                'message': 'User added to organisation successfully'
            })
        } catch(e) {
            console.log(e)
            return res.status(400).json({
                "status": "Bad request",
                "message": "Client error! Reason - "+e.error,
                "statusCode": 400
            })
    }
}

    static getOrg(orgId, res) {
        // pool.connect((error, client, done) => {
        //     client
                pool.query('SELECT orgid, name, description FROM organisations WHERE orgid = $1', orgId)
                .then(result => {
                    const org = result.rows[0];
                    if (org) {
                        console.log('successful - GET /organisations/:orgId')
                        return res.status(200).json({
                            'status': 'success',
                            'message': 'Logged in user gets a single organisation record',
                            'data': {
                                'orgId': org.orgid,
                                'name': org.name,
                                'description': org.description
                            }
                        })   
                    } else {
                        return res.status(400).json({
                            "status": "Bad request",
                            "message": "Invalid organisation id",
                            "statusCode": 400
                        })
                    }
                })
                .catch(e => {
                    return res.status(400).json({
                        "status": "Bad request",
                        "message": "Client error! Reason - "+e.error,
                        "statusCode": 400
                })
            })
        // })
    }

    static getAllOrg(userId, res) {
        // pool.connect((error, client, done) => {
            // client
                pool.query('SELECT orgId, name, description FROM organisations WHERE userid = $1', userId)
                .then(result => {
                    const org = result.rows;
                    if (org) {
                        console.log('successful - GET /organisations')
                        return res.status(200).json({
                            'status': 'success',
                            'message': 'All user organization',
                            'data': {
                                'organisations': org
                            }
                        })   
                    } else {
                        return res.status(400).json({
                            "status": "Bad request",
                            "message": "User has not created any organisations",
                            "statusCode": 400
                    })

                    }
                })
                .catch(e => {
                    return res.status(400).json({
                        "status": "Bad request",
                        "message": "Client error! Reason - "+e.error,
                        "statusCode": 400
                })
            })
        // })
    }

    static createOrg(values, res) {
        const querystr = 'INSERT INTO organisations (orgId, name, description, userId) VALUES ($1, $2, $3, $4) RETURNING *';
        // pool.connect((error, client, done)=> {
        //     client
                pool.query(querystr, values)
                .then(result => {
                    console.log('successful - POST /organisations')
                    const org = result.rows[0];
                    return res.status(201).json({
                        "status": "success",
                        "message": "Organisation created successfully",
                        "data": {
                            "orgId": org.orgid, 
                            "name": org.name, 
                            "description": org.description
                        }
                    })
                })
                .catch(e => {
                    return res.status(400).json({
                        "status": "Bad request",
                        "message": "Client error! Reason - "+e.error,
                        "statusCode": 400
                    })
                })
        // })
    }

    static getUser(userId, req, res) {
        // pool.connect((error, client, done) => {
        //     client
                pool.query('SELECT * FROM organisations WHERE userid = $1', userId)
                .then(result => {
                    const userInOrg = result.rows[0];
                    if (userInOrg) {
                        const {userId,email,firstName,lastName,phone} = req.decode
                        if (userId == userInOrg.userid) {
                            console.log('successful - GET /users/:id')
                            return res.status(200).json({
                                'status': 'success',
                                'message': 'User record retrieved successfully',
                                'data': {
                                    'userId': userId,
                                    'firstName': firstName,
                                    'lastName': lastName,
                                    'email': email,
                                    'phone': phone
                                }
                            }) 
                        }  else {
                            return res.status(401).json({
                                "status": "Bad request",
                                "message": "User is not in organization",
                                "statusCode": 401
                            })
                        }
                    } else {
                        return res.status(401).json({
                            "status": "Bad request",
                            "message": "Incorrect userId",
                            "statusCode": 401
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                    return res.status(500).json({
                        "status": "Server error",
                        "message": "Internal server error",
                        "statusCode": 500
                })
            })
        // })
    }
}

module.exports = User;