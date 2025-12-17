# 🎬 MoodMaze: The Ultimate Non-Coder's Guide & Viva Manual

> **⚠️ IMPORTANT**: This version is for YOU and YOUR TEAM locally. Do not upload this specific text to GitHub if you want to keep your "secret sauce" explanations private.

---

## 1. What is this project? (The "Elevator Pitch")

**Imagine you want to watch a movie.**
You open Netflix, scroll for 20 minutes, get overwhelmed, and turn off the TV. This is called **"Choice Paralysis."**

**MoodMaze is the cure.**
It is an intelligent web application that acts like your movie-buff friend. instead of showing you 10,000 bad movies, it asks you **5 simple questions about your mood** and uses a smart computer algorithm to hand-pick the *perfect* movie for right now.

It’s **"Tinder for Movies"** meeting **"Data Science."**

---

## 2. How does the "Magic" work? (The Logic)

We didn't just use `if/else` statements. We used **Data Structures & Algorithms (DSA)**. Here is the analogy to explain to your examiner:

### The "Waiter" Analogy (The Algorithm)
Imagine a waiter at a restaurant.
1.  **The Menu (The Database)**: We have thousands of movies from TMDB (The Movie Database).
2.  **The Order (The Quiz)**: You tell the waiter: *"I'm on a date, I want something romantic, but thrilling, from the 90s."*
3.  **The Chef's Brain (The Scoring System)**:
    *   The chef looks at *Titanic*.
    *   Is it romantic? **YES (+30 points)**.
    *   Is it thrilling? **YES (+20 points)**.
    *   Is it from the 90s? **YES (+50 points)**.
    *   **Total Score: 100/100**.
    *   Then the chef looks at *Shrek*.
    *   Romantic? Kinda (+10). Thrilling? No (0). 90s? No (0).
    *   **Total Score: 10/100**.

### The "VIP Line" (The Max-Heap)
Now, we have scores for 20 movies. We need to show you the best one first.
*   **The Slow Way (Sorting)**: Ordering *everyone* in the restaurant by height. This takes a long time.
*   **The Smart Way (Max-Heap)**: A "King of the Hill" game. We put all movies in a pile, but the "Heaviest" (Highest Score) movie naturally bubbles up to the top.
*   **Why we used it**: We don't care about the 50th best movie. We only care about the **#1 best movie**. A Max-Heap lets us grab the #1 movie instantly (technically called **O(1)** time complexity).

---

## 3. Explaining the Tech Stack (Layman Terms)

If they ask "What did you use to build this?", say this:

*   **React (The Lego Blocks)**:
    *   Instead of writing one giant messy file, we built "Components".
    *   Think of `Button`, `Card`, and `Header` as Lego bricks. We just snap them together to build the page.
    *   *Why?* It makes the code clean and reusable.

*   **Zustand (The Brain/Memory)**:
    *   When you switch from the "Quiz Page" to the "Movie Page", the app needs to *remember* your answers.
    *   Zustand is a global brain that holds this information so any page can read it.

*   **Tailwind CSS (The Stylist)**:
    *   This is what makes the app look like a premium cinema (Dark mode, Gold text).
    *   It handles the colors, spacing, and layout.

*   **Firebase (The Cloud)**:
    *   This is Google's backend. It is our "Filing Cabinet in the Sky".
    *   When you click "Save Movie", we write that movie's name into a permanent file in Google's cloud.
    *   This allows you to close the browser, come back tomorrow, and still see your saved movies.

---

## 4. The 5 Team Roles (Who says what?)

Divide these scripts among your 5 members.

### 👤 Member 1: The "Algorithm Expert" (Focus: `dsa.js`)
**Q: What is the unique feature of this project?**
> "The heart of MoodMaze is our **Weighted Scoring Algorithm**. Unlike simple apps that just filter by genre, we *rank* movies. We take the user's answers (like 'Social Context' or 'Energy Level') and assign numerical weights to movie attributes. For example, if a user wants a 'Low Energy' movie, we boost Drama films by +20 points and penalize Action films by -15 points. This creates a nuanced recommendation."

**Q: Where is the DSA?**
> "We implemented a **Max-Heap**, which is a Priority Queue data structure. It ensures that no matter how many movies we score, the highest-matching movie is always accessible in **O(1)** constant time. This makes our app incredibly fast."

### 👤 Member 2: The "Frontend Architect" (Focus: `Quiz.jsx`, `Stage.jsx`)
**Q: How did you design the UI?**
> "I focused on **User Experience (UX)**. The goal was to combat 'Decision Fatigue', so I designed the Quiz to feel like a game, not a form. I utilized **Framer Motion** to create cinematic transitions—like curtains opening or cards flipping. We used a 'Component-Based Architecture' with React, meaning I built reusable pieces like the `ProgressBar` and `QuestionCard` that can be used anywhere."

### 👤 Member 3: The "State Logic Engineer" (Focus: `useStore.js`, `ScreeningRoom.jsx`)
**Q: How does the app handle data?**
> "I managed the **State Flow**. I used a library called Zustand to create a 'Global Store'. Think of it as the app's short-term memory. It tracks the user's current step in the quiz, their answers, and the list of movies currently on screen. I also implemented a 'Batching System', where we strictly verify 3 recommended movies at a time to ensure quality before showing them to the user."

### 👤 Member 4: The "Backend/Cloud Integrator" (Focus: `firebase.js`)
**Q: Is the data persistent?**
> "Yes. I implemented the **Cloud Infrastructure** using Google Firebase. I set up Authentication so users can sign in with their Google accounts securelly. I also linked a **NoSQL Database (Firestore)**. This means every time a user 'Likes' a movie, we perform a write operation to the cloud. I also realized safety is important, so I added 'Error Boundaries'—if the cloud connection fails, the app doesn't crash; it degrades gracefully."

### 👤 Member 5: The "Interaction & Polish Specialist" (Focus: `useSound.js`, `Library.jsx`)
**Q: What makes the app feel premium?**
> "I focused on **Micro-Interactions**. I built a custom Hook called `useSound` that plays specific audio cues (like a 'film reel' sound or a 'satisfying click') to trigger dopamine responses. I also built the 'Library' view with 3D CSS transformations. When you click a poster, it flips 180 degrees in 3D space to reveal the plot. This requires complex CSS perspective math."

---

## 5. Walkthrough of the Code (File by File)

If the teacher opens a specific file and asks "What does this do?", use these cheat sheets:

### `src/lib/dsa.js` (The Brain)
*   **lines 10-124 (MovieHeap)**: This is the **Data Structure**. It contains methods like `push` (add movie), `pop` (remove best movie), and `bubbleUp` (sort the movie to the right spot).
*   **lines 136-271 (calculateScore)**: This is the **Math**. It contains the `if/else` logic that adds points based on answers.

### `src/store/useStore.js` (The Memory)
*   This uses **Zustand**.
*   Look for `create((set) => ({ ... }))`. This creates the global object.
*   `currentBatch`: Holds the 3 movies you see on screen.
*   `library`: Holds the movies you Liked.
*   `rejectedIds`: A **Set** (Hash Set) of movies you hated.

### `src/hooks/useSound.js` (The Sound)
*   It's a **Custom Hook**.
*   It loads MP3 files from the computer's folder.
*   It has a safety switch: `if (!soundEnabled) return;`.

### `src/pages/ScreeningRoom.jsx` (The Tinder Screen)
*   **`useEffect`**: This runs when the page loads. It tells the recommendation engine "Hey, wake up and give me movies!".
*   **`handleSwipe`**: This function runs when you click Tick or Cross. It plays a sound, saves the movie (or blocks it), and asks for the next one.

---

## 6. Common Viva "Trick Questions"

**Q: Why React and not plain HTML/CSS?**
> **A:** simple HTML is static. We needed a **Single Page Application (SPA)** that feels like a mobile app. React allows us to update parts of the screen (like the movie card) *without* reloading the entire website.

**Q: Why Max-Heap? Why not just `array.sort()`?**
> **A:** `array.sort()` takes **O(N log N)** time. If we have 10,000 movies, that's slow. `heap.pop()` takes **O(log N)** which is much faster. Also, we don't need the *whole* list sorted, we just need the *top* one. A heap is designed exactly for that.

**Q: What happens if the internet goes down?**
> **A:** We have a 'Demo Mode'. If the API key fails or internet cuts out, the app automatically switches to a local dataset of 200 popular movies so the user can still play.

**Q: How do you handle checking if a movie was already rejected?**
> **A:** We use a **Set** (Hash Set). Checking `Set.has(id)` is **O(1)** (instant). If we used an Array, we would have to loop through the whole array every time, which is **O(N)**.
