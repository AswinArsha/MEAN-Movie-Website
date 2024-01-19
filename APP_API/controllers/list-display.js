const mongoose = require('mongoose');
const Mov = mongoose.model('Movie');

const getMovies = function (req, res){
    // res.status(200)
    //     .json({"status" : "success"});
    Mov.find().exec(function(err, moviedata){
        if(err){
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(moviedata);
    });
    
};

const createMovie = function (req, res){
    // res.status(200)
    //     .json({"status" : "success"});
    Mov.create({
        name: req.body.name,
        rating: req.body.rating,
        releasedate: req.body.releasedate,
        genres: req.body.genres,
        cast: req.body.cast
    }, (err, moviedata) => {
        if(err){
            res
            .status(400)
            .json(err);
        } else {
            res
            .status(201)
            .json(moviedata);
        }
    });
};

const getSingleMovie = function (req, res){
    // res.status(200)
    //     .json({"status" : "success"});
    Mov.findById(req.params.movieid)
     .exec((err, movie) => {
         if(!movie){
             return res.status(404)
             .json({"message": "movie not found"});
         } else if (err){
             return res.status(404).json(err);
         }
         res.status(200)
         .json(movie);
     });
};

const updateMovie = function (req, res){
    // res.status(200)
    //     .json({"status" : "success"});
    if(!req.params.movieid) {
        res
        .status(404)
        .json({
            "message": "Not found, movieid is required"
        });
    return;
    }
    Mov.findById(req.params.movieid)
      .exec((err, moviedata) => {
        if (!moviedata) {
            res
            .status(404)
            .json({
            "message": "movieid not found"
            });
            return;
        } else if (err) {
            res
            .status(404)
            .json(err);
            return;
        }
        moviedata.name = req.body.name;
        moviedata.rating = req.body.rating;
        moviedata.releasedate = req.body.releasedate;
        moviedata.genres = req.body.genres;
        moviedata.cast = req.body.cast;
        moviedata.save((err, moviedata) => {
            if(err) {
                res
                .status(404)
                .json(err);
            } else {
                res
                .status(200)
                .json(moviedata);
            }

        });
    
    });
};

const deleteMovie = function (req, res){
    // res.status(200)
    //     .json({"status" : "success"});
    const movieid = req.params.movieid;

    if(movieid){
        Mov
        .findByIdAndRemove(movieid)
        .exec((err, moviedata) => {
            if(err) {
                res
                .status(404)
                .json(err);
            return;
            }
    res
    .status(204)
    .json(null)
    });
    } else {
        res
        .status(404)
        .json({"message" : "No movieid"});
}
};

module.exports = {
    getMovies,
    createMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
};