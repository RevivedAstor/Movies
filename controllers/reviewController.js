const Review = require('../models/Review');

// create a new review
exports.createReview = async (req, res, next) => {
  try {
    const userId = req.user.userId;  // from authMiddleware
    const { movieId, movieTitle, rating, comment } = req.body;
    if (!movieId || !rating || !comment) {
      return res.status(400).json({ message: "movieId, rating, and comment are required." });
    }
    const newReview = await Review.create({
      user: userId,
      movieId,
      movieTitle,
      rating,
      comment
    });
    res.status(201).json({ message: "Review created", review: newReview });
  } catch (err) {
    next(err);
  }
};

// get all reviews (or for a specific movie)
exports.getReviews = async (req, res, next) => {
  try {
    const { movieId } = req.query;
    let filter = {};
    if (movieId) {
      filter.movieId = movieId;
    }
    // populate user info (e.g., name) if needed
    const reviews = await Review.find(filter).populate('user', 'name email');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// update a review (by ID)
exports.updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }
    // update allowed fields
    const { rating, comment } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();
    res.json({ message: "Review updated", review });
  } catch (err) {
    next(err);
  }
};

// delete a review
exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};
