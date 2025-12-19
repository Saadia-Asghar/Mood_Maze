# 🎬 MoodMaze - The Cinematic Engine

**Tagline:** *Stop scrolling. Start watching.*

MoodMaze is a cinematic movie recommendation web application designed to solve "Choice Paralysis." It uses sophisticated **Data Structures & Algorithms (DSA)** to analyze your current mood in real-time and hand-picks the perfect movie for you using a **Max-Heap Priority Queue** and **Weighted Scoring Algorithm**.

It features a unique "Rule of Three" experience: instead of an endless feed, you review a curated batch of 3 movies at a time, making the discovery process deliberate and engaging.


---

## ✨ Features

### 🎯 Smart Recommendations
- **Mood-Based Engine**: Analyzes your Social Situation, Vibe, Energy, Era, and Risk Tolerance.
- **Advanced DSA**: Implements a custom **Max-Heap** data structure to bubble up the highest-scoring movies in **O(1)** time.
- **Weighted Scoring**: assigns nuanced numerical scores to movies based on quiz answers (e.g., +30 points for "90s" if you selected "Classic").

### 🎨 Premium Cinematic UX
- **Theme**: Immersive "Cinema Mode" with dark aesthetics, gold accents (#d4af37), and subtle film grain.
- **3D Interactions**: Movie cards that flip in 3D to reveal plot details.
- **Micro-Interactions**: Satisfying sound effects (reel spinning, clicking) and smooth animations powered by **Framer Motion**.
- **The "Rule of Three"**: A unique batching system that reduces cognitive load by showing only 3 options at a time.

### ☁️ Cloud & Persistence
- **Google Firebase Integration**: Secure authentication via Google Sign-In.
- **Cloud Sync**: Your "My Library" is saved to the cloud (Firestore), accessible from any device.
- **Crash Prevention**: Robust Error Boundaries ensure the app stays stable even if services fail.

---

## 🧠 Technical Architecture

### Tech Stack
- **Frontend**: React 18 + Vite (Fast & Modern)
- **Styling**: Tailwind CSS (Custom Cinema Theme)
- **State Management**: Zustand (Global Store)
- **Backend/Auth**: Firebase (Auth & Firestore)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)

### Data Structures & Algorithms (DSA) Implementation

#### 1. Max-Heap Priority Queue (`dsa.js`)
We use a Binary Heap to efficiently manage the movie list.
- **Why?** To retrieve the "Best Match" instantly without sorting the entire dataset.
- **Complexity**: `push()` is O(log N), `pop()` is O(log N), `peek()` is O(1).

#### 2. Weighted Scoring Heuristic
Movies are not just "filtered"; they are *ranked*.
- **Logic**: `Score = (Rating * 10) + (Vibe Bonus) + (Era Bonus) + (Energy Penalty)`
- **Example**: If User selects "Low Energy", Action movies get a -15 penalty, while Dramas get a +20 boost.

#### 3. Hash Set (`rejectedIds`)
We use a JavaScript `Set` (Hash Set implementation) to track rejected movies.
- **Why?** To instantly check if a movie should be hidden.
- **Complexity**: O(1) Lookup time (vs O(N) for Arrays).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- A Google Firebase Project (for Auth/DB)
- A TMDB API Key (Optional - runs in Demo Mode without it)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mood-maze.git
   cd mood-maze
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_key
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   # ... add other firebase config keys
   ```

4. **Run local server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Visit `http://localhost:5173`

---

## 📂 Project Structure

```
mood-maze/
├── src/
│   ├── components/
│   │   ├── library/     # 3D Cards & Library Grid
│   │   ├── screening/   # Swiping Interface & Queues
│   │   ├── wizard/      # The 5-Step Quiz
│   │   └── layout/      # Header, Stage, Curtains
│   ├── hooks/           # Custom React Hooks (useSound, useAuthState)
│   ├── lib/
│   │   ├── dsa.js       # The ALGORITHM (Heap + Scoring)
│   │   ├── firebase.js  # Cloud Connection
│   │   └── utils.js     # Helpers
│   ├── pages/           # Main Views (Lobby, Quiz, Screening, Library)
│   ├── store/           # Global State (Zustand)
│   └── App.jsx          # Route Manager
└── public/              # Static Assets (Sounds, Images)
```

---

## 🎮 How to Use

1.  **Start the Show**: Click the main button in the Lobby.
2.  **Take the Quiz**: Answer 5 rapid-fire questions about your current mood.
3.  **Discovery Mode**:
    *   **Tick (✓)**: Save to Library.
    *   **Cross (✗)**: Reject (adds to Hash Set).
    *   **Click Poster**: 3D Flip to see details.
4.  **Batch Review**: After viewing 3 movies, decide to "Show More" or "Start Over".
5.  **My Library**: Visit your collection to see your saved films.

---

**MoodMaze** - Because the best movie isn't the most popular one. It's the one that fits *you* right now. 🎬✨
