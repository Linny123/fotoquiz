// Controllers are responsible for responding to requests from any system capable of communicating with a server


module.exports = {

    getUserProfile: function(req, res, next){
    	var username = req.query.username;
    	User.findOne({username: username}, function (err, user) {
      		if (err) {return next(err);}
      		if (user) {
            var userProfile = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            };
            res.json(userProfile);
          }
    	});
    },

    editUserProfile: function(req, res, next){
      User.update({username: req.query.username},
        { 
          firstName: req.query.firstName,
          lastName: req.query.lastName,
          email: req.query.email
        },
        function(err, user) {
          if(err) {res.send('EDIT request not successful');}   
          if(user) {res.send('EDIT request successful');}
      });
    }
};