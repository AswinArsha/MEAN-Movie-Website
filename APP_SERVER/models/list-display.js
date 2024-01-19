const mongoose = require( 'mongoose' );

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 10
    },
    reviewText: String,
    createdOn: {type: Date, default: Date.now}
});

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 10
    },
    releasedate: {
        type: Date,
        default: Date.now
    },
    
    genres: {
        type: String,
        required: true,
    },

    cast: {
        type: [ String ],
        required: true
    },

    reviews: [reviewSchema]
    });

    mongoose.model('Movie', movieSchema);