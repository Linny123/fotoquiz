function pointInCircle(xc, yc, xp, yp, range) {
  var d = Math.sqrt(Math.pow(xp-xc,2)+Math.pow(yp-yc,2))
  if(d < range) return true
  return false
 }

 function inRange(latc, lngc, lat, lng, km) {
  var range = km*1000
  var inrange = pointInCircle(latc, lngc, lat, lng, range);
  return inrange
 }


module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createQuiz: function (req, res, next) {
    sails.log("-> createQuiz in QuizController")
    if (!req.body) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }

    // Calls uploadImage in ImgurController to upload image and get ID and possible GPS back
    sails.controllers.imgur.uploadImage(req, res).then(function(imageData) {

      Quiz.create({
        username: req.body.username,
        content: req.body.content,
        hint: req.body.hint,
        imageID: imageData.id,
        imageURL: imageData.url,
        imageDeletehash: imageData.deletehash,
        locationLat: imageData.gps.lat,
        locationLng: imageData.gps.lng

      }).exec(function (err, quiz) {
        if (err) {
          return next(err);
        }

        sails.log(quiz) // DEBUG
        return res.send(quiz)

      });

    })

  },

  updateQuizLocation: function (req, res, next) {
    sails.log("-> updateQuizLocation in QuizController")
    if (!req.body) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }

    Quiz.update({id: req.query.id},
        {
          locationLat: req.query.lat,
          locationLng: req.query.lng
        },
        function(err, quiz) {
          if(err) {res.send('EDIT request not successful');}
          if(quiz) {res.send(quiz[0]);}
      });

  },

  getQuizzesInRange: function(req, res, next) {
    sails.log("-> getQuizzesInRange in QuizController")
    if (!req.body) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }

    // Calls uploadImage in ImgurController to upload image and get ID and possible GPS back
    sails.controllers.imgur.uploadImage(req, res).then(function(imageData) {

      Quiz.create({
        username: req.body.username,
        content: req.body.content,
        hint: req.body.hint,
        imageID: imageData.id,
        imageURL: imageData.url,
        imageDeletehash: imageData.deletehash,
        locationLat: imageData.gps.lat,
        locationLng: imageData.gps.lng

      }).exec(function (err, quiz) {
        if (err) {
          return next(err);
        }

        return res.send(imageData)

      });

    })

  },

  getQuiz: function (req, res, next) {
    Quiz.find({}).exec(function (err, Quizs){
      if (err) {return next(err);}
      return res.json(Quizs);
    });
  }
};
