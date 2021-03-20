var reviews = require('../../db/controller/reviews.js').reviews;
var promise = require('bluebird');

var productReviewCallbacks = {
  getReviewsByProduct: (req, res, next) => {
    var reviewResult;
    var reviewIds;
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
            reviewIds.forEach(id => {

            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}


module.exports.productReviewCallbacks = productReviewCallbacks;
