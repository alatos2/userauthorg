const express = require('express');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

app.get('/', (req, res) => res.send('hello world'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/auth', authRoute);
app.use('/api', userRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`server running on port ${port}`));

module.exports = server;