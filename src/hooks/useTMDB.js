import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance
const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

/**
 * Fetch popular movies (multiple pages for better heap data)
 */
export async function fetchPopularMovies(pages = 4) {
    try {
        const requests = [];
        for (let page = 1; page <= pages; page++) {
            requests.push(
                tmdbApi.get('/movie/popular', {
                    params: { page }
                })
            );
        }

        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(response => response.data.results);

        return allMovies;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

/**
 * Fetch top rated movies
 */
export async function fetchTopRatedMovies(pages = 4) {
    try {
        const requests = [];
        for (let page = 1; page <= pages; page++) {
            requests.push(
                tmdbApi.get('/movie/top_rated', {
                    params: { page }
                })
            );
        }

        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(response => response.data.results);

        return allMovies;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
}

/**
 * Fetch movies by genre
 */
export async function fetchMoviesByGenre(genreId, pages = 2) {
    try {
        const requests = [];
        for (let page = 1; page <= pages; page++) {
            requests.push(
                tmdbApi.get('/discover/movie', {
                    params: {
                        with_genres: genreId,
                        page
                    }
                })
            );
        }

        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(response => response.data.results);

        return allMovies;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        throw error;
    }
}

/**
 * Search movies
 */
export async function searchMovies(query) {
    try {
        const response = await tmdbApi.get('/search/movie', {
            params: { query }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

/**
 * Get movie details
 */
export async function getMovieDetails(movieId) {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits,videos,similar'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

/**
 * Fetch mixed movies based on quiz answers
 * @param {Object} quizAnswers - User's quiz answers
 */
export async function fetchMixedMovies(quizAnswers = {}) {
    try {
        // Map quiz answers to TMDB parameters
        const params = mapQuizToTMDBParams(quizAnswers);

        // Fetch movies with filters
        const requests = [];

        // Get 3 pages of results for variety
        for (let page = 1; page <= 3; page++) {
            requests.push(
                tmdbApi.get('/discover/movie', {
                    params: {
                        ...params,
                        page,
                        include_adult: false,
                        'vote_count.gte': 50 // Ensure quality movies
                    }
                })
            );
        }

        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(response => response.data.results);

        // Remove duplicates
        const unique = Array.from(
            new Map(allMovies.map(movie => [movie.id, movie])).values()
        );

        return unique;
    } catch (error) {
        console.error('Error fetching mixed movies:', error);
        throw error;
    }
}

/**
 * Map quiz answers to TMDB API parameters
 * @param {Object} quizAnswers - User's quiz answers
 */
function mapQuizToTMDBParams(quizAnswers) {
    const params = {
        sort_by: 'popularity.desc'
    };

    // Map vibe to genres
    const vibeGenreMap = {
        'mind-bending': '878,9648', // Sci-Fi, Mystery
        'feel-good': '35,10751', // Comedy, Family
        'adrenaline': '28,53', // Action, Thriller
        'emotional': '18,10749' // Drama, Romance
    };

    if (quizAnswers.vibe && vibeGenreMap[quizAnswers.vibe]) {
        params.with_genres = vibeGenreMap[quizAnswers.vibe];
    }

    // Map era to year ranges
    const eraYearMap = {
        'classic': { start: 1950, end: 1989 },
        '90s-2000s': { start: 1990, end: 2009 },
        'modern': { start: 2010, end: new Date().getFullYear() },
        'any': null
    };

    if (quizAnswers.era && eraYearMap[quizAnswers.era]) {
        const yearRange = eraYearMap[quizAnswers.era];
        if (yearRange) {
            params['primary_release_date.gte'] = `${yearRange.start}-01-01`;
            params['primary_release_date.lte'] = `${yearRange.end}-12-31`;
        }
    }

    // Map risk to rating
    const riskRatingMap = {
        'safe': 7.5,
        'balanced': 6.5,
        'high-risk': 5.0
    };

    if (quizAnswers.risk && riskRatingMap[quizAnswers.risk]) {
        params['vote_average.gte'] = riskRatingMap[quizAnswers.risk];
    }

    // Map energy to sort order
    if (quizAnswers.energy === 'low') {
        params.sort_by = 'vote_average.desc'; // Highly rated, slower pace
    } else if (quizAnswers.energy === 'high') {
        params.sort_by = 'popularity.desc'; // Popular, fast-paced
    }

    return params;
}

/**
 * Check if API key is configured
 */
export function isApiKeyConfigured() {
    return !!TMDB_API_KEY && TMDB_API_KEY !== 'undefined';
}

// ============================================
// DEMO DATA (for when API key is not set)
// ============================================

export const DEMO_MOVIES = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        vote_average: 8.7,
        vote_count: 24000,
        popularity: 85.5,
        release_date: "1994-09-23",
        genre_ids: [18, 80],
        adult: false
    },
    {
        id: 2,
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        vote_average: 8.4,
        vote_count: 32000,
        popularity: 95.2,
        release_date: "2010-07-16",
        genre_ids: [28, 878, 53],
        adult: false
    },
    {
        id: 3,
        title: "The Dark Knight",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
        vote_average: 9.0,
        vote_count: 28000,
        popularity: 92.8,
        release_date: "2008-07-18",
        genre_ids: [28, 80, 18],
        adult: false
    },
    {
        id: 4,
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
        vote_average: 8.9,
        vote_count: 25000,
        popularity: 88.4,
        release_date: "1994-10-14",
        genre_ids: [80, 18],
        adult: false
    },
    {
        id: 5,
        title: "Forrest Gump",
        overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        backdrop_path: "/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
        vote_average: 8.8,
        vote_count: 24500,
        popularity: 82.1,
        release_date: "1994-07-06",
        genre_ids: [18, 10749],
        adult: false
    },
    {
        id: 6,
        title: "The Matrix",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop_path: "/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
        vote_average: 8.7,
        vote_count: 23000,
        popularity: 90.5,
        release_date: "1999-03-31",
        genre_ids: [28, 878],
        adult: false
    },
    {
        id: 7,
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
        vote_average: 8.6,
        vote_count: 29000,
        popularity: 94.7,
        release_date: "2014-11-07",
        genre_ids: [12, 18, 878],
        adult: false
    },
    {
        id: 8,
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
        vote_average: 8.7,
        vote_count: 17000,
        popularity: 78.3,
        release_date: "1972-03-24",
        genre_ids: [18, 80],
        adult: false
    },
];

export default tmdbApi;
