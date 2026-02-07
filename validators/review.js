const Joi = require('joi');

const reviewSchema = Joi.object({
  movieId: Joi.string().required(),
  movieTitle: Joi.string().allow(''),  // optional (allow empty or undefined)
  rating: Joi.number().min(1).max(10).required(),
  comment: Joi.string().min(1).required()
});

module.exports = { reviewSchema };
