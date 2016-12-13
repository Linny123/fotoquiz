module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createQuiz: function (req, res, next) {
    sails.log("-> QuizController")
    sails.log(req.form)
    if (!req.body) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }

    // Calls uploadImage in ImgurController to upload image and get ID and possible GPS back
    sails.controllers.imgur.uploadImage(req, res).then(function(imageData) {
      sails.log.debug("RECEIVED IMAGE DATA: ")
      sails.log.debug(imageData)

      Quiz.create({
        username: req.body.username,
        hint: req.body.hint,
        imageID: imageData.id,
        imageURL: imageData.url,
        imageDeletehash: imageData.deletehash,
        locationLat: imageData.gps.GPSLatitude,
        locationLon: imageData.gps.GPSLongitude

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
