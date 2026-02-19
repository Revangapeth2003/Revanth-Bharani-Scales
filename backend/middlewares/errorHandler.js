const errorHandler = (err, req, res, next) => {
  console.error('\n⛔ ERROR HANDLER TRIGGERED');
  console.error('Message:', err.message);
  console.error('Code:', err.code);
  console.error('Stack:', err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = {};

  // PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        statusCode = 409;
        message = 'This record already exists';
        break;
      case '23503': // Foreign key violation
        statusCode = 400;
        message = 'Referenced record not found';
        break;
      case '22P02': // Invalid text representation
        statusCode = 400;
        message = 'Invalid data format provided';
        break;
      case 'ECONNREFUSED':
        statusCode = 503;
        message = 'Database connection failed';
        details = { hint: 'Check DATABASE_URL in .env' };
        break;
      default:
        statusCode = 500;
        message = 'Database error occurred';
    }
  }

  // Email errors
  if (err.code === 'EAUTH') {
    statusCode = 500;
    message = 'Email service authentication failed';
    details = { hint: 'Check SENDGRID_API_KEY in .env' };
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      details: details
    })
  });
};

export default errorHandler;
