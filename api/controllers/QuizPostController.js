module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createPost: function (req, res, next) {
    if (!req.body.content) {
      return res.status(400).json(
        {message: 'Please fill in the field'});
    }
    QuizPost.create({
      content: req.body.content
    }).exec(function (err, post) {
      if (err) {
        return next(err);
      }
    });
  }
};
