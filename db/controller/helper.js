

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

module.exports.formatReviewPostArray = formatReviewPostArray;