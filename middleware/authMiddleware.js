const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

function authenticateToken(req, res, next) {
  // expect header format: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;  // attach decoded payload (e.g., userId) to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden - Invalid or expired token' });
  }
}

module.exports = authenticateToken;