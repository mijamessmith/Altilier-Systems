var pool = require('../db.config.js').pool;

var photos = {
  getAllFromReview: (id) => {
    return new Promise((resolve, reject) =>  {

      var sql = `SELECT * FROM photos WHERE review_id = ${id}`
      pool.query(sql)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err.stack)
        reject(err);
      })
    })
  }
}

module.exports.photos = photos;