import jwt from 'jsonwebtoken';

// Named export (this is what contactRoutes.js needs)
export const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bharani-scales-secret-key-2025');
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Alias for verifyAdmin (used by uploadRoutes.js)
export const verifyAdmin = authenticateToken;

// Default export (for backward compatibility with existing imports)
const authMiddleware = authenticateToken;
export default authMiddleware;
