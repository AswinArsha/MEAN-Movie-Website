const mongoose = require('mongoose');
const Mov = mongoose.model('Movie');

const doSetAverageRating = (movie) => {
    if (movie.reviews && movie.reviews.length > 0) {
        const count = movie.reviews.length;
        const total = movie.reviews.reduce((acc, { rating }) => {
            return acc + rating;
        }, 0);

        movie.rating = parseInt(total / count, 10);
        movie.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${movie.rating}`);
            }
        });
    }
};

const updateAverageRating = (movieid) => {
    Mov.findById(movieid)
        .select('rating reviews')
        .exec((err, movie) => {
            if (!err) {
                doSetAverageRating(movie);
            }
        });
};

const doAddReview = (req, res, movie) => {
    if (!movie) {
        res
            .status(404)
            .json({ "message": "movie not found" });
    } else {
        const { author, rating, reviewText } = req.body;
        movie.reviews.push({
            author,
            rating,
            reviewText
        });
        movie.save((err, movie) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                updateAverageRating(movie._id);
                const thisReview = movie.reviews.slice(-1).pop();
                res
                    .status(201)
                    .json(thisReview);
            }
        });
    }
};

const reviewsCreate = (req, res) => { 
    const movieid = req.params.movieid;
    if (movieid) {
        Mov
            .findById(movieid)
            .select('reviews')
            .exec((err, movie) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddReview(req, res, movie);
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "movie not found" });
    }
    /* res.status(200)
        .json({"status": "success"}); */
 };

 const reviewsReadOne = (req, res) => { 
    Mov.findById(req.params.movieid)
        .select('name reviews')
        .exec((err, movie) => {
            if(!movie){
                return res.status(404)
                .json({"message": "movie not found"});
            } else if (err){
                return res.status(404).json(err);
            }
            if (movie.reviews && movie.reviews.length > 0) {
                const review = movie.reviews.id(req.params.reviewid);
                if (!review) {
                    return res.status(400).json({ "message": "review not found" });
                } else {
                    response = { 
                        movie: { 
                            name: movie.name, 
                            id: req.params.movieid 
                        }, 
                        review 
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({ "message": "No reviews found" });
            }
     });


    /* res.status(200)
        .json({"status": "success"}); */
 };

 const reviewsUpdateOne = (req, res) => { 
    if (!req.params.movieid || !req.params.reviewid) {
        return res
            .status(404)
            .json({
                "message": "Not found, movieid and reviewid are both required"
            });
    }
    Mov
        .findById(req.params.movieid)
        .select('reviews')
        .exec((err, movie) => {
            if (!movie) {
                return res
                    .status(404)
                    .json({
                        "message": "movie not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (movie.reviews && movie.reviews.length > 0) {
                const thisReview = movie.reviews.id(req.params.reviewid);
                if (!thisReview) {
                    res
                        .status(404)
                        .json({
                            "message": "Review not found"
                        });
                } else {
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    movie.save((err, movie) => {
                        if (err) {
                            res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(movie._id);
                            res
                                .status(200)
                                .json(thisReview);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({
                        "message": "No review to update"
                    });
            }
        }
    );
    /* res.status(200)
        .json({"status": "success"}); */
 };

 const reviewsDeleteOne = (req, res) => { 
    const { movieid, reviewid } = req.params;
    if (!movieid || !reviewid) {
        return res
            .status(404)
            .json({ 'message': 'Not found, movieid and reviewid are both required' });
    }

    Mov
        .findById(movieid)
        .select('reviews')
        .exec((err, movie) => {
            if (!movie) {
                return res
                    .status(404)
                    .json({ 'message': 'movie not found' });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }

            if (movie.reviews && movie.reviews.length > 0) {
                if (!movie.reviews.id(reviewid)) {
                    return res
                        .status(404)
                        .json({ 'message': 'Review not found' });
                } else {
                    movie.reviews.id(reviewid).remove();
                    movie.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            updateAverageRating(movie._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Review to delete' });
            }
    });
    /* res.status(200)
        .json({"status": "success"}); */
 };

 module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
 }