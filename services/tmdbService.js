const axios = require('axios');
const { tmdbKey } = require('../config/config');
const BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data.results;  // array of movies
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${tmdbKey}&append_to_response=videos`;
  // append_to_response=videos will include trailers in the same call
  const response = await axios.get(url);
  const data = response.data;
  // if videos are included, extract the first YouTube trailer if available
  let trailerUrl = null;
  if (data.videos && data.videos.results) {
    const trailers = data.videos.results.filter(v => v.site === 'YouTube' && v.type === 'Trailer');
    if (trailers.length > 0) {
      trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
    }
  }
  // return combined info: details + trailer URL
  return { 
    title: data.title,
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    trailerUrl: trailerUrl
  };
}

module.exports = { searchMovies, getMovieDetails };