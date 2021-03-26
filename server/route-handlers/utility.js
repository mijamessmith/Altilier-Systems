var combineReviewsAndPhotos = (reviews, photos) => {
  let result = []
  for(let review of reviews) {
    review.photos = [];
    for (let photo of photos)
    photos.filter(photo => {
      photo.review_id === review.review_id;
    })
    result.push(review)
  }
  return result;
}

var formatReviewsForResponse = (reviews, id, page, count) => {
  let response = {}
  response.product = id;
  response.page = page;
  response.count = count;
  var results = []
  for (let review of reviews) {
    let obj = {}
    obj.review_id = review.review_id;
    obj.rating = review.rating;
    obj.summary = review.summary;
    review.recommend === "0" ? obj.recommend = false : obj.recommend = true;
    review.response === 'null' ? obj.response = null : obj.response = review.response;
    obj.body = review.body;
    obj.date = review.date;
    obj.reviewer_name = review.reviewer_name;
    obj.helpfulness = review.helpfulness;
    obj.photos = [
      {
        id: review.id,
        url: review.url
      }
    ]
    results.push(obj);
  }
  return results;
}

var formatMetadataResponse = (cReviews, id) => {
  let result = {}
  result.product_id = id

}

var formatCharacteristics = (c) => {

  var averageCharRatings = (c) => {
    let ratings = {}
    for (let r of c) {
      if (ratings[r.name] === undefined) {
        ratings[r.name] = {};
        ratings[r.name].id = r.characteristic_id;
        ratings[r.name].value = [];
        ratings[r.name].value.push(r.rating);
        //do other work
        r.recommend === '0' ? output.recommended["0"]++ : output.recommended["1"]++;
        if (output.ratings[r.rating] === undefined) {
          output.ratings[r.rating] = 0
        } else {
          output.ratings[r.rating]++;
        }
      } else {
        ratings[r.name].value.push(r.rating);
        r.recommend === '0' ? output.recommended["0"]++ : output.recommended["1"]++;
        if (output.ratings[r.rating] === undefined) {
          output.ratings[r.rating] = 0
        } else {
          output.ratings[r.rating]++;
        }
      }
    }
    for (let char in ratings) {
      ratings[char].value = String(
        (ratings[char].value.reduce((a, b) => a + b, 0)) / ratings[char].value.length
      )
    }
    return ratings;
  }
  var output = {};
  output.recommended = {
    0: 0,
    1: 0,
  };
  output.ratings = {};
  output.characteristics = averageCharRatings(c);
  return output;
}

var formatReviewPostArray = (review) => {
  review.reported = 'false';
  review.helpfulness = 0;
  review.date = new Date().toISOString();
  review.response = null;
  review.recommend = true ? review.recommend = "true" : review.recommend = "false";

  let postArray = [];
  var order = ['product_id', 'rating', 'date', 'summary', 'body', 'recommend', 'reported', 'name', 'email', 'response', 'helpfulness'];

  for (let i = 0; i < order.length; i++) {
    postArray.push(review[order[i]]);
  }

  return postArray;
}

module.exports.formatReviewsForResponse = formatReviewsForResponse;
module.exports.formatCharacteristics = formatCharacteristics;
module.exports.formatReviewPostArray = formatReviewPostArray;