var pool = require('./db.config.js');

pool.connect()
  .then(client => {
    console.log('connected to db');
  })
  .catch(err => console.log(err));


pool.on('error', (err, client) => {
  console.error('idle client ', err);
  process.exit(-1);
});