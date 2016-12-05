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
    var cursor = Quiz.find();
    var quizzes = [];
    while (cursor) {
      var quiz = {
        username: cursor.username,
        content: cursor.email
      };
      quizzes.push(quiz);
      cursor = cursor.hasNext() ? cursor.next() : null;
    }
    res.json(quizzes);
  }
};
