const express = require('express');
const db = require('../db/postgres.settings.js');
var productReviewCallbacks = require('./route-handlers/product-reviews.js').productReviewCallbacks;
var reviewPhotoCallbacks = require('./route-handlers/review-photos.js').reviewPhotoCallbacks;
var app = express();

//app.get('/reviews', productReviewCallbacks.getReviewsByProduct);
app.get('/reviews', productReviewCallbacks.getReviewsWithPhotos);
app.get('/reviews/photos', reviewPhotoCallbacks.getAllReviewPhotos);

app.listen(3000, () => console.log('listening on 3000'));