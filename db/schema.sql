/* The following allows migration of one table to another based on existance of id in another table*/
INSERT INTO review_photos SELECT * FROM photos WHERE EXISTS (SELECT review_id from reviews WHERE photos.review_id = reviews.review_id);

/* Inserting into review/photo table */
INSERT INTO reviews_and_photos SELECT reviews.product_id, reviews.review_id, review_photos.url
FROM reviews INNER JOIN review_photos ON (reviews.review_id = review_photos.review_id);


/* The gets the entire review data back, but is expensive at low ids and cheap at high*/
EXPLAIN ANALYZE SELECT * FROM reviews INNER JOIN review_photos ON reviews.review_id = review_photos.review_id AND reviews.product_id = 3;

EXPLAIN ANALYZE SELECT * FROM reviews LEFT JOIN review_photos ON reviews.review_id = review_photos.review_id AND reviews.product_id = 11;

EXPLAIN ANALYZE SELECT * FROM reviews RIGHT JOIN review_photos ON reviews.review_id = review_photos.review_id AND reviews.product_id = 12;

SELECT * FROM reviews INNER JOIN review_photos ON reviews.product_id = 1;

/* Without the join */

SELECT * FROM reviews, review_photos WHERE reviews.product_id = 48 AND reviews.review_id = review_photos.review_id;

WITH reviews AS (
  SELECT * FROM
), photo AS (
  SELECT
)

CREATE TABLE IF NOT EXISTS reviews_and_photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INT NOT NULL,
  product_id INT NOT NULL,
  url varchar(255) NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);



CREATE INDEX review.idx on review_photos (review_id);

ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id);
/* Characteristics  */

SELECT * FROM characteristics_reviews INNER JOIN characteristics ON characteristics.product_id = 342 AND characteristics.characteristic_id = characteristics_reviews.characteristic_id;

SELECT characteristics.characteristic, characteristics.characteristic_id, characteristics_reviews.rating FROM characteristics_reviews INNER JOIN characteristics ON characteristics.product_id = 342 AND characteristics.characteristic_id = characteristics_reviews.characteristic_id;

/* Metadata */

SELECT rating, recommend FROM reviews WHERE product_id = 3;

SELECT AVG (characteristics_reviews.rating) FROM characteristics INNER JOIN characteristics_reviews ON characteristics.product_id = 2 AND characeristics.characteristic = 'Fit';



/* Mikey statments below*/

WITH styles AS (
      SELECT * FROM style WHERE product_id = ${product_id}
    ), photo AS (
      SELECT
        GROUP_CONCAT(photos.url) AS pic,
        GROUP_CONCAT(photos.thumbnail_url) AS thic,
        photos.style_id AS extra
        FROM photos
         JOIN styles
         ON photos.style_id = styles.style_id
        GROUP BY photos.style_id
    ), skuss AS (
      SELECT
        GROUP_CONCAT(SKUS.SKU_id) AS skuId,
        GROUP_CONCAT(SIZE) AS skuSize,
        GROUP_CONCAT(quantity) AS skuQuantity,
        SKUS.style_id AS extra
        FROM SKUS
         JOIN styles
         ON SKUS.style_id = styles.style_id
         GROUP BY SKUS.style_id
    )
    SELECT * FROM styles INNER JOIN photo, skuss WHERE photo.extra = styles.style_id AND skuss.extra = styles.style_id;


     SELECT table1.*, table2.first_name
     FROM table1
LEFT JOIN table2

