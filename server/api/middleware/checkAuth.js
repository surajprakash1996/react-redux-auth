const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(500).json({msg: 'Authentication Failed.'})
    }
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    // req.user contains user id, email and timestamp;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({
      msg: 'Authentication failed.'
    })
  }
}
