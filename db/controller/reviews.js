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
    var sql = `SELECT * FROM reviews, photos WHERE reviews.product_id = ${id} AND reviews.review_id = photos.review_id`;
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
        sql+= ` ORDER
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
  },
  getProductMetaData: (id, cb) => {

  }
}

module.exports.reviews = reviews;