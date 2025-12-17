# 🧠 Data Structures & Algorithms (DSA) in MoodMaze

MoodMaze is not just a UI wrapper for an API; it employs core Computer Science concepts to deliver personalized, efficient, and intelligent movie recommendations.

This document outlines the specific Data Structures and Algorithms used in this project, where they are located, and why they were chosen.

---

## 1. Max-Heap (Priority Queue)

### 📍 Location
*   **File**: `src/lib/dsa.js`
*   **Class**: `MovieHeap`

### 💡 Concept
A **Max-Heap** is a specialized tree-based data structure that satisfies the heap property: for any given node, the value of the parent is greater than or equal to the value of the child nodes. This ensures the root node always contains the maximum element.

### ❓ Why We Used It
When a user finishes the quiz, we might fetch dozens or hundreds of movies. We calculate a "match score" for each.
*   **Efficiency**: We need to show the user the *best* match first. A Max-Heap allows us to retrieve the highest-scoring movie (`pop()`) in **O(log N)** time (after the root is removed and heap re-balanced) or **O(1)** to just peek at it.
*   **Responsiveness**: Unlike sorting the entire list (O(N log N)) every time a change happens, a heap efficiently maintains the order. If we dynamically added movies, the heap would handle it gracefully.

---

## 2. Weighted Scoring Algorithm (Heuristic Search)

### 📍 Location
*   **File**: `src/lib/dsa.js`
*   **Function**: `calculateScore(movie, answers)`

### 💡 Concept
This is a **Heuristic Algorithm**. It assigns a numerical weight to an item based on a set of criteria to estimate its "fitness" or relevance to the search query.

### ❓ Why We Used It
There is no single "perfect" movie. Correctness is subjective.
*   **Algorithm**: We convert qualitative user inputs (e.g., "I want a mind-bending vibe") into quantitative data.
    *   *Base Score*: Movie Rating (0-100)
    *   *Bonuses*: Genre match (+20), Keyword match (+30), Era match (+15)
    *   *Penalties*: "Safe" preference vs. "Risky" content
*   This creates a custom ranking that is unique to every user session, solving the "Discovery Problem" better than a simple filter.

---

## 3. Hash Sets (O(1) Lookups)

### 📍 Location
*   **File**: `src/lib/dsa.js` (`RecommendationEngine` class)
*   **File**: `src/pages/ScreeningRoom.jsx` (`excludedIds` logic)

### 💡 Concept
A **Set** is a collection of unique values. Internally implemented as a Hash Table, it allows for constant-time complexity **O(1)** for insertions and lookups.

### ❓ Why We Used It
*   **Duplicate Prevention**: We need to ensure the user *never* sees a movie they have already rejected or saved to their library.
*   **Performance**: If we used an Array (`list.includes(id)`), the check would be **O(N)**. With thousands of movies or history items, this becomes slow. A Set allows us to check `excludedIds.has(movie.id)` instantly, regardless of how many movies the user has seen settings.

---

## 4. Decision Tree (Implicit)

### 📍 Location
*   **File**: `src/pages/Quiz.jsx`
*   **Structure**: `questions` array

### 💡 Concept
A **Decision Tree** is a flowchart-like structure in which each internal node represents a "test" on an attribute, and each branch represents the outcome of the test.

### ❓ Why We Used It
*   **Guided Search**: Instead of overwhelming the user with filters, we traverse a tree:
    1.  *Who with?* (Filters Content Rating/Genre)
    2.  *Vibe?* (Filters Keywords/Tone)
    3.  *Energy?* (Filters Pacing/Genre)
*   This creates a path that narrows down the search space logarithmically or heuristically, preventing decision fatigue.

---

## 5. State Management (Observer Pattern)

### 📍 Location
*   **File**: `src/store/useStore.js`
*   **Library**: `Zustand`

### 💡 Concept
The **Observer Pattern** allows objects (components) to subscribe to state changes in a central subject (the store). When state changes, all dependents are notified and updated automatically.

### ❓ Why We Used It
*   **Consistency**: `ScreeningRoom` needs to know if `Sound` is on. `Header` needs to show the `Library` count.
*   **Decoupling**: Validates the Separation of Concerns principle. The logic for *how* a movie is added to the library is separated from the *UI* that triggers it.

