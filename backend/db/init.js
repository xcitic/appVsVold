'use strict';

import mongoose from 'mongoose';

const db_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

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
