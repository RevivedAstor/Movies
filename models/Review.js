const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: String, required: true },       // The TMDB movie ID (as string or number)
  movieTitle: { type: String },             
  rating: { type: Number, min: 1, max: 10, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);