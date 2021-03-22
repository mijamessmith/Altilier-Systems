CREATE TABLE IF NOT EXISTS reviews (
  review_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id int NOT NULL,
  rating SMALLINT NOT NULL,
  date date NOT NULL,
  summary varchar (50) NOT NULL,
  body varchar (1002) NOT NULL,
  recommend varchar(5) not null,
  reported varchar(5) NOT NULL,
  reviewer_name varchar(40) NOT NULL,
  reviewer_email varchar(320) NOT NULL,
  response varchar(500) DEFAULT null,
  helpfulness int DEFAULT 0
);

INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (2, 4, '1998-10-10', 'something', 'bad', 'true', 'false', 'jake', 'm@m', null, 2
);

\copy reviews (review_id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '//Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredReview.csv' Header DELIMITER ',' CSV;

CREATE INDEX product_idx ON reviews (product_id);

CREATE TABLE IF NOT EXISTS p (
  id SERIAL NOT NULL PRIMARY KEY,
  photo_id int NOT NULL,
  review_id int NOT NULL,
  url varchar(255)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL NOT NULL PRIMARY KEY,
  photo_id int NOT NULL,
  review_id int NOT NULL,
  url varchar(255),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

\copy p (photo_id,review_id,url) FROM '//Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredPhotos.csv' Header DELIMITER ',' CSV;

INSERT INTO photos SELECT * FROM p WHERE EXISTS (SELECT review_id from reviews WHERE p.review_id = reviews.review_id);

 EXPLAIN ANALYZE SELECT * FROM reviews, photos WHERE reviews.product_id = 1000000 AND reviews.review_id = photos.review_id ORDER BY date DESC LIMIT 5;

 CREATE TABLE characteristics (
  characteristic_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(30) NOT NULL
);

\copy characteristics (characteristic_id,product_id,name) FROM '//Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredCharacteristics.csv' DELIMITER ',' CSV;

CREATE TABLE c_reviews (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  rating SMALLINT NOT NULL,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (characteristic_id)
);

\copy c_reviews (id,characteristic_id,review_id,rating) FROM '//Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredCharacteristicReviews.csv' DELIMITER ',' CSV;