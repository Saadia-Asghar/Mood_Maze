# 🎬 MoodMaze - The Cinematic Engine

**Tagline:** *Stop scrolling. Start watching.*

MoodMaze is a cinematic movie recommendation web application that uses a **Decision Tree** to analyze your current mood and a **Max-Heap Priority Queue** to rank movies in real-time. It features a unique "Rule of Three" workflow where users review movies in batches of three, creating a deliberate and engaging discovery experience.

![MoodMaze Banner](https://via.placeholder.com/1200x400/0a0a0a/d4af37?text=MoodMaze+-+The+Cinematic+Engine)

---

## ✨ Features

### 🎯 Core Features
- **Mood-Based Recommendations**: Get movie suggestions based on your *current* mood, not just viewing history
- **Smart DSA Engine**: Max-Heap priority queue ranks movies with a sophisticated scoring algorithm
- **The "Rule of Three"**: Review movies in batches of 3 for a focused decision-making experience
- **Persistent Library**: Save your favorite movies with localStorage persistence
- **Demo Mode**: Works without an API key using curated demo data

### 🎨 Premium UX
- **Vintage Cinema Theme**: Dark mode with gold accents, velvet red, and film grain textures
- **3D Flip Cards**: Interactive movie cards with smooth flip animations
- **Camera Reel Animation**: Spinning reel button to restart the experience
- **Sound Effects**: Optional audio feedback for interactions
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

---

## 🧠 Technical Architecture

### Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom cinema theme
- **Animation**: Framer Motion for smooth transitions
- **State Management**: Zustand with localStorage persistence
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)
- **Effects**: canvas-confetti for celebrations

### Data Structures & Algorithms

#### 1. Max-Heap Priority Queue
```javascript
class MovieHeap {
  push(movie)    // O(log N) - Insert with bubble up
  pop()          // O(log N) - Extract max with bubble down
  peek()         // O(1)     - View top movie
}
```

#### 2. Scoring Algorithm
Movies are scored based on 5 quiz questions:
- **Social Context**: Family, date, friends, or solo
- **Vibe**: Mind-bending, feel-good, adrenaline, or emotional
- **Energy Level**: Low, medium, or high
- **Era Preference**: Classic, 90s-2000s, modern, or any
- **Risk Tolerance**: Safe picks, balanced, or hidden gems

#### 3. Hash Set for Rejected Movies
```javascript
rejectedIds = new Set()  // O(1) lookup to avoid showing rejected movies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- (Optional) TMDB API key for full functionality

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mood-maze
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (Optional)
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your TMDB API key
VITE_TMDB_API_KEY=your_api_key_here
```

**Get a free TMDB API key:**
1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Create an account
3. Go to Settings → API → Request an API Key
4. Choose "Developer" and fill out the form
5. Copy your API key to `.env`

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

---

## 📂 Project Structure

```
mood-maze/
├── src/
│   ├── assets/
│   │   ├── sounds/          # Audio files (optional)
│   │   └── images/          # Images and textures
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── CameraReel.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Stage.jsx
│   │   │   └── Header.jsx
│   │   ├── wizard/          # Quiz components
│   │   │   ├── QuestionCard.jsx
│   │   │   └── ProgressBar.jsx
│   │   └── screening/       # Movie discovery components
│   │       ├── Card3D.jsx
│   │       └── BatchReview.jsx
│   ├── hooks/
│   │   ├── useTMDB.js       # API integration
│   │   └── useSound.js      # Sound effects
│   ├── lib/
│   │   ├── dsa.js           # DSA engine (Heap, Scoring)
│   │   └── utils.js         # Utility functions
│   ├── pages/
│   │   ├── Lobby.jsx        # Landing page
│   │   ├── Quiz.jsx         # 5-question quiz
│   │   ├── ScreeningRoom.jsx # Main discovery interface
│   │   └── Library.jsx      # Saved movies
│   ├── store/
│   │   └── useStore.js      # Zustand state management
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env.example
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🎮 How to Use

### The User Journey

1. **The Lobby**
   - Click "Start the Show" to begin

2. **The Quiz** (5 Questions)
   - Who are you watching with?
   - What vibe are you looking for?
   - What's your energy level?
   - Which era speaks to you?
   - How adventurous are you feeling?

3. **The Screening Room**
   - View movie poster → Click to flip
   - Read synopsis and details
   - **Tick** (✓) to save or **Cross** (✗) to pass
   - After 3 movies, reach the **Intermission**

4. **The Intermission**
   - Review your 3 choices
   - **"Show 3 More"** to continue
   - **Camera Reel** to start over with new preferences

5. **Your Library**
   - View all saved movies
   - Remove movies you're no longer interested in

---

## 🎨 Design System

### Color Palette
```javascript
colors: {
  cinema: {
    black: '#0a0a0a',    // Background
    gold: '#d4af37',     // Primary text & borders
    red: '#8a0303',      // Primary actions
    green: '#2ecc71',    // Success states
  }
}
```

### Typography
- **Headers**: Playfair Display (Serif)
- **Body**: Inter / Montserrat (Sans-serif)

### Key Animations
- Card flip: 0.6s ease-in-out
- Camera reel spin: 1.5s cubic-bezier
- Page transitions: Framer Motion variants

---

## 🔧 Configuration

### Tailwind Config
Custom theme with cinema colors, fonts, and animations defined in `tailwind.config.js`.

### Environment Variables
- `VITE_TMDB_API_KEY`: Your TMDB API key (optional, falls back to demo mode)

---

## 📊 DSA Implementation Details

### Scoring Algorithm Breakdown

```javascript
Base Score = vote_average * 10 + (popularity / 10)

// Social Context Modifiers
if (family && adult) score -= 1000
if (family && family_genres) score += 30

// Vibe Modifiers
if (mind_bending && mystery_keywords) score += 30
if (feel_good && positive_keywords) score += 25

// Energy Modifiers
if (low_energy && drama) score += 20
if (high_energy && action) score += 25

// Era Modifiers
if (classic && year < 1990) score += 30
if (modern && year > 2010) score += 30

// Risk Modifiers
if (safe && popular) score += 35
if (high_risk && hidden_gem) score += 40
```

### Heap Operations
- **Initialize**: O(N log N) to build heap from N movies
- **Pop**: O(log N) to get next best movie
- **Total for 3 movies**: O(3 log N) ≈ O(log N)

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Add `VITE_TMDB_API_KEY` as an environment variable
4. Deploy!

---

## 🎯 Future Enhancements

- [ ] Add movie trailers (YouTube integration)
- [ ] Social sharing of libraries
- [ ] Advanced filters (runtime, language, etc.)
- [ ] User accounts and cloud sync
- [ ] Watchlist with streaming availability
- [ ] AI-powered synopsis summaries

---

## 📝 License

MIT License - feel free to use this project for learning or portfolio purposes.

---

## 🙏 Acknowledgments

- **TMDB** for the comprehensive movie database API
- **Framer Motion** for buttery smooth animations
- **Tailwind CSS** for rapid UI development
- **Lucide** for beautiful icons

---

## 👨‍💻 Author

Built with ❤️ as a portfolio project demonstrating:
- Advanced React patterns
- Data Structures & Algorithms
- State management with Zustand
- Premium UI/UX design
- API integration

---

**MoodMaze** - Because the best movie for you isn't always the most popular one. It's the one that matches your mood *right now*. 🎬✨
