var pool = require('../db.config.js').pool;

var reviews = {
  getAllFromProduct: (id) => {
    return new Promise((resolve, reject) =>  {

      var sql = `SELECT * FROM reviews WHERE product_id = ${id}`
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

module.exports.reviews = reviews;