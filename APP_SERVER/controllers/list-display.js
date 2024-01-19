const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
   };

 const _renderHomepage = function(req, res, responseBody) {
    console.log(responseBody);
    res.render('list-display', {
        movies: responseBody
    });
};

const movielist = function(req, res) {
    const path = '/api/movies';
    const requestOptions = {
        url : apiOptions.server + path,
        mathod : 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderHomepage(req, res, body);
        }
    );
};



const _renderDetailPage = function (req, res, responseBody) {
    res.render('details', {
        currentMovie: responseBody
    });
};

const movieInfo = function(req, res) {
    const path = `/api/movies/${req.params.movieid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
        };
        request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};

const index = function(req, res) {
    res.render('index', { title: 'Home' });
};

//Create New Movie Form

const _renderCreatePage = function(req, res) {
    res.render('create', {
        title: "Create New Movie"
    });
};

const addNewMovie = function(req, res) {
    _renderCreatePage(req, res);
};

const doAddNewMovie = function(req, res) {
    const path =  '/api/movies';
    const postdata = {
        name: req.body.name,
        rating: req.body.rating,
        releasedate: req.body.releasedate,
        genres: req.body.genres,
        cast : req.body.cast
        
    };
    const requestOptions = {
        url: apiOptions.server+path,
        method: 'POST',
        json: postdata
    };
    request(
    requestOptions,
    (err, response, body) => {
        if (response.statusCode === 201) {
            res.redirect('/list');
        }
    });
    
};

//Review Form

const _renderReviewPage = function(req, res) {
    res.render('reviewform', {
        title: "Create New Review"
    });
};

const addReview = function(req, res) {
    _renderReviewPage(req, res);
};


  const doAddReview = (req, res) => {
  
    const movieid = req.params.movieid;
    console.log('movieid : ',movieid);
    const path = `/api/movies/${movieid}/reviews`;
    const postdata = {
      author: req.body.name,
      rating: parseInt(req.body.rating, 10),
      reviewText: req.body.review
    };
    console.log("postdata :", postdata);
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect(`/movies/${movieid}`);
            }
        });
    };

module.exports = {
    movielist,
    movieInfo,
    index,
    addNewMovie,
    doAddNewMovie,
    addReview,
    doAddReview
    
};