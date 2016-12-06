module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createQuiz: function (req, res, next) {
    if (!req.body.content) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }
    Quiz.create({
      username: req.body.username,
      content: req.body.content
    }).exec(function (err, quiz) {
      if (err) {
        return next(err);
      }
    });
  },

  getQuiz: function (req, res, next) {
    Quiz.find({}).exec(function (err, Quizs){
      if (err) {return next(err);}
      return res.json(Quizs);
    });
  }
};
