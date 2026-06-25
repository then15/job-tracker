const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Step 1: Get token from request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Step 2: Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    // Step 3: Verify token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 4: Attach user info to request
    req.user = decoded;

    // Step 5: Move to next function
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token, access denied' });
  }
};

module.exports = authMiddleware;