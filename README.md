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
My Loadbalancer was tested using several metrics and tools, including CloudWatch on AWS, Loader.io, New Relic, and for local development, k6

Without going over 3 APIs on different EC2 instances with Nginx sitting in front, I was able to reach a stable rate of 750 rps for complex query requests, including multi table join requests for aggregate metadata:
###### Loader.io output
<img src="https://github.com/JacobWPeterson/Atelier/blob/master/LoaderIOExample.png" alt="loader.io results" width=775px />

### INSTALLATION <a name="installation"></a>
  Local Installation
  Local Instances provide limited context without a properly seeded database, but will at least provide some context to the working of the API
   ###### Within the root dir of the cloned repo, run 'npm install' in your terminal to install and npm packages
   ###### If you have not already, download, install, and run an instance of [postgresql](https://www.postgresql.org/docs/9.3/tutorial-install.html)
   ###### Using the schema.sql file, set up the database within your terminal, running
   ```
    psql postgres
    \c some_database
    \i \path\TO\schema.sql
   ```
   ###### cd into db and create a new file titled "db.config.js". The file should look like so:

```
      const {Pool, Client} = require('pg');
      const pool = new Pool({
        user: <'your_postgres_username'>,
        host: 'localhost',
        database: <'reviews'>,
        password: <'your_database_password'>,
        port: 5432,
        max: 30
      })
      module.exports.pool = pool;
```
   ###### By default the api server will run on port 80 locally. If this is not your desired port number, alter the server.js file within the server dir.
   ###### Run 'npm run server' to start the api server

### USAGE <a name="usage"></a>

### LICENSE <a name="license"></a>
This project is unlicensed