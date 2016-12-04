// Authorization policie

module.exports = function (req, res, next) {
  var token;
  // Step 1: Extract the token from the header
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else {
    return res.json(401, {err: 'No Authorization header found'});
  }
  // Step 2: verify if the token is valid and proceed (authorization=ok)
  JSONWebToken.verifyToken(token, function (err, token) {
    if (err) return res.json(401, {err: 'Invalid Token!'});
    req.token = token; 
    next();
  });
};