# ALTILIER BACKEND SERVICE

## TABLE OF CONTENTS
1. [DESCRIPTION](#description)
2. [GOALS](#goals)
3. [METRICS](#metrics)
4. [INSTALLATION](#installation)
5. [USAGE](#usage)
6. [LICENSE](#license)

### DESCRIPTION <a name="description"></a>
Alitier provides several micro-serivices that serve as the robust backend and optimized database to a consumer review module for a eccomerce, retail site. Services include
- mulitple API Server instances built on Express.js in Node.js and deployed individually on AWS EC2
- DB Controller built in Node.js
- PostgreSQL DB and server deployed on AWS EC2
- Nginx Loadbalancing server deployed on AWS EC2 configured for 'least-used connection' and EC2 single processors.
- New Relic, Loader.io, and jest testing services

Together these services serve to handle CRUD requests as related to over 10 million product reviews and product metadata of over 20 million records seeded through AWS S3 buckets.

### GOALS <a name="goals"></a>
Altilier replaces a pre-existing API that was only able to handle serveral requests per second.
I was asked to
-Scale my new microservices to handle up to 1000 requests per second
-Maintain an error rate of <1%
-Provide ETL services for serveral unreliable cvs files with over 20 million rows

### METRICS <a name="metrics"></a>


### INSTALLATION <a name="installation"></a>
   1. Single Instance, Local Installation
  Local Instances provide limited context without a properly seeded database, but will at least provide some context to the working of the API
   ###### Within the root dir of the cloned repo, run npm install in your terminal to install and npm packages
   ###### If you have not already, download, install, and run an instance of [postgresql](https://www.postgresql.org/docs/9.3/tutorial-install.html)
   ###### cd into db and create a new file titled "db.config.js". The file should look like so:

```
      const {Pool, Client} = require('pg');
      const pool = new Pool({
        user: <'your_postgres_username'>,
        host: 'localhost',
        database: <'your_database_name'>,
        password: <'your_database_password'>,
        port: 5432,
        max: 30
      })
      module.exports.pool = pool;
```

### USAGE <a name="usage"></a>

### LICENSE <a name="license"></a>
This project is unlicensed