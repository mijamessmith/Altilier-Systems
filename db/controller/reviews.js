var pool = require('../db.config.js').pool;

var reviews = {
  getAllFromProduct: (id) => {
    return new Promise((resolve, reject) =>  {

      var sql = `SELECT * FROM reviews WHERE product_id = ${id}`
      pool.query(sql)
      .then(res => {clear
        resolve(res);
      })
      .catch(err => {
        console.log(err.stack)
        reject(err);
      })
    })
  },
  getReviewsAndPhotos: (id, order, count, cb) => {
    var sql = sql = `SELECT * FROM reviews INNER JOIN review_photos ON reviews.review_id = review_photos.review_id AND reviews.product_id = ${id}`;
    if (order) {
      let orderBy;
      if (order === 'newest') {
        orderBy = 'date';
      } else if (order === 'helpful') {
        orderBy = 'recommend';
      } else if (order === 'relevant') {
        orderBy = 'helpfulness';
      }
      if (orderBy) {
        sql+= = ` ORDER
        BY ${orderBy} desc`;
      }
    }
    if (count) {
      sql += ` limit ${count}`
    }

    pool.query(sql, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    })
  }
}

module.exports.reviews = reviews;