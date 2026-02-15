<div align="center">

# 💖 Valentine's Day Gift 💖

### A delightful web-based interactive Valentine gift with mini-games for your special someone! ✨

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

_A fun, romantic surprise gift featuring randomly selected mini-games!_

</div>

---

## 📋 Table of Contents

1. [About](#-about)
2. [🎮 Game Modes](#-game-modes)
3. [🎨 Visual Design](#-visual-design)
4. [🚀 How to Run](#-how-to-run)
5. [📁 Project Structure](#-project-structure)
6. [🛠️ Technologies Used](#️-technologies-used)
7. [💝 Features](#-features)
8. [🎯 Game Flow](#-game-flow)
9. [📄 License](#-license)

---

## 💖 About

A charming, interactive Valentine's Day gift web app that brings joy and romance to your special someone. Each time the page loads, a randomly selected mini-game appears as a delightful surprise! The app features cute cat characters (Goma and Peach), romantic aesthetics, and a touching love letter reveal at the end.

Perfect for surprising your partner, friend, or anyone special in your life! 🌹

---

## 🎮 Game Modes

The app randomly selects one of these three engaging mini-games on each load:

### 1. 🐱 Meet: Guide the Cats to Reunion

Help Goma navigate through a maze to reunite with his beloved Peach!

| Feature         | Description                                      |
| --------------- | ------------------------------------------------ |
| **Grid**        | 5×5 procedurally generated maze                  |
| **Pathfinding** | BFS algorithm ensures a valid path always exists |
| **Characters**  | Goma (the cat) and Peach (his love)              |
| **Win State**   | Happy hugging cats animation                     |
| **Controls**    | Arrow keys (desktop) / Tap cells (mobile)        |

**Win Condition:** Goma reaches Peach's position

---

### 2. 🧩 Reveal: Hidden Message Puzzle

Solve a sliding puzzle to reveal a romantic hidden message!

| Feature        | Description                                |
| -------------- | ------------------------------------------ |
| **Puzzle**     | 3×3 sliding tile puzzle (9 pieces)         |
| **Mechanic**   | Drag-and-drop to swap tiles                |
| **Feedback**   | Smooth animations and visual effects       |
| **Validation** | Timer-based completion check               |
| **Controls**   | Mouse drag (desktop) / Touch drag (mobile) |

**Win Condition:** All pieces arranged in correct order

---

### 3. ❤️ Catch: Heart Collection Challenge

Catch falling hearts to fill up Goma's bucket with love!

| Feature         | Description                          |
| --------------- | ------------------------------------ |
| **Gameplay**    | Catch hearts falling from the top    |
| **Progression** | Bucket fills: empty → half → full    |
| **Goal**        | Collect 10 hearts to win             |
| **Effects**     | Pop animation on catch               |
| **Controls**    | Arrow keys / Mouse drag / Touch drag |

**Win Condition:** Bucket filled with 10 hearts

---

## 🎨 Visual Design

- 💗 **Romantic pink color scheme** with breathing background animation
- 🎬 **Custom CSS animations** and smooth transitions
- 📱 **Fully responsive** design for mobile and desktop
- 🐱 **Cute character sprites** (Goma and Peach cats)
- ✉️ **Interactive envelope** with love letter reveal animation
- 🎀 **Victory animations** with celebratory GIFs

---

## 🚀 How to Run

1. **Clone or download** the project files
2. **Open** `index.html` in any modern web browser
3. **Play** the randomly selected game!
4. **Click "Yes"** on the Valentine popup to when finished
5. **Enjoy** the romantic envelope reveal after winning 🎉

> 💡 **Tip:** Since this uses ES6 modules, you may need to serve it via a local server (e.g., VSCode Live Server, Python http.server, or npm serve) for the best experience, though it may work directly in some browsers.

---

## 📁 Project Structure

```
valentine_gift/
├── index.html              # Main HTML entry point
├── main.js                 # Core JavaScript logic & game selection
├── styles.css              # Global styles & animations
├── assets/                 # Images & animated GIFs
│   ├── goma_*.gif          # Goma character sprites
│   ├── peach_*.gif         # Peach character sprites
│   ├── piece_*.png         # Puzzle pieces
│   ├── hugging_cats.gif    # Victory animation
│   └── ...                 # Other visual assets
├── games/                  # Mini-game modules
│   ├── game_meet.js        # Maze game (cat reunion)
│   ├── game_reveal.js      # Sliding puzzle game
│   └── game_catch.js       # Heart catching game
└── love_letter/            # Envelope animation component
    ├── envelope.js         # Envelope reveal logic
    └── love_letter.css     # Envelope styles
```

---

## 🛠️ Technologies Used

| Technology                   | Purpose                                |
| ---------------------------- | -------------------------------------- |
| **HTML5**                    | Semantic markup & structure            |
| **CSS3**                     | Animations, flexbox, responsive design |
| **Vanilla JavaScript (ES6)** | Game logic, event handling, modules    |
| **Pure DOM Manipulation**    | Canvas-free game rendering             |

> ✨ **No external dependencies** - runs entirely in the browser!

---

## 💝 Features

- 🎲 **Random game selection** on each page load
- 📱 **Mobile-friendly** touch controls
- ⌨️ **Multiple input methods** (keyboard, mouse, touch)
- ✨ **Smooth animations** and transitions
- 💌 **Romantic love letter** reveal after completion
- 🐱 **Endearing characters** (Goma & Peach)
- 🔄 **Procedural maze generation** with guaranteed paths
- 🎯 **Fair puzzle validation** system
- 🌸 **Beautiful visual design** with Valentine theme

---

## 🎯 Game Flow

```
┌─────────────┐
│   Open Page │
└──────┬──────┘
       ▼
┌────────────────┐
│ Randomly Select│
│     a Game     │
└──────┬─────────┘
       ▼
┌──────────────┐
│   Play the   │
│     Game     │
└──────┬───────┘
       ▼
┌────────────────┐
│  Game Complete │
│ (Win Condition)│
└──────┬─────────┘
       ▼
┌────────────────┐
│ Valentine Popup│
│   (Yes / No*)  │
└──────┬─────────┘
       ▼
┌──────────────┐
│ Show Envelope│
│   & Letter   │
└──────────────┘

```

1. User opens the gift in a browser
2. A random game loads as a surprise
3. User plays and completes the game
4. Valentine popup appears with a sweet message
5. User clicks "Yes" to confirm their love
6. Romantic envelope with love letter is revealed 💌

---

## 📄 License

This project is open source and available for anyone to use, modify, and share!

Made with ❤️ for Valentine's Day

---

<div align="center">

### 🌸 Happy Valentine's Day! 🌸

_Created with love for that special someone_ 💕

</div>
