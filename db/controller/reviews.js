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
    var sql = `SELECT reviews.rating, reviews.recommend, characteristics.name, characteristics.characteristic_id, c_reviews.rating
    FROM
    c_reviews
    INNER JOIN characteristics ON
    c_reviews.characteristic_id = characteristics.characteristic_id
    INNER JOIN reviews ON c_reviews.review_id = reviews.review_id
    WHERE
    characteristics.product_id = ${id}`;

    pool.query(sql, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    })
  },
  postReview: (review, cb) => {
    var sql = `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ( $1, $2, $3, $4, $5, $6 ,$7, $8, $9, $10, $11) RETURNING *`;

    pool.query(sql, review, (err, res) => {
      if (err) {
        cb(err, null);
        console.log(err);
      } else {
        cb(null, res)
      }
    })
  }
}

module.exports.reviews = reviews;