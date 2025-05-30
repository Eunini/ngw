const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`MongoDB Connection Established`)
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;