const uuid = require('uuid');
const utils = require('../helpers/commons');
const pool = require('../config/db');
const {createTables} = require('../models/tables');
// import { getQueryData2 } from './queries';

const userText = 'INSERT INTO users (userId, firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
const userValues = [uuid.v4(), 'Grace', 'Alabi', 'grace@gmail.com', utils.hashPassword('12345656'), '07123344569'];

// const articleText = 'INSERT INTO articles (user_id,title,article,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
// const articleValues = ['1', 'Black Cat', 'The black cat is handsome', moment().format()];

// const gifText = 'INSERT INTO gifs (user_id,title,image,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
// const gifValues = ['1', 'White House', 'https://res.cloudinary.com/daealmvag/image/upload/v1561569684/house2_kagcwz.jpg', moment().format()];

// const commentText = 'INSERT INTO comments (article_id,author_id,comment,type,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *';
// const commentValues = ['1', '1', 'Nice one', 'article', moment().format()];

// const createTables = () => {
//   Tables.createUsersTable();
//   Tables.createArticlesTable();
//   Tables.createGifTable();
//   Tables.createCommentTable();
// };

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS users, organisations')
    .then(() => console.log('Table dropped'));
};

const createUser = () => {
  pool
  .query(userText, userValues)
  .then(result => console.log(result.rows[0]))
  .catch(error => console.error(error.stack));
};

// const createArticle = () => {
//   getQueryData2(articleText, articleValues);
// };
// const createGif = () => {
//   getQueryData2(gifText, gifValues);
// };
// const createComment = () => {
//   getQueryData2(commentText, commentValues);
// };

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables, 
  dropTables, 
  createUser,
};

require('make-runnable');