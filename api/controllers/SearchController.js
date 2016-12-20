module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  generalQuizSearch: function (req, res, next) {
    Quiz.find({username: {'contains': req.query.general}}).exec(function (err, Quizs) {
      if (err) {
        return next(err);
      }
      return res.json(Quizs);
    });
  },

  generalProfileSearch: function (req, res, next) {
    User.find({username: {'contains': req.query.general}}).exec(function (err, Quizs) {
      if (err) {
        return next(err);
      }
      return res.json(Quizs);
    });
  }

};
