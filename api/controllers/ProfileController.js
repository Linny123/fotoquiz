// Controllers are responsible for responding to requests from any system capable of communicating with a server

 function nrOfDoneQuizzes(array) {
  return array.length;;
 }

module.exports = {

    computeRanking: function (req, res, next) {
      var profilesArray = [];
      // Step 1 get all profiles
      User.find({}).exec(function (err, profiles){
        if (err) {return next(err);}
        if(profiles){
          // Step 2 sort by score via array
          // Create an array so we can sort every user by their score
          var profilesArray = [];
          var profilesLength = profiles.length;
          for (var i = 0; i < profilesLength; i++){
            profilesArray.push([profiles[i].username, profiles[i].score]);
          }
          profilesArray.sort(function(a, b) {
              return b[1] - a[1]
          })
          // Step 3 update rank when going over profiles
          var singleProfile;
          var username;
          var newRank;
          var arrayLength = profilesArray.length;
          for (var i = 0; i < arrayLength; i++) {
            singleProfile = profilesArray[i];
            username = singleProfile[0];
            newRank = i + 1;
            // Update rank of given username via the cntr of the for loop (since sorted)
            User.update({username: username},
              {
                rank: newRank
              },
              function(err, user) {
                newRank = 0; // reset the rank
            });
          }
        }
        return res.send('Ranking computed');
      });
    },

    getAllProfiles: function (req, res, next) {
      User.find({}).exec(function (err, profiles){
        if (err) {return next(err);}
        return res.json(profiles);
      });
    },

    getUserProfile: function(req, res, next){
    	var username = req.query.username;
    	User.findOne({username: username}, function (err, user) {
      		if (err) {return next(err);}
      		if (user) {
            var userProfile = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              score: user.score,
              quizzes: user.quizzes,
              nrOfDoneQuizzes: user.quizzes.length,
              rank: user.rank
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
    },

  UserAddPoints: function(req, res, next){
    var currentScore = 0;
    var username = req.query.username;
    var points = req.query.points;

    User.findOne({username: username}, function (err, user) {
          if (err) {return next(err);}
          if (user) {
            currentScore = parseInt(user.score);

            User.update({username: username}, { score: currentScore + parseInt(points) }, function(err, user) {
                if(err) {res.send('ADD POINTS request not successful');}
                if(user) {res.send({ updatedScore : user[0].score });}
            });
          }
    });
  },

  UserAddQuizDone: function(req, res, next){
    var currentQuizzes;
    var username = req.query.username;
    var quizID = req.query.quizID;

    User.findOne({username: username}, function (err, user) {
          if (err) {return next(err);}
          if (user) {
            currentQuizzes = user.quizzes
            currentQuizzes.push(quizID)

            User.update({username: username}, { quizzes: currentQuizzes }, function(err, user) {
                if(err) {res.send('ADD QUIZ request not successful');}
                if(user) {res.send({ DoneQuizzes : user[0].quizzes });}
            });
          }
    });
  },

  UserHasDoneQuiz: function(req, res, next){

    var username = req.query.username;
    var quizID = req.query.quizID;

    User.findOne({username: username}, function (err, user) {
          if (err) {return next(err);}
          if (user) {
            if(user.quizzes.includes(quizID)) {res.send(true);}
            else { res.send(false) }
          }
    });
  },

  getUserQuiz: function (req, res, next) {
    Quiz.find({username: req.query.username}).exec(function (err, Quizs){
      if (err) {return next(err);}
      return res.json(Quizs);
    });
  },

  removeUserQuiz: function (req, res, next) {
    // Also remove image file from Imgur
    var imageDeletehash = req.query.imageDeletehash
    sails.controllers.imgur.removeImage(req, res);

    Quiz.destroy({id: req.query.id}).exec(function (err){
      if (err) {
        return res.negotiate(err);
      }
      return res.ok();
    });
  },

  editUserQuiz: function(req, res, next){
    var quiz = req.body.params;

    Quiz.update({id: quiz.id},
      {
        content: quiz.content
      },
      function(err, quiz) {
      });
  }
};
