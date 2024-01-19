var express = require('express');
var router = express.Router();

const ctrlList = require('../controllers/list-display');
const ctrlReviews = require('../controllers/reviews');

router.route('/movies')
    .get(ctrlList.getMovies)
    .post(ctrlList.createMovie);

router.route('/movies/:movieid')
    .get(ctrlList.getSingleMovie)
    .put(ctrlList.updateMovie)
    .delete(ctrlList.deleteMovie);

// reviews
router.route('/movies/:movieid/reviews')
    .post(ctrlReviews.reviewsCreate);

router.route('/movies/:movieid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;


