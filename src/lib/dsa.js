/**
 * MoodMaze DSA Engine
 * Implements Max-Heap Priority Queue for movie recommendations
 */

// ============================================
// 1. MAX-HEAP IMPLEMENTATION
// ============================================

export class MovieHeap {
    constructor() {
        this.heap = [];
    }

    // Get the size of the heap
    size() {
        return this.heap.length;
    }

    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Swap two elements in the heap
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Push a movie into the heap
    push(movie) {
        this.heap.push(movie);
        this.bubbleUp(this.heap.length - 1);
    }

    // Bubble up to maintain max-heap property
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            // If current score is greater than parent, swap
            if (this.heap[index].score > this.heap[parentIndex].score) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Pop the highest-scored movie (root)
    pop() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return max;
    }

    // Bubble down to maintain max-heap property
    bubbleDown(index) {
        while (true) {
            let largest = index;
            const leftChild = this.getLeftChildIndex(index);
            const rightChild = this.getRightChildIndex(index);

            // Check if left child is larger
            if (
                leftChild < this.heap.length &&
                this.heap[leftChild].score > this.heap[largest].score
            ) {
                largest = leftChild;
            }

            // Check if right child is larger
            if (
                rightChild < this.heap.length &&
                this.heap[rightChild].score > this.heap[largest].score
            ) {
                largest = rightChild;
            }

            // If largest is not current index, swap and continue
            if (largest !== index) {
                this.swap(index, largest);
                index = largest;
            } else {
                break;
            }
        }
    }

    // Peek at the top movie without removing it
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    // Clear the heap
    clear() {
        this.heap = [];
    }
}

// ============================================
// 2. SCORING ALGORITHM
// ============================================

/**
 * Calculate a score for a movie based on user's quiz answers
 * @param {Object} movie - Movie object from TMDB
 * @param {Object} answers - User's quiz answers
 * @returns {number} - Calculated score
 */
export function calculateScore(movie, answers) {
    let score = movie.vote_average * 10; // Base score from rating (0-100)

    // Add popularity bonus (normalized)
    score += Math.min(movie.popularity / 10, 50);

    // ========================================
    // QUESTION 1: SOCIAL CONTEXT
    // ========================================
    if (answers.social === 'family') {
        // Penalize adult content heavily
        if (movie.adult) {
            score -= 1000;
        }
        // Boost family-friendly genres
        const familyGenres = [16, 10751, 12]; // Animation, Family, Adventure
        if (movie.genre_ids?.some(id => familyGenres.includes(id))) {
            score += 30;
        }
    } else if (answers.social === 'date') {
        // Boost romance and drama
        const dateGenres = [10749, 18]; // Romance, Drama
        if (movie.genre_ids?.some(id => dateGenres.includes(id))) {
            score += 25;
        }
    } else if (answers.social === 'solo') {
        // Boost thought-provoking genres
        const soloGenres = [878, 9648, 53]; // Sci-Fi, Mystery, Thriller
        if (movie.genre_ids?.some(id => soloGenres.includes(id))) {
            score += 20;
        }
    } else if (answers.social === 'friends') {
        // Boost comedy and action
        const friendsGenres = [35, 28]; // Comedy, Action
        if (movie.genre_ids?.some(id => friendsGenres.includes(id))) {
            score += 25;
        }
    }

    // ========================================
    // QUESTION 2: VIBE
    // ========================================
    const overview = movie.overview?.toLowerCase() || '';
    const title = movie.title?.toLowerCase() || '';

    if (answers.vibe === 'mind-bending') {
        const mindKeywords = ['mystery', 'twist', 'psychological', 'mind', 'reality', 'dream'];
        const hasKeyword = mindKeywords.some(kw => overview.includes(kw) || title.includes(kw));
        if (hasKeyword) score += 30;

        // Boost mystery and thriller genres
        if (movie.genre_ids?.some(id => [9648, 53, 878].includes(id))) {
            score += 20;
        }
    } else if (answers.vibe === 'feel-good') {
        const feelGoodKeywords = ['love', 'friendship', 'hope', 'heartwarming', 'inspiring'];
        const hasKeyword = feelGoodKeywords.some(kw => overview.includes(kw) || title.includes(kw));
        if (hasKeyword) score += 25;

        // Boost comedy, romance, family
        if (movie.genre_ids?.some(id => [35, 10749, 10751].includes(id))) {
            score += 20;
        }
    } else if (answers.vibe === 'adrenaline') {
        // Boost action, thriller, adventure
        if (movie.genre_ids?.some(id => [28, 53, 12].includes(id))) {
            score += 30;
        }
    } else if (answers.vibe === 'emotional') {
        // Boost drama and romance
        if (movie.genre_ids?.some(id => [18, 10749].includes(id))) {
            score += 25;
        }
    }

    // ========================================
    // QUESTION 3: ENERGY LEVEL
    // ========================================
    if (answers.energy === 'low') {
        // Prefer slower-paced, contemplative films
        if (movie.genre_ids?.some(id => [18, 10749, 36].includes(id))) { // Drama, Romance, History
            score += 20;
        }
        // Penalize high-action genres
        if (movie.genre_ids?.some(id => [28, 12].includes(id))) {
            score -= 15;
        }
    } else if (answers.energy === 'medium') {
        // Balanced - slight boost to adventure and comedy
        if (movie.genre_ids?.some(id => [12, 35, 14].includes(id))) {
            score += 15;
        }
    } else if (answers.energy === 'high') {
        // Boost action-packed genres
        if (movie.genre_ids?.some(id => [28, 12, 878].includes(id))) { // Action, Adventure, Sci-Fi
            score += 25;
        }
    }

    // ========================================
    // QUESTION 4: ERA PREFERENCE
    // ========================================
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 0;

    if (answers.era === 'classic' && releaseYear < 1990) {
        score += 30;
    } else if (answers.era === '90s-2000s' && releaseYear >= 1990 && releaseYear <= 2010) {
        score += 30;
    } else if (answers.era === 'modern' && releaseYear > 2010) {
        score += 30;
    } else if (answers.era === 'any') {
        // No penalty or bonus
        score += 5;
    }

    // ========================================
    // QUESTION 5: RISK TOLERANCE
    // ========================================
    if (answers.risk === 'safe') {
        // Prefer popular, well-rated movies
        if (movie.vote_count > 5000 && movie.vote_average >= 7) {
            score += 35;
        }
    } else if (answers.risk === 'balanced') {
        // Moderate popularity
        if (movie.vote_count > 1000 && movie.vote_average >= 6.5) {
            score += 20;
        }
    } else if (answers.risk === 'high-risk') {
        // Hidden gems - lower vote count but decent rating
        if (movie.vote_count < 3000 && movie.vote_average >= 6.5) {
            score += 40;
        }
    }

    return Math.round(score);
}

// ============================================
// 3. GENRE MAPPING (TMDB Genre IDs)
// ============================================

export const GENRE_MAP = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

/**
 * Get genre names from genre IDs
 */
export function getGenreNames(genreIds) {
    if (!genreIds || !Array.isArray(genreIds)) return [];
    return genreIds.map(id => GENRE_MAP[id]).filter(Boolean);
}

// ============================================
// 4. RECOMMENDATION ENGINE
// ============================================

export class RecommendationEngine {
    constructor() {
        this.heap = new MovieHeap();
        this.rejectedIds = new Set();
        this.currentBatch = [];
    }

    /**
     * Initialize the heap with scored movies
     */
    initialize(movies, answers, rejectedIds = []) {
        this.heap.clear();
        this.rejectedIds = new Set(rejectedIds);
        this.currentBatch = [];

        // Score and add movies to heap
        movies.forEach(movie => {
            // Skip if already rejected
            if (this.rejectedIds.has(movie.id)) {
                return;
            }

            // Calculate score
            const score = calculateScore(movie, answers);

            // Add to heap with score
            this.heap.push({
                ...movie,
                score,
                matchReason: this.generateMatchReason(movie, answers)
            });
        });
    }

    /**
     * Get the next best movie
     */
    getNextMovie() {
        return this.heap.pop();
    }

    /**
     * Mark a movie as rejected
     */
    rejectMovie(movieId) {
        this.rejectedIds.add(movieId);
    }

    /**
     * Get rejected movie IDs
     */
    getRejectedIds() {
        return Array.from(this.rejectedIds);
    }

    /**
     * Generate a human-readable match reason
     */
    generateMatchReason(movie, answers) {
        const reasons = [];

        // Add vibe reason
        if (answers.vibe) {
            reasons.push(`${answers.vibe} vibe`);
        }

        // Add genre reason
        const genres = getGenreNames(movie.genre_ids);
        if (genres.length > 0) {
            reasons.push(genres[0]);
        }

        // Add era reason
        if (answers.era && answers.era !== 'any') {
            reasons.push(`${answers.era} era`);
        }

        return reasons.join(' • ');
    }
}
