const {Pool} = require('pg');
require('dotenv').config();

let DATABASE_URL = '';

if (process.env.NODE_ENV?.trim() === 'test') {
    DATABASE_URL = process.env.DATABASE_TEST_URL;
} else {
    DATABASE_URL = process.env.DATABASE_DEV_URL;
}

const pool = new Pool({connectionString: DATABASE_URL});
// const pool = new Pool({
//     database: 'userauthorg',
//     user: 'postgres',
//     password: 'computer123?',
//     port: 5432,
// });

pool.on('connect', () => console.log('connected to the database'));

module.exports = pool;