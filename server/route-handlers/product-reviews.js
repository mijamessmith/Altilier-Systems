var reviews = require('../../db/controller/reviews.js').reviews;
var photos = require('../../db/controller/photos.js').photos;
var utility = require('./utility.js');

var promise = require('bluebird');

var productReviewCallbacks = {
  getReviewsByProduct: (req, res, next) => {
    var reviewResult;
    var reviewIds;
    var reviewPhotos;
    if (!req.body.id) {
      res.sendStatus(404)
    } else {
      reviews.getAllFromProduct(req.body.id)
        .then(result => {
          if(result.rowCount === 0) {
            res.sendStatus(404);
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
    if (!req.body.id) {
      res.sendStatus(422);
    } else {
      reviews.getReviewsAndPhotos(req.body.id, req.body.sort, req.body.count, (err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          if (data.rows.length === 0) {
            res.json([]);
          } else {
            var formattedRes = utility.formatReviewsForResponse(data.rows, req.body.id, req.body.page = 1, req.body.count = 5);
            res.send(formattedRes);
          }
        }
      })
    }
  },
  getProductMetaData: (req, res, next) => {
    if (!req.body.id) {
      res.sendStatus(422);
    } else {
    reviews.getProductMetaData(req.body.id, (err, data) => {
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
    const {body} = req;
    //|| !body.rating || !body.summary || !body.body || !body.recommend || !body.name || !body.email || !body.photos || !body.characteristics
    if (!body.product_id) {
      res.sendStatus(422);
    } else {
      let postArray = utility.formatReviewPostArray(body);
      reviews.postReview(postArray, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(result);
        }
      })
      //using returned review_id, post photos
      //format characteristic
    }
  }
}


module.exports.productReviewCallbacks = productReviewCallbacks;