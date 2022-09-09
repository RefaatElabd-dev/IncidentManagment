const mongoose = require('mongoose');

const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(err.errors);
    }
    
    if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    
    if( err.message === 'User_NotFound') {
      res.status(404).json({ message: err.message });
    }
  
    if (err.message === 'UN_AUTHENTICATED') {
      res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
  
    res.status(503).end();
  }


  module.exports = errorMiddleware;