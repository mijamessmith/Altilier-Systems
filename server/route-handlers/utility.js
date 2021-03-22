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
  console.log(results);
  return results;
}

var sortReviews = (order) => {
  if (order === 'newest') {

  }
}

var sortByDate = (reviews) => {
  reviews.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date);
  })


  var dates = [];
  for (let reviews of reviews) {
    dates.push(review.date);
  }
  dates.sort()
}

var sortByHelpfullness = (reviews) => {

}

var sortByRelevant = (reviews) => {

}

module.exports.formatReviewsForResponse = formatReviewsForResponse;