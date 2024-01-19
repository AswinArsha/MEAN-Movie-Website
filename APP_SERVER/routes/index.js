var express = require('express');
var router = express.Router();

const ctrlAbout = require('../controllers/about');
const ctrlList = require('../controllers/list-display');

/* GET home page. */
router.get('/', ctrlList.index);

/* GET about page. */
router.get('/about', ctrlAbout.about);

/* GET list page. */
router.get('/movies/:movieid', ctrlList.movieInfo);

/* GET list detail page. */
router.get('/list', ctrlList.movielist);

/* Create New Movie Form */
router.route('/new')
    .get(ctrlList.addNewMovie)
    .post(ctrlList.doAddNewMovie);

/* Add Review Form */
router.route('/movies/:movieid/review/new')
    .get(ctrlList.addReview)
    .post(ctrlList.doAddReview);


module.exports = router;
