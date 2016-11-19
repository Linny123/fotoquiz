var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    signup: function(req, res, next){
        
        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }
        User.findOne({'username' :  req.body.username}, function(err, user){
            if(user){
                return res.status(400).json(
                {message: 'Username already taken'});
            }
            else {        
                User.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }).exec(function (err, user){
                if(err){return next(err);}
                return res.json({token: user.generateJWT()})
                });
            }
        });
    },

    login: function(req, res, next) {

        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }

        passport.authenticate('local', function(err, user, next) {
            if(err){return next(err);}
            if(user){
                return res.json({token: user.generateJWT()});
            }
            else {return res.status(401).json(next);}
        })(req, res);
    }
};