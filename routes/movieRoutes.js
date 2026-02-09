const router = require('express').Router();
const { searchMovies, getMovieDetails } = require('../services/tmdbService');

router.get('/search', async (req, res, next) => {
  try {
    const q = req.query.query;
    if (!q) return res.status(400).json({ message: "Missing query parameter: query" });
    const results = await searchMovies(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const details = await getMovieDetails(req.params.id);
    res.json(details);
  } catch (err) {
    next(err);
  }
});

module.exports = router;