# 🎓 MoodMaze: Complete Project Viva Guide

This document is your **ultimate study guide** for your project viva. It covers everything from the "why" and "how" of the project to a line-by-line breakdown of the code, with a special focus on **Data Structures and Algorithms (DSA)**.

---

## 🌟 1. Project Overview

**Project Name:** MoodMaze
**Tagline:** "Don't just watch. Discover."
**Core Problem Solved:** The "Netflix Paralysis" problem—spending more time scrolling than watching. MoodMaze solves this by using a **Max-Heap algorithm** to recommend movies based on *mood*, not just history.

### What is it?
A gamified movie discovery web app that asks you 5 simple mood-based questions and then lets you "swipe" (tick/cross) through a personalized feed of movies. It's like Tinder for movies.

---

## 🧠 2. The Core: Data Structures & Algorithms (Major Focus)

**User**: *Why did you choose this logic?*
**You**: *I used a Max-Heap to ensure O(1) time complexity for retrieving recommendations, ensuring the app feels instant.*

### A. Max-Heap (Priority Queue)
*   **Where**: `src/lib/dsa.js` -> `class MovieHeap`
*   **Concept**: A binary tree where every parent node is greater than its children. The "root" is always the highest-scoring element.
*   **Why we use it**:
    *   After scoring 100+ movies, we only care about showing the **best one** first.
    *   Sorting the whole array takes **O(N log N)** time.
    *   Building a heap takes **O(N)**, and popping the top item takes **O(log N)**.
    *   This makes fetching the next suggestion incredibly fast.
*   **Code Implementation**: We manually implemented `push()`, `pop()`, `bubbleUp()`, and `bubbleDown()` methods to manage the heap array.

### B. Weighted Scoring Algorithm (Heuristic Search)
*   **Where**: `src/lib/dsa.js` -> `calculateScore()`
*   **Why we use it**: To translate human feelings (Quiz Answers) into computer numbers.
*   **How it works**:
    *   Start with `Base Score` (Movie Rating).
    *   Match Logic:
        *   User says "Date Night" -> +25 points to Romance/Drama.
        *   User says "High Risk" -> +40 points to hidden gems.
        *   User says "Low Energy" -> -15 points to Action movies.
*   **Result**: Every movie gets a unique score for *that specific session*.

### C. Hash Sets (O(1) Lookup)
*   **Where**: `RecommendationEngine` class & `ScreeningRoom.jsx`
*   **Concept**: A collection of *unique* keys.
*   **Why we use it**:
    *   To filter duplicates (`rejectedIds`, `library`).
    *   Checking `if (array.includes(id))` is **O(N)** (slow if list is big).
    *   Checking `if (set.has(id))` is **O(1)** (instant).

---

## 🏗️ 3. Architecture & Tech Stack

*   **Frontend**: React + Vite (Fast, component-based UI).
*   **Animations**: **Framer Motion** (Smooth transitions & micro-interactions).
*   **State Management**: Zustand (Simpler than Redux, easier to explain).
*   **Styling**: Tailwind CSS (Utility-first, responsive).
*   **Database/Auth**: Firebase (Real-time syncing, serverless auth).
*   **API**: TMDB (The Movie Database) for real movie data.

---

## 📂 4. File-by-File Walkthrough (The "How it's made")

If user/panel asks: *"Explain your folder structure."*

### **Root Configuration**
*   `vite.config.js`: Configures the build tool.
*   `tailwind.config.js`: Defines our custom **Maroon & Gold** color theme (`colors: { cinema: { ... } }`).
*   `.env`: Stores secret API keys (TMDB, Firebase). **Never push this to GitHub.**

### **A. `src/main.jsx` & `src/App.jsx`**
*   **Entry Point**: `main.jsx` injects the React app into the HTML `root`.
*   **Router**: `App.js` currently renders the `Stage` component which handles the different "Pages" (`lobby`, `quiz`, `screening`, `library`) using conditional rendering based on Zustand state.

### **B. `src/store/useStore.js` (The Brain)**
*   **Importance**: Critical.
*   **What it does**:
    *   Holds **Global State**: `user`, `library`, `quizAnswers`, `rejectedIds`.
    *   **Batch Logic**: Tracks `currentBatch` (movies reviewed in this session).
    *   **Logic**: `addToLibrary` checks if user is logged in. If yes, it syncs to Firebase.
    *   **Persistence**: Uses `persist` middleware to save state to LocalStorage.

### **C. `src/lib/` (The Logic)**
*   **`dsa.js`**: **Most Important File**. Contains the `MovieHeap`, `calculateScore`, and `RecommendationEngine` classes. This is the pure logic layer.
*   **`firebase.js`**: Initializes Firebase app.
*   **`firebaseService.js`**: Helper functions for Firestore (`addMovieToLibrary`, `syncToCloud`) and Auth.
*   **`soundManager.js`**: Handles **Audio Feedback** (clicks, success chimes) to make the app feel "alive".

### **D. `src/pages/` (The Views)**
1.  **`Lobby.jsx`**: The landing page. Has the "Start" button.
2.  **`Quiz.jsx`**:
    *   Displays 5 questions with **Keyboard Support** (Arrow keys, 1-4).
    *   Updates `quizAnswers` in the store.
    *   Uses **Framer Motion** for smooth question transitions.
3.  **`ScreeningRoom.jsx`** (The Main Interface):
    *   **Batch System**: Presents movies in **batches of 3** to reduce decision fatigue.
    *   **Interaction**: Handles Tick (Save) and Cross (Reject).
    *   **Review**: After 3 swipes, shows a "Batch Review" summary.
    *   **Fetching**: Calls `engine.getNextMovie()` (pops from Heap).
4.  **`Library.jsx`**:
    *   Fetches `library` from store.
    *   Renders grid of **Interactive 3D Cards**.
    *   Uses **Sound Effects** for interactions (click, remove).
    *   Allows text search and genre filtering.

### **E. `src/components/` (The UI Bricks)**
*   **`layout/Header.jsx`**: Navigation, Search, and Auth.
*   **`screening/Card3D.jsx`**: The "Star" component.
    *   **Visuals**: Uses CSS 3D transforms (`rotateY`) for a premium feel.
    *   **Glassmorphism**: Frosted glass effect for modern aesthetics.
*   **`library/LibraryCard.jsx`**: Reusable 3D flip card for the library view.
*   **`screening/BatchReview.jsx`**: Summary screen shown after every 3 movies.
---

## ⚙️ 5. Key Workflows (How Data Flows)

### **Workflow 1: The Recommendation Pipeline**
1.  User enters `Quiz`. Answers stored in `useStore`.
2.  User hits "Start". `ScreeningRoom` mounts.
3.  **API Call**: `fetchMixedMovies()` gets raw movie list from TMDB.
4.  **DSA Engine**:
    *   `new RecommendationEngine()` created.
    *   `initialize()` called with movies + answers.
    *   Movies are scored and pushed into **Max-Heap**.
5.  **Render**: Engine `pop()`s the top movie. React renders it.

### **Workflow 2: The Batch Review Cycle**
1.  **Swipe**: User Ticks or Crosses a movie.
2.  **Sound**: `soundManager` plays feedback (Success/Reject sound).
3.  **Counter**: `currentBatch` size increases.
4.  **Checkpoint**: When 3 movies are reviewed:
    *   **Pause Recommendation**: Show `BatchReview` screen.
    *   **Decision**: User can "Show More" or "Generate Again".
    *   **Psychology**: Prevents "doom-scrolling" by breaking the flow.
5.  **Sync**: If "Saved", movie is synced to Firebase (if logged in).

---

## 📝 Viva Questions & Answers Cheat Sheet

**Q: Why didn't you just sort the array instead of using a Heap?**
**A:** Sorting is O(N log N). While manageable for small lists, a Heap is conceptually arguably better for "priority queue" behavior where we might want to dynamically add more movies later without re-sorting the whole list. Ideally, heaps allow O(log N) insertion.

**Q: How do you handle duplicates?**
**A:** We use a `Set` data structure (`rejectedIds`) which gives us O(1) lookup time to check if a movie ID has already been processed.

**Q: Where is the database?**
**A:** We use **Firebase Firestore** (NoSQL). It stores JSON-like documents. Because our data structure (Lists of movies) maps perfectly to JSON, NoSQL is faster and more flexible than SQL here.

**Q: Is the site responsive?**
**A:** Yes, we used **Tailwind CSS** with mobile-first classes (e.g., `grid-cols-1 md:grid-cols-3`) to ensuring it works on phones and laptops.

**Q: Why use Zustand instead of Redux?**
**A:** Redux has a lot of boilerplate code (Actions, Reducers, Types). Zustand provides the same global state capabilities with a simpler hook-based API (`useStore`), making the code cleaner and easier to maintain for a project of this scale.

---

*Good luck with your Viva! You have built a solid, scientifically grounded application.*
