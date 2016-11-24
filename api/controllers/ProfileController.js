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
    	var userProfile = req.body.params;
      User.update({username: userProfile.username},
        { 
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          email: userProfile.email
        },
        function(err, user) {
          if(err) {
            console.log('fucked up');
            res.send('EDIT request not successful');
          }   
          if(user) {
            console.log('not fucked up');
            res.send('EDIT request successful');
          }
      });
    }
};