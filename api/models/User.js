// A model represents a collection of structured data
// User.js = The set of users registered in our Database.

// jsonwebtoken = method for representing claims securely between two parties
var jwt = require('jsonwebtoken');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        // Token will be used to authenticate user and manage sessions (via expiration)
        generateJWT: function() {
            var today = new Date();
            var exp = new Date(today);
            exp.setDate(today.getDate() + 1);

            return jwt.sign({
            username: this.username,
            exp: parseInt(exp.getTime() / 1000)
            }, 'SECRET');
        }
    }
};
