const router = require('express').Router();
const { createReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware');
const { reviewSchema } = require('../validators/review');



// public route: get reviews (optionally filter by movie)
router.get('/', getReviews);

// protected routes (require a valid JWT):
router.post('/', authenticateToken, validate(reviewSchema), createReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);

module.exports = router;
