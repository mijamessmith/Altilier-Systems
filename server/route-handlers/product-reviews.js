var reviews = require('../../db/controller/reviews.js').reviews;
var photos = require('../../db/controller/photos.js').photos;
var utility = require('./utility.js');

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
          res.status(500).json(err);
        } else {
          if (data.rows.length === 0) {
            res.json([]);
          } else {
            var formattedRes = utility.formatReviewsForResponse(data.rows, req.query.id, req.query.page = 1, req.query.count = 5);
            res.send(formattedRes);
          }
        }
      })
    }
  },
  getProductMetaData: (req, res, next) => {
    if (!req.query.id) {
      res.sendStatus(422);
    } else {
    reviews.getProductMetaData(req.query.id, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (data.rows.length === 0) {
          res.json([]);
        } else {
          let formattedRes = utility.formatCharacteristics(data.rows);
          res.send(formattedRes);
        }
      }
    })
    }
  },
  postReview: (req, res, next) => {
    const {query} = req.body;
    if (!query.product_id || !query.rating || !query.summary || !query.body || !query.recommend || !query.name || !query.email || !query.photos || !query.characteristics) {
      res.sendStats(422);
    } else {
      //format photos

      //format characteristics


    }
  }
}


module.exports.productReviewCallbacks = productReviewCallbacks;