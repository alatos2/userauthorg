const jwt = require('jsonwebtoken');
require('dotenv').config();

const {SECRET} = process.env;

const authentication = (req, res, next) => {
    try {
      const header = req.headers.token || req.body.token || req.headers.authorization;
      if (!header || header === '') return res.status(401).json({ 
        status: 'Bad request', 
        message: 'Authentication failed',
        statusCode: 401 
      });
      const token = jwt.verify(header, SECRET);
      req.decode = token;
      next();
    } catch (e) {
      return res.status(401).json({ 
        status: 'Bad request', 
        message: 'Invalid token',
        statusCode: 401 
      });
    }
  };

module.exports = authentication;