# 💖 A Valentine Gift for Your Special Someone

A delightful web-based Valentine gift featuring three interactive mini-games designed to bring joy and romance. Each game is randomly selected on load, creating a surprise element for the recipient.

## 🎮 Game Modes

### 1. Meet: Guide the Cats to Reunion

- **Objective**: Help Goma navigate through a randomly generated maze to reunite with his Peach.
- **Features**:
  - 5x5 grid maze with procedurally generated obstacles
  - Ensures a valid path always exists from start to end
  - Sad character sprites that become happy upon completion
  - Win animation with hugging cats GIF
- **Controls**:
  - Arrow keys for movement
  - Tap/click adjacent cells on mobile
  - Prevents movement through obstacles

### 2. Reveal: Hidden Message Puzzle

- **Objective**: Solve a 3x3 sliding puzzle to reveal a romantic hidden message.
- **Features**:
  - 9 puzzle pieces that need to be arranged correctly
  - Drag-and-drop functionality for desktop
  - Touch-based dragging for mobile devices
  - Smooth animations and visual feedback
  - Completion check with timer to prevent false positives
- **Controls**:
  - Drag tiles to swap positions
  - Works on both desktop and mobile

### 3. Catch: Heart Collection Challenge

- **Objective**: Move Goma's bucket to catch falling hearts and fill it up to 10.
- **Features**:
  - Dynamic heart spawning from the top
  - Bucket changes appearance as it fills (empty → half → full)
  - Pop animation when catching hearts
  - Increasing difficulty with continuous spawning
  - Victory animation with jumping characters
- **Controls**:
  - Arrow keys for left/right movement
  - Mouse drag for bucket control
  - Touch drag support for mobile

## 🎨 Visual Design

- Romantic pink color scheme with breathing background animation
- Custom CSS animations and transitions
- Responsive design for mobile and desktop
- Cute character sprites and GIFs
- Interactive envelope with love letter reveal

## 🚀 How to Run

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. Click "Yes" on the Valentine popup to start
4. Enjoy the randomly selected game!

## 📁 Project Structure

```
valentine_gift/
├── index.html          # Main HTML file
├── main.js             # Main JavaScript logic
├── styles.css          # Global styles and animations
├── assets/             # Images and GIFs
│   ├── goma_*.gif/png
│   ├── peach_*.gif
│   ├── piece_*.png
│   └── ...
├── games/              # Game modules
│   ├── game_meet.js
│   ├── game_reveal.js
│   └── game_catch.js
└── love letter/        # Envelope animation
    ├── envelope.js
    └── love letter.css
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Animations, flexbox, and responsive design
- **Vanilla JavaScript**: ES6 modules, event handling, and game logic
- **Canvas-free approach**: Pure DOM manipulation for games

## 💝 Features

- Random game selection on each load
- Mobile-friendly touch controls
- Keyboard and mouse support
- Smooth animations and transitions
- Romantic love letter reveal after game completion
- No external dependencies - runs entirely in the browser

## 🎯 Game Completion Flow

1. User opens the gift
2. Valentine popup appears
3. Random game loads
4. User plays and completes the game
5. Victory animation plays
6. Romantic envelope with love letter appears

Perfect for surprising your special someone with a personalized, interactive Valentine experience! 🌹
