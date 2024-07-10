const pool = require('../config/db');
const utils = require('../helpers/commons');

/**
 * @class
 * @description A class container for User model
 * @exports User
 */

class Auth {
    static createOrg(values) {
        const querystr = 'INSERT INTO organisations (orgId, name, description, userId) VALUES ($1, $2, $3, $4) RETURNING *';
        // pool.connect((error, client, done)=> {
        //     client
                pool.query(querystr, values)
        // })
    }

    static register(values, res) {
        const querystr = 'INSERT INTO users (userId, firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        // pool.connect((error, client, done) => {
        //     client
                pool.query(querystr, values)
                .then(result => {
                    const user = result.rows[0];
                    const userToken = utils.jwtToken({
                        userId: user.userid, 
                        email: user.email, 
                        firstName: user.firstname,
                        lastName: user.lastname,
                        phone: user.phone
                    });
                    return res.status(201).json({
                        'status': 'success',
                        'message': 'Registration successful',
                        'data': {
                            'accessToken': userToken,
                            'user': {
                                'userId': user.userid,
                                'firstName': user.firstname,
                                'lastName': user.lastname,
                                'email': user.email,
                                'phone': user.phone
                            }
                        }
                    })
                })
                .catch(e => {
                    // console.log(e);
                    return res.status(400).json({
                        'status': 'Bad request',
                        'message': 'Registration unsuccessful. Reason - '+e.detail,
                        'statusCode': 400
                    })
                })
        // })
    }

    static login(email, res, password) {
        // pool.connect((error, client, done) => {
        //     client
                pool.query('SELECT * FROM users WHERE email = $1', email)
                .then(result => {
                    const user = result.rows[0];
                    if (!user) {
                        return res.status(401).json({
                            "status": "Bad request",
                            "message": "Authentication failed! Reason - email does not exists",
                            "statusCode": 401
                        })
                    }
                    const userToken = utils.jwtToken({
                        userId: user.userid, 
                        email: user.email, 
                        firstName: user.firstname,
                        lastName: user.lastname,
                        phone: user.phone
                    });
                    if (utils.validatePassword(password, user.password)) {
                        return res.status(200).json({
                            'status': 'success',
                            'message': 'Login successful',
                            'data': {
                                'accessToken': userToken,
                                'user': {
                                    'userId': user.userid,
                                    'firstName': user.firstname,
                                    'lastName': user.lastname,
                                    'email': user.email,
                                    'phone': user.phone
                                }
                            }
                        })   
                    } else {
                        return res.status(401).json({
                            "status": "Bad request",
                            "message": "Authentication failed! Reason - Incorrect password",
                            "statusCode": 401
                        })
                    }
                })
                .catch(e => {
                    return res.status(500).json({
                        "status": "Server error",
                        "message": "Internal server error",
                        "statusCode": 500
                    })
                })
        // })
    }
}

module.exports = Auth;