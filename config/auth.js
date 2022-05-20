const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid/changed in any way and not expired
    jwt.verify(token, SECRET, function(err, decoded) { //decoded = contents of the token(object stored in our state)
      if (err) {
        console.log('error in jwt verify')
        res.status(400).json({err})
      } else {
        // It's a valid token, so assign its user property to req.user
        req.user = decoded.user;    
        next();
      }
    });
  } else {
    next();
  }
};
