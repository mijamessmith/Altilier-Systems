var pool = require('../db.config.js').pool;

var photos = {
  getAllFromReview: (id) => {
    return new Promise((resolve, reject) =>  {

      var sql = `SELECT * FROM photos WHERE review_id = ${id}`
      pool.query(sql)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  postPhoto: (id, url, cb) => {
    var values = [id, url];
      var sql = `INSERT INTO photos (review_id, url) VALUES ($1, $2) RETURNING *`;
      pool.query(sql, values, (err, data) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, data);
        }
      })
  }
}

module.exports.photos = photos;