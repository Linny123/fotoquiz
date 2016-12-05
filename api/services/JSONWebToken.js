// JWT service

// jwt = method for representing claims securely between two parties 
var jwt = require('jsonwebtoken');
var tokenSecret = "FotoQuizSecretKey";


module.exports = {
  generateJWT: function(username){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 1);
    return jwt.sign(
      {
        username: username,
        exp: parseInt(exp.getTime() / 1000)
      }, tokenSecret);
  },
  verifyToken: function(token, callback){
    return jwt.verify(token, tokenSecret,{}, callback);
  }
};
