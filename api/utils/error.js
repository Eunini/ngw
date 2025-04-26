class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400; // Bad Request
      this.isOperational = true; // This is an expected error we handle
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class DatabaseError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DatabaseError';
      this.statusCode = 500; // Internal Server Error
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthenticationError';
      this.statusCode = 401; // Unauthorized
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthorizationError';
      this.statusCode = 403; // Forbidden
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = 404; // Not Found
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class RateLimitError extends Error {
    constructor(message) {
      super(message);
      this.name = 'RateLimitError';
      this.statusCode = 429; // Too Many Requests
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = {
    ValidationError,
    DatabaseError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    RateLimitError,
  };