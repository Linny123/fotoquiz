// Controllers are responsible for responding to requests from any system capable of communicating with a server


module.exports = {

    getCommentSection: function(req, res, next){
    	Comment.find({quizID: req.query.quizID}, function (err, cs) {
      		if (err) {return next(err);}
      		if (cs) {res.json(cs);}
    	});
    },

    postNewComment: function(req, res, next){
      // the CID will be date + author to ensure it's uniqueness
      var d = new Date();
      var n = d.toString();
      var CID = n + req.query.author;
      Comment.create({author: req.query.author, content: req.query.content, CID: CID, quizID: req.query.quizID}).exec(function (err, cs){
        if (err) {res.send('Post new comment request not successful');}
        res.send('Post new comment request successful');
      });
    }    
};