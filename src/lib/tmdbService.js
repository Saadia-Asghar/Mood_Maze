import axios from 'axios';

/**
 * TMDB API Service
 * Fetches movie data from The Movie Database API
 * Get your API key from: https://www.themoviedb.org/settings/api
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Check if TMDB API is configured
 */
export const isTMDBConfigured = () => {
    return !!API_KEY && API_KEY !== 'undefined';
};

/**
 * Get image URL for a movie poster
 * @param {string} path - Poster path from TMDB
 * @param {string} size - Image size (w185, w342, w500, w780, original)
 */
export const getImageUrl = (path, size = 'w500') => {
    if (!path) return '/placeholder-movie.jpg';
    return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

/**
 * Discover movies based on filters
 * @param {Object} filters - Filter options
 */
export const discoverMovies = async (filters = {}) => {
    if (!isTMDBConfigured()) {
        throw new Error('TMDB API key not configured');
    }

    try {
        const params = {
            api_key: API_KEY,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: filters.page || 1,
            ...filters
        };

        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

/**
 * Get movies by genre
 * @param {number} genreId - TMDB genre ID
 * @param {number} page - Page number
 */
export const getMoviesByGenre = async (genreId, page = 1) => {
    return discoverMovies({
        with_genres: genreId,
        page
    });
};

/**
 * Get movies by year range
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @param {number} page - Page number
 */
export const getMoviesByYear = async (startYear, endYear, page = 1) => {
    return discoverMovies({
        'primary_release_date.gte': `${startYear}-01-01`,
        'primary_release_date.lte': `${endYear}-12-31`,
        page
    });
};

/**
 * Get movies by rating
 * @param {number} minRating - Minimum rating (0-10)
 * @param {number} page - Page number
 */
export const getMoviesByRating = async (minRating, page = 1) => {
    return discoverMovies({
        'vote_average.gte': minRating,
        'vote_count.gte': 100, // Ensure enough votes
        page
    });
};

/**
 * Search movies by query
 * @param {string} query - Search query
 * @param {number} page - Page number
 */
export const searchMovies = async (query, page = 1) => {
    if (!isTMDBConfigured()) {
        throw new Error('TMDB API key not configured');
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                query,
                page,
                include_adult: false
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

/**
 * Get movie details by ID
 * @param {number} movieId - TMDB movie ID
 */
export const getMovieDetails = async (movieId) => {
    if (!isTMDBConfigured()) {
        throw new Error('TMDB API key not configured');
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                append_to_response: 'videos,credits,similar'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

/**
 * Get trending movies
 * @param {string} timeWindow - 'day' or 'week'
 */
export const getTrendingMovies = async (timeWindow = 'week') => {
    if (!isTMDBConfigured()) {
        throw new Error('TMDB API key not configured');
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/${timeWindow}`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

/**
 * Get movie genres list
 */
export const getGenres = async () => {
    if (!isTMDBConfigured()) {
        throw new Error('TMDB API key not configured');
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        });
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

/**
 * TMDB Genre IDs for reference
 */
export const GENRES = {
    ACTION: 28,
    ADVENTURE: 12,
    ANIMATION: 16,
    COMEDY: 35,
    CRIME: 80,
    DOCUMENTARY: 99,
    DRAMA: 18,
    FAMILY: 10751,
    FANTASY: 14,
    HISTORY: 36,
    HORROR: 27,
    MUSIC: 10402,
    MYSTERY: 9648,
    ROMANCE: 10749,
    SCIENCE_FICTION: 878,
    TV_MOVIE: 10770,
    THRILLER: 53,
    WAR: 10752,
    WESTERN: 37
};

/**
 * Map quiz answers to TMDB filters
 * @param {Object} quizAnswers - Quiz answers from store
 */
export const mapQuizToFilters = (quizAnswers) => {
    const filters = {
        page: 1,
        'vote_count.gte': 50 // Ensure quality movies
    };

    // Map vibe to genres
    const vibeGenreMap = {
        'laugh': [GENRES.COMEDY],
        'cry': [GENRES.DRAMA, GENRES.ROMANCE],
        'thrill': [GENRES.THRILLER, GENRES.HORROR],
        'think': [GENRES.MYSTERY, GENRES.SCIENCE_FICTION],
        'escape': [GENRES.FANTASY, GENRES.ADVENTURE]
    };

    if (quizAnswers.vibe && vibeGenreMap[quizAnswers.vibe]) {
        filters.with_genres = vibeGenreMap[quizAnswers.vibe].join(',');
    }

    // Map era to year ranges
    const eraYearMap = {
        'classic': { start: 1950, end: 1979 },
        'retro': { start: 1980, end: 1999 },
        'modern': { start: 2000, end: 2014 },
        'recent': { start: 2015, end: new Date().getFullYear() }
    };

    if (quizAnswers.era && eraYearMap[quizAnswers.era]) {
        const { start, end } = eraYearMap[quizAnswers.era];
        filters['primary_release_date.gte'] = `${start}-01-01`;
        filters['primary_release_date.lte'] = `${end}-12-31`;
    }

    // Map risk to rating
    const riskRatingMap = {
        'safe': 7.0,
        'mixed': 6.0,
        'wild': 5.0
    };

    if (quizAnswers.risk && riskRatingMap[quizAnswers.risk]) {
        filters['vote_average.gte'] = riskRatingMap[quizAnswers.risk];
    }

    // Sort by popularity or rating based on energy
    if (quizAnswers.energy === 'chill') {
        filters.sort_by = 'vote_average.desc';
    } else {
        filters.sort_by = 'popularity.desc';
    }

    return filters;
};

export default {
    isTMDBConfigured,
    getImageUrl,
    discoverMovies,
    getMoviesByGenre,
    getMoviesByYear,
    getMoviesByRating,
    searchMovies,
    getMovieDetails,
    getTrendingMovies,
    getGenres,
    mapQuizToFilters,
    GENRES
};
