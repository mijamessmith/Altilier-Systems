var pool = require('../db.config.js').pool;

var character = {
  getCharacteristicIdsFromProduct: (id, cb) => {
    var sql = `SELECT characteristic_id, name FROM characteristics WHERE product_id = ${id}`;
    pool.query(sql, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    })
  },
  postCharReview: (charId, reviewId, rating, cb) => {
    var values = [charId, reviewId, rating];
    var sql = `INSERT INTO c_reviews (characteristic_id, review_id, rating) VALUES ($1, $2, $3) RETURNING *`;
    pool.query(sql, values, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    })
  }
}

module.exports.character = character;