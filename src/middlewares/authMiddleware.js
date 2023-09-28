const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';

exports.authenticateUser = (req, res, next) => {
  const token = req.params.authorization;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId;
    console.log(decodedToken.userId)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};