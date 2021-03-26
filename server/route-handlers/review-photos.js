var photos = require('../../db/controller/photos.js').photos;
var promise = require('bluebird');

var reviewPhotoCallbacks = {
  getAllReviewPhotos: (req, res, next) => {
    if (!req.query.id) {
      res.sendStatus(404);
    } else {
      photos.getAllFromReview(req.query.id)
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.send(err);
        })
    }
  }
}

module.exports.reviewPhotoCallbacks = reviewPhotoCallbacks;