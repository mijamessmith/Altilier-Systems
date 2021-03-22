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

var formatReviewsForResponse = (reviews, count=5, page=1, sort) => {
  if (reviews.length > count) {
    reviews = reviews.slice(0, count);
  }
  let result = {};
  result.product = reviews[0].product_id;
  result.page = page;
  result.count = count;
  result.results = [];


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

module.exports.combineReviewsAndPhotos = combineReviewsAndPhotos;