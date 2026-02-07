const router = require('express').Router();
const { searchMovies, getMovieDetails } = require('../services/tmdbService');
const authenticateToken = require('../middleware/authMiddleware');  // optional, maybe protect these routes if needed

// search for movies by title (public)
router.get('/search', async (req, res, next) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const results = await searchMovies(query);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// get movie details by TMDB ID (public)
router.get('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const details = await getMovieDetails(movieId);
    res.json(details);
  } catch (err) {
    next(err);
  }
});

module.exports = router;