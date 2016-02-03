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

  '/': {
    view: 'homepage'
  },
  // UserController Routes
  'Post /user/addUser':'UserController.addUser',
  'Get /user/getUserById':'UserController.getUserById',
  'Post /user/loginUser':'UserController.loginUser',
  'Get /user/logout':'UserController.logout',
  'Get /user/getAllUser':'UserController.getAllUser',
  'Put /user/updateUser':'UserController.updateUser',
  'Delete /user/deleteUser':'UserController.deleteUser',
  // CarController Routes
  'Post /car/addCar':'CarController.addCar',
  'Get /car/getCar':'CarController.getCar',
  'Get /car/getAllCar':'CarController.getAllCar',
  'Get /car/getAllUsedCar':'CarController.getAllUsedCar',
  'Put /car/updateCar':'CarController.updateCar',
  'Delete /car/deleteCar':'CarController.deleteCar',
  'Post /car/searchCar':'CarController.searchCar',
  'Get /car/getAllMakes':'CarController.getAllMakes',
  'Post /car/getModelsByMake':'CarController.getModelsByMake',
  'Post /car/getVersionsByMakeAndModels':'CarController.getVersionsByMakeAndModels',
  'Post /car/getCarByMakeModelAndVersion':'CarController.getCarByMakeModelAndVersion',
  'Post /car/getCarsByJson':'CarController.getCarsByJson',
  'Post /upload':'CarController.upload',
  // PostController Routes
  'Post /post/addPost':'PostController.addPost',
  'Get /post/getPost':'PostController.getPost',
  'Get /post/getAllPost':'PostController.getAllPost',
  'Post /post/getPostByCity':'PostController.getPostByCity',
  'Delete /post/deletePost':'PostController.deletePost',
  // MakesController
  'Get /make/getAllMakes':'MakesController.getAllMakes',
   'Get /make/getMakes':'MakesController.getMakes',
  'Post /make/addMakes':'MakesController.addMakes',
  'Post /make/getModelsByMake':'MakesController.getModelsByMake',
  'Post /make/getVersionsByMakeAndModels':'MakesController.getVersionsByMakeAndModels',
  // CitiesController
  'Get /city/getAllCities':'CitiesController.getAllCities',
  'Get /city/getCities':'CitiesController.getCities',
  'Post /city/addCities':'CitiesController.addCities',
  'Post /city/getAllCityAreaByCity':'CitiesController.getAllCityAreaByCity',

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
