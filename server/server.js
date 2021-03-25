const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/postgres.settings.js');
var productReviewCallbacks = require('./route-handlers/product-reviews.js').productReviewCallbacks;
var reviewPhotoCallbacks = require('./route-handlers/review-photos.js').reviewPhotoCallbacks;
var app = express();

var test = (req, res) => {
  console.log(req.body);
  res.send("test valid");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.get('/test', test);
app.get('/reviews', productReviewCallbacks.getReviewsWithPhotos);
app.post('/reviews', productReviewCallbacks.postReview);
app.get('/reviews/photos', reviewPhotoCallbacks.getAllReviewPhotos);
app.get('/reviews/meta', productReviewCallbacks.getProductMetaData);



app.listen(80, () => console.log('listening on 80'));