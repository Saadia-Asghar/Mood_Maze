# 🧠 DSA Code Walkthrough: The "Brain" of MoodMaze

This document breaks down the specific code files where Data Structures & Algorithms are implemented. Use this to show your examiner exactly *where* the magic happens.

---

## 1. The Priority Queue (Max-Heap)
**File:** `src/lib/dsa.js`

### What is it?
A Max-Heap is a smart binary tree where the "parent" is always bigger than its children. This ensures the highest-scored movie is ALWAYS at the root (index 0).

### The Code Implementation
```javascript
export class MovieHeap {
    constructor() {
        this.heap = [];
    }

    // ⚡ O(log n) - Insert a movie
    push(movie) {
        this.heap.push(movie);
        // "Bubble Up": Move the new movie UP the tree until it finds its spot
        this.bubbleUp(this.heap.length - 1);
    }

    // ⚡ O(1) - Get the BEST movie (Root)
    pop() {
        if (this.isEmpty()) return null;
        
        // Take the top movie (Max)
        const max = this.heap[0];
        
        // Move the last movie to the top
        this.heap[0] = this.heap.pop();
        
        // "Bubble Down": Move it DOWN until the heap property is fixed
        this.bubbleDown(0);
        
        return max;
    }

    // This ensures the "Max-Heap" property (Parent > Child)
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].score > this.heap[parentIndex].score) {
                // Swap if child is bigger than parent
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }
}
```

### 🗣️ What to say:
> "We implemented a `MovieHeap` class from scratch. We didn't use a library. `push` adds a movie in **O(log N)** time using `bubbleUp`, and `pop` removes the best match in **O(log N)** using `bubbleDown`. This allows us to handle thousands of movies efficiently."

---

## 2. The Weighted Scoring Algorithm (Heuristic Search)
**File:** `src/lib/dsa.js`

### What is it?
This is the math that assigns a "Compatibility Score" to every movie. It frames the recommendation problem as a **Weighted Search**.

### The Code Implementation
```javascript
export function calculateScore(movie, answers) {
    // 1. Base Score: Start with the movie's rating (0-100)
    let score = movie.vote_average * 10; 

    // 2. Social Context Rules
    if (answers.social === 'family') {
        // 🛡️ FILTERING (Negative Weight)
        // If it's an Adult movie for a Family... DESTROY the score
        if (movie.adult) {
            score -= 1000; 
        }
        // Boost Animation/Family genres
        if (movie.genre_ids.includes(16)) score += 30; // Animation
    }

    // 3. Vibe Rules (Pattern Matching)
    // We check keywords in the movie overview (plot)
    const overview = movie.overview.toLowerCase();
    
    if (answers.vibe === 'mind-bending') {
        // 🔍 STRING MATCHING (Heuristic)
        // Boost if plot contains specific words
        const keywords = ['mystery', 'twist', 'psychological', 'dream'];
        if (keywords.some(kw => overview.includes(kw))) {
            score += 30;
        }
    }

    // 4. Energy Levels
    if (answers.energy === 'low') {
        // Boost slow movies (Drama, Romance)
        if (movie.genre_ids.includes(18)) score += 20;
        // Penalize loud movies (Action)
        if (movie.genre_ids.includes(28)) score -= 15;
    }

    return Math.round(score);
}
```

### 🗣️ What to say:
> "We convert qualitative user preferences (like 'Chill Vibe') into quantitative weights. We apply positive weights (+30) for matches and massive negative weights (-1000) for hard constraints like age restrictions. This is similar to how a **Neural Network** weighs inputs, but simplified for our specific logic."

---

## 3. The Hash Set (O(1) Lookup)
**File:** `src/store/useStore.js` and `src/lib/dsa.js`

### What is it?
We need to remember which movies the user has *already seen or rejected* so we don't show them again.

### The Code Implementation
```javascript
// In RecommendationEngine class
constructor() {
    this.heap = new MovieHeap();
    // ⚡ SET DATA STRUCTURE
    this.rejectedIds = new Set(); 
}

initialize(movies, answers, rejectedIds) {
    // Convert array to Set for fast access
    this.rejectedIds = new Set(rejectedIds);
    
    movies.forEach(movie => {
        // ⚡ O(1) LOOKUP
        // "Is this movie in the trash?"
        // checking set.has() is instant, unlike array.includes() which is slow
        if (this.rejectedIds.has(movie.id)) {
            return; // Skip it
        }
        // ... score and push to heap ...
    });
}
```

### 🗣️ What to say:
> "We utilize a JavaScript `Set`—which is a Hash Set implementation under the hood—to store rejected movie IDs. This allows us to check if a movie should be filtered out in **O(1) constant time**, preventing performance degradation as the user swipes through hundreds of movies."

---

## 4. The Recommendation Engine Class (The Controller)
**File:** `src/lib/dsa.js`

### The Code Implementation
```javascript
export class RecommendationEngine {
    constructor() {
        this.heap = new MovieHeap();
    }

    // The Main Pipeline
    initialize(movies, answers) {
        // 1. Clear Heap
        this.heap.clear();
        
        // 2. Process Every Movie
        movies.forEach(movie => {
            // A. Check Hash Set (Filter)
            if (this.isRejected(movie)) return;

            // B. Calculate Weight (Score)
            const score = calculateScore(movie, answers);

            // C. Insert into Priority Queue
            this.heap.push({ ...movie, score });
        });
    }

    getNextMovie() {
        // ⚡ Get Max Logic
        return this.heap.pop();
    }
}
```

### 🗣️ What to say:
> "This Class encapsulates our entire Algorithm. It effectively turns an unsorted list of API data into an ordered Priority Queue based on the user's specific quiz inputs."
