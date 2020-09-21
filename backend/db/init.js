'use strict';

import mongoose from 'mongoose';

const db_url = 'mongodb://db_user:2y10Z6YZ83pIN0Ns8zFi8LiqQOmn7cFP01qPBhi@0.0.0.0:27017/appvsvold';

const connectDB = () => {
  mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', err => {
    console.error(`Database connection error: ${err}`);
  });

  db.on('connected', () => {
    console.log('Database connected');
  });

  db.on('disconnect', () => {
    console.log('Database disconnected');
  });

};

export default connectDB;
