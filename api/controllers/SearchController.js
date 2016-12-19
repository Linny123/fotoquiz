module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  generalQuizSearch: function (req, res, next) {
        Quiz.find({or : [{username: {'contains': req.query.general}},{content: {'contains': req.query.general}}]}).exec(function (err, Quizs){
            if (err) {return next(err);}
            return res.json(Quizs);
        });
    },

  generalProfileSearch: function (req, res, next) {
    User.find({username: {'contains': req.query.general}}).exec(function (err, Quizs){
      if (err) {return next(err);}
      return res.json(Quizs);
    });
  },

    advancedSearch: function (req, res, next) {
        if (req.query.author && req.query.content) {
            Quiz.find({
                username: {'contains': req.query.author},
                content: {'contains': req.query.content}
            }).exec(function (err, Quizs) {
                if (err) {
                    return next(err);
                }
                return res.json(Quizs);
            });
        } else if (req.query.author) {
            Quiz.find({
                username: {'contains': req.query.author}
            }).exec(function (err, Quizs) {
                if (err) {
                    return next(err);
                }
                return res.json(Quizs);
            });
        } else {
            Quiz.find({
                content: {'contains': req.query.content}
            }).exec(function (err, Quizs) {
                if (err) {
                    return next(err);
                }
                return res.json(Quizs);
            });
        }
    }

};
