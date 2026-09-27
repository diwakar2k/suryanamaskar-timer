# Surya Namaskar (Sun Salutation) Timer PWA

An elegant, distraction-free Progressive Web App (PWA) timer designed specifically for practicing Surya Namaskar (Sun Salutation) on the yoga mat.

---

## 🌟 Key Features

* **🧘 Complete 12-Pose Sequence:**
  * Interactive circular dial featuring all 12 traditional asanas with Sanskrit and English nomenclature.
  * Real-time Pranayama breath guidance (**Inhale ⬆**, **Exhale ⬇**, **Hold Breath ⏸**).
  * Automatic alternating leg guidance for Equestrian Pose (*Ashwa Sanchalanasana*, Steps 4 & 9) based on odd/even rounds (Right leg vs. Left leg).

* **🎵 Spotify & Background Audio Coexistence:**
  * Built using the **Web Audio API** (`AudioContext`) with ambient audio session configuration (`navigator.audioSession.type = 'ambient'`).
  * Both **Chimes (Tibetan Bell)** and **Voice (Spoken count)** mix seamlessly on top of background music (Spotify, Apple Music, YouTube Music) without ducking, pausing, or interrupting playback.

* **📱 Mat-Side Landscape & Fullscreen Mode:**
  * **Landscape Mode:** When placed horizontally on the floor beside your yoga mat, the app automatically switches to an ergonomic two-column layout (dial on the left, timer, pose info, and controls on the right).
  * **Fullscreen Toggle (`⛶`):** Eliminates browser chrome for a distraction-free experience.

* **⏱️ Web Worker Precision Timing:**
  * Driven by high-resolution `performance.now()`.
  * Incorporates an inline **Web Worker** running on an independent background thread, guaranteeing ticks and audio cues trigger on schedule even if mobile browsers throttle `requestAnimationFrame` or `setInterval` when switching apps.

* **💡 Pace Profiles:**
  * **Progressive Pace:** Warmer, longer holds on the initial rounds (e.g., Rounds 1 & 2) that gently accelerate toward the target flow pace.
  * **Constant Pace:** Fixed, uniform time allocation across every pose and round.
  * **Live Adjustments:** Adjust total rounds (1–108) or session duration on the fly during practice.

* **🎉 Namaste Session Summary:**
  * Celebratory 3-tone harmonic chime triad on routine completion (`528 Hz → 659 Hz → 784 Hz`).
  * Summary modal displaying total duration, rounds completed, poses completed, and estimated calorie burn (`~3.8 kcal/round`).

* **📶 100% Offline PWA:**
  * Full offline caching powered by Service Worker (`sw.js`).
  * Manifest configured with high-res maskable icons (including `192x192` and `512x512`) for installation on iOS and Android home screens.
  * Screen WakeLock integration keeps the display awake throughout your workout.

---

## 📁 Project Structure

```text
suryanamaskar-timer/
├── index.html              # Main single-page application (HTML, CSS, JS engine)
├── manifest.json           # Web App Manifest for PWA installation
├── sw.js                   # Service worker for offline caching & asset rotation
├── .gitignore              # Git ignore rules for clean version control
├── README.md               # Documentation and usage guide
├── audio/                  # Preloaded voice count & cue audio files
│   ├── 1.wav ... 12.wav    # Spoken numbers 1 to 12
│   ├── start.wav           # "Start!" cue
│   ├── inhale.wav          # "Inhale" cue
│   ├── exhale.wav          # "Exhale" cue
│   └── hold.wav            # "Hold" cue
└── images/                 # Asana visual diagrams & app icons
    ├── icon-192.png        # 192x192 maskable PWA icon
    ├── icon-512.png        # 512x512 high-res PWA icon
    ├── apple-touch-icon.png# iOS touch icon
    └── Surya-Namaskar-step-1.webp ... step-12.webp # 12 Asana diagrams
```

---

## 🚀 Running Locally

You can run the app with any standard HTTP server:

### Option 1: Python
```bash
python -m http.server 5500
```
Open `http://localhost:5500` in your browser.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Click **Go Live** on the bottom status bar (or right-click `index.html` → *Open with Live Server*).
3. If viewing on a mobile phone:
   * Go to the **Ports** tab in VS Code.
   * Right-click the forwarded port (`5500`) and select **Port Visibility → Public**.
   * Open the provided HTTPS address on your mobile device.

---

## 📲 Installing on Mobile (PWA)

* **iOS (Safari):** Open the site, tap the **Share** button (`⎋`), and select **Add to Home Screen**.
* **Android (Chrome):** Open the site, tap the **Menu** (`⋮`), and select **Install App** (or **Add to Home screen**).

---

## 📜 License

MIT License. Designed with reverence for traditional Hatha Yoga practice.
