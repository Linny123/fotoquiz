/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'delete /image': 'ImgurController.removeImage',

  'post /image': 'ImgurController.uploadImage', 

  'get /image': 'ImgurController.getImageLinkByID',

  'post /signup': 'AuthController.signup',

  'post /login': 'AuthController.login',

  'get /auth/facebook': 'AuthController.facebookLogin',

  'get /auth/facebook/callback': 'AuthController.facebookLoginCallback',

  'get /profile': 'ProfileController.getUserProfile',

  'put /profile': 'ProfileController.editUserProfile',

  'post /quiz': 'QuizController.createQuiz',

  'get /quiz': 'QuizController.getQuiz',

  'put /quiz': 'QuizController.updateQuizLocation',

  'get /comment': 'CommentController.getCommentSection',

  'post /comment': 'CommentController.postNewComment',

  'get /profile/quiz': 'ProfileController.getUserQuiz',

  'delete /profile/quiz': 'ProfileController.removeUserQuiz',

  'put /profile/quiz': 'ProfileController.editUserQuiz',

  'put /profile/points': 'ProfileController.UserAddPoints',

  'put /profile/quizzes': 'ProfileController.UserAddQuizDone',

  'get /profile/hasdonequiz': 'ProfileController.UserHasDoneQuiz',

  'get /quizsearch/generalsearch': 'SearchController.generalSearch',

  'get /quizsearch/advancedsearch': 'SearchController.advancedSearch',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
