const axios = require('axios');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

async function searchMovies(query) {
  const { data } = await tmdb.get('/search/movie', { params: { query } });
  return data.results;
}

async function getMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos' },
  });

  const videos = data.videos?.results ?? [];
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    releaseDate: data.release_date,
    posterPath: data.poster_path,
    trailerUrl,
  };
}

module.exports = { searchMovies, getMovieDetails };
