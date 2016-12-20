// A model represents a collection of structured data
// User.js = The set of users registered in our Database.


// Encrypting password with bcrypt
var bcrypt = require('bcryptjs');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        firstName: {
            type: 'string',
            defaultsTo: 'Your First Name'
        },
        lastName: {
            type: 'string',
            defaultsTo: 'Your Last Name'
        },
        email: {
            type: 'string'
        },
        score: {
            type: 'integer',
            defaultsTo: 0
        },
        rank: {
            type: 'integer',
            defaultsTo : 1
        },
        quizzes: {
            type: 'array',
            defaultsTo: []
        },
        // Password is stored encrypted
        encryptedPassword: {
            type: 'string'
        },
        FBID: {
            type: 'string'
        },
        // Password will never be exchanged
        generateToken: function() {
          var token = this.toObject();
          delete token.encryptedPassword;
          return token;            
        }
    },
    beforeCreate : function (values, next) {
        bcrypt.genSalt(10, function (err, salt) {
            if(err) return next(err);
            bcrypt.hash(values.password, salt, function (err, hash) {
                if(err) return next(err);
                values.encryptedPassword = hash;
                next();
            })
        })
    },
    comparePassword : function (password, user, callback) {
        bcrypt.compare(password, user.encryptedPassword, function (err, match) {
            if(err) callback(err);
            if(match) {
                callback(null, true);
            } else {
                callback(err);
            }
        })
    }
};
