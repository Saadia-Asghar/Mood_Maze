# 🗺️ Project File Atlas: Every File Explained

Use this document to master the codebase. If the examiner points to *any* file and asks "What does this do?", look it up here.

---

## 📂 Root Directory (Configuration)

### `package.json`
*   **Analogy**: The "ID Card" of the project.
*   **Purpose**: key details:
    *   **Scripts**: How to run the app (`npm run dev`).
    *   **Dependencies**: List of external libraries we used (React, Tailwind, Framer Motion).

### `vite.config.js`
*   **Analogy**: The "Construction Site Manager".
*   **Purpose**: Configures **Vite**, our build tool. It tells the computer how to bundle all our Javascript files into a website browser can understand.

### `tailwind.config.js`
*   **Analogy**: The "Style Guide".
*   **Purpose**: customization of **Tailwind CSS**.
    *   Here is where we defined the custom colors (`cinema-gold`, `cinema-black`) and fonts (`serif`).

### `.env`
*   **Analogy**: The "Secret Vault".
*   **Purpose**: Stores sensitive passwords like the `VITE_TMDB_API_KEY`. This file is **ignored** by git so secrets aren't stolen.

### `index.html`
*   **Analogy**: The "Frame" of the house.
*   **Purpose**: The single HTML file. React injects the entire app into the `<div id="root"></div>` tag here.

---

## 📂 src/ (Source Code)

### `main.jsx`
*   **Analogy**: The "Spark Plug".
*   **Purpose**: The very first line of code that runs. It takes our `<App />` and mounts it onto the HTML page.
*   **Key Detail**: It uses `StrictMode` to help catch errors.

### `App.jsx`
*   **Analogy**: The "Traffic Cop" (Router).
*   **Purpose**: It decides which "Page" to show.
    *   `currentPage === 'home'` → Show Lobby
    *   `currentPage === 'quiz'` → Show Quiz

### `index.css`
*   **Analogy**: The "Paint".
*   **Purpose**: Global styles. We import Tailwind directives here (`@tailwind base`).

---

## 📂 src/store/ (Global Memory)

### `useStore.js`
*   **Analogy**: The "Short-Term Memory" (Brain).
*   **Tech**: Uses **Zustand**.
*   **What it does**:
    *   Stores `answers` (User's quiz choices).
    *   Stores `library` (Movies user saved).
    *   Stores `rejectedIds` (Movies user hated).
    *   **Why implementation matters**: Uses a **Set** for `rejectedIds` for O(1) performance.

---

## 📂 src/lib/ (The Logic/Backend)

### `dsa.js`
*   **Analogy**: The "Genius Chef" (Algorithm).
*   **Tech**: **Max-Heap**, **Weighted Scoring**.
*   **What it does**:
    *   `calculateScore()`: Gives points to movies based on answers.
    *   `MovieHeap`: Ensures best movies float to top.
    *   `RecommendationEngine`: The main class running the show.

### `firebase.js`
*   **Analogy**: The "Cloud Link".
*   **Tech**: Google Firebase.
*   **What it does**:
    *   `auth`: Handles Google Login.
    *   `db`: Connects to Firestore database to save data permanently.

### `utils.js`
*   **Analogy**: The "Swiss Army Knife".
*   **What it does**:
    *   `getImageUrl`: fixes broken image links.
    *   `shuffle`: Randomizes arrays (Fisher-Yates Shuffle).

---

## 📂 src/hooks/ (Custom Superpowers)

### `useSound.js`
*   **Analogy**: The "Sound Engineer".
*   **What it does**: A custom React Hook that makes playing sounds easy.
    *   It pre-loads MP3 files so there is no lag when you click button.

### `useTMDB.js`
*   **Analogy**: The "Phone Operator".
*   **What it does**: Handles the API calls to TMDB.
    *   It fetches movie lists (Popular, Top Rated).
    *   It handles the "Loading" and "Error" states.

---

## 📂 src/pages/ (The Screens)

### `Lobby.jsx`
*   **Screen**: The first screen with the "Start" button.
*   **Code**: Simple UI with a nice looping background animation.

### `Quiz.jsx`
*   **Screen**: The 5 Questions.
*   **Code**:
    *   Uses `useStore` to save answers.
    *   Uses `Framer Motion` for the sliding transitions between questions.

### `ScreeningRoom.jsx`
*   **Screen**: The "Tinder Swipe" area.
*   **Code**:
    *   Loads the `RecommendationEngine` from `dsa.js`.
    *   Shows `Card3D` components.
    *   Handles "Tick" and "Cross" logic.

### `Library.jsx`
*   **Screen**: "My Library".
*   **Code**:
    *   Shows a grid of `LibraryCard`.
    *   Reads from `useStore.library`.

---

## 📂 src/components/ (The Lego Blocks)

### 📁 layout/
*   `Header.jsx`: The top bar (Logo, Navigation).
*   `Stage.jsx`: The background container that holds everything.

### 📁 wizard/ (For Quiz)
*   `ProgressBar.jsx`: The dots at the top of the quiz.
*   `QuestionCard.jsx`: The individual question box.

### 📁 screening/ (For Movie View)
*   `Card3D.jsx`: The coolest component. Uses CSS `transform: rotateY(180deg)` to flip.
*   `BatchReview.jsx`: The "Intermission" screen showing 3 posters.

### 📁 ui/ (Basic Buttons)
*   `Button.jsx`: A reusable button with sound effects built-in.
*   `Badge.jsx`: Little text tags (e.g. "Action", "Horror").
