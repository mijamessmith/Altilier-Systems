var reviews = require('../../db/controller/reviews.js').reviews;
var photos = require('../../db/controller/photos.js').photos;

var promise = require('bluebird');

var productReviewCallbacks = {
  getReviewsByProduct: (req, res, next) => {
    var reviewResult;
    var reviewIds;
    var reviewPhotos;
    if (!req.query.id) {
      res.sendStatus(404)
    } else {
      reviews.getAllFromProduct(req.query.id)
        .then(result => {
          if(result.rowCount === 0) {
            res.sendStats(404);
          } else {
            reviewResult = result.rows;
            reviewIds = reviewResult.map(review => {
              return review.review_id;
            })
            let arrayOfPhotoPromises = [];
            reviewIds.forEach(id => {
              let resultPromise = photos.getAllFromReview(id);
              arrayOfPhotoPromises.push(resultPromise);
            })
            return Promise.all(arrayOfPhotoPromises)
          }
        })
        .then(photos => {
          reviewPhotos = photos;

        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  getReviewsWithPhotos: (req, res, next) => {
    if (!req.query.id) {
      res.sendStatus(422);
    } else {
      reviews.getReviewsAndPhotos(req.query.id, req.query.sort, req.query.count, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else {
          if (data.rows.length === 0) {
            res.json([]);
          } else {
            res.json(data.rows);
          }
        }
      })
    }
  }
}


module.exports.productReviewCallbacks = productReviewCallbacks;