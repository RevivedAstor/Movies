const router = require('express').Router();

const authenticateToken = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { reviewSchema } = require('../validators/review');

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

router.get('/', getReviews);

router.post('/', authenticateToken, validate(reviewSchema), createReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);

module.exports = router;
