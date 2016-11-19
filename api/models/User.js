var jwt = require('jsonwebtoken');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            //minLength: 5,
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            //minLength: 5,
            required: true
        },
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
