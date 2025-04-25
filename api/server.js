require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');

const app = express();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Data sanitization
// Custom sanitization function
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj) return obj;
    return Object.keys(obj).reduce((acc, key) => {
      // Remove any keys starting with $ (Mongo operators)
      if (key.startsWith('$')) return acc;
      acc[key] = typeof obj[key] === 'object' ? sanitize(obj[key]) : obj[key];
      return acc;
    }, {});
  };

  req.query = sanitize(req.query);
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  next();
});

// app.use(xss());
// app.use(hpp());

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/projects', require('./routes/project.routes'));
app.use('/api/v1/admin', require('./routes/admin.routes'));
app.use('/api/v1/uploads', require('./routes/upload.routes'));
app.use('/api/v1/reports', require('./routes/report.routes'));

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,  () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
process.on('uncaughtException', (err) => {
  logger.error(`Unhandled Exception: ${err.message}`);
  server.close(() => process.exit(1));
});
