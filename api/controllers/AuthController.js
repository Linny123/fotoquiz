// Controllers are responsible for responding to requests from any system capable of communicating with a server

// Passport is authentication middleware for Node
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
        
        passport.authenticate('local-signup', function(err, user, next) {
            if(err){return next(err);}
            if(user){
                return res.json({token: user.generateJWT()});
            }
            else {return res.status(401).json(next);}
        })(req, res);
    },

    login: function(req, res, next) {

        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }

        passport.authenticate('local-login', function(err, user, next) {
            if(err){return next(err);}
            if(user){
                return res.json({token: user.generateJWT()});
            }
            else {return res.status(401).json(next);}
        })(req, res);
    },
    facebookLogin: function(req,res,next){
        console.log('etape 1');
        passport.authenticate('facebook', {scope: ['email'] });
    },
    facebookLoginCallback: function(req,res,next){
        console.log('etape 2');
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'    
        }
    )}  
};

/*
    facebookLoginCallback: function(req,res,next){
        passport.authenticate('facebook', function(err, user, next){
            if(err){return next(err);}    
            if(user){
                
                return res.json({token: user.generateJWT()});}
            else {return res.status(401).json(next);}
        })(req,res);
    }  
*/