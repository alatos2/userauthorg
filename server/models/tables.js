const pool = require('../config/db');

/**
 * create tables
 */

const createTables = () => {
    const users = `CREATE TABLE IF NOT EXISTS
        users (
            id SERIAL PRIMARY KEY,
            userId VARCHAR(250) UNIQUE NOT NULL, 
            firstName VARCHAR(128) NOT NULL,
            lastName VARCHAR(128) NOT NULL,     
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL,
            phone VARCHAR(128) NULL
        )
    `;

    const organisations =  `CREATE TABLE IF NOT EXISTS
        organisations (
            id SERIAL PRIMARY KEY,
            orgId VARCHAR(250) UNIQUE NOT NULL, 
            name VARCHAR(128) NOT NULL,
            description VARCHAR(350) NULL,
            userId VARCHAR(250) NOT NULL
        )
    `;

    pool.query(users)
        .then(res => {
            console.log(res);
            // pool.end();
        })
        .catch(err => {
            console.error(err);
            // pool.end()
        });

    pool.query(organisations)
        .then(res => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.error(err);
            pool.end();
        });
}

module.exports = {
    createTables
}

require('make-runnable');