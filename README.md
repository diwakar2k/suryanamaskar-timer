# Surya Namaskar (Sun Salutation) Timer PWA

An elegant, distraction-free Progressive Web App (PWA) timer designed specifically for practicing Surya Namaskar (Sun Salutation) on the yoga mat.

**Created by [Diwakar Sharma](https://github.com/diwakar2k)**

🌐 **Live Deployed App:** [https://diwakar2k.github.io/suryanamaskar-timer/](https://diwakar2k.github.io/suryanamaskar-timer/)  
📦 **GitHub Repository:** [https://github.com/diwakar2k/suryanamaskar-timer](https://github.com/diwakar2k/suryanamaskar-timer)  
👤 **Author Profile:** [https://github.com/diwakar2k](https://github.com/diwakar2k)

---

## 📲 How to Install on Your Phone (iOS & Android)

This app is built as a **Progressive Web App (PWA)**. You do **not** need to download it from the Apple App Store or Google Play Store. When added to your home screen, it:
* Launches in **fullscreen standalone mode** (no browser address bar or bottom toolbars).
* Displays a high-resolution custom icon on your home screen and app drawer.
* Operates **100% offline** (all audio, images, and timer logic are pre-cached locally on your device).

---

### 🍎 iPhone & iPad (iOS)

> **Important:** You must use **Apple Safari** for installation. Apple does not allow third-party browsers (like Chrome or Firefox on iOS) to add PWAs to the home screen.

1. Open **Safari** on your iPhone or iPad.
2. Navigate to the live URL:  
   👉 [https://diwakar2k.github.io/suryanamaskar-timer/](https://diwakar2k.github.io/suryanamaskar-timer/)
3. Tap the **Share** button located on the bottom toolbar (the square box with an arrow pointing upward: `⎋` / `⤤`).
4. Scroll down the share menu and tap **Add to Home Screen** (`➕`).
5. (Optional) Edit the title if you wish (defaults to **Surya**), then tap **Add** in the top-right corner.
6. The **Surya Namaskar** icon will now appear on your home screen. Tap it to launch the standalone app!

---

### 🤖 Android (Google Chrome & Other Browsers)

1. Open **Google Chrome** (or Samsung Internet / Edge) on your Android device.
2. Navigate to the live URL:  
   👉 [https://diwakar2k.github.io/suryanamaskar-timer/](https://diwakar2k.github.io/suryanamaskar-timer/)
3. **Automatic Prompt:** A banner saying **"Add Surya Namaskar to Home screen"** or **"Install app"** will typically appear at the bottom. Tap it.
4. **Manual Installation:** If the banner does not appear automatically:
   * Tap the **three-dot menu (`⋮`)** in the upper-right corner of Chrome.
   * Select **"Install app"** or **"Add to Home screen"**.
   * Tap **Install** to confirm.
5. The app icon will be placed on your home screen and in your Android app drawer.

---

### ✈️ Offline Practice Mode
Once loaded for the first time, all asana diagrams, synthesized Tibetan chimes, and spoken voice clips are permanently cached in your phone's local storage via Service Worker (`sw.js`). You can practice outdoors, in airplane mode, or with no internet connection without disruption.

---

### 🎧 Using with Spotify / Background Music
1. Start your music or podcast playlist in **Spotify**, **Apple Music**, or **YouTube Music**.
2. Open the **Surya Namaskar** app.
3. Select either **Chimes** or **Voice** mode.
4. Hit **Play (▶)**. The audio cues are configured as ambient Web Audio (`navigator.audioSession.type = 'ambient'`), so they mix smoothly over your music at full fidelity without pausing or ducking your background audio.

---

## 🌟 Key Features

* **🧘 Complete 12-Pose Sequence:**
  * Interactive circular dial featuring all 12 traditional asanas with Sanskrit and English nomenclature.
  * Real-time Pranayama breath guidance (**Inhale ⬆**, **Exhale ⬇**, **Hold Breath ⏸**).
  * Automatic alternating leg guidance for Equestrian Pose (*Ashwa Sanchalanasana*, Steps 4 & 9) based on odd/even rounds (Right leg vs. Left leg).

* **🎵 Spotify & Background Audio Coexistence:**
  * Built using the **Web Audio API** (`AudioContext`) with ambient audio session configuration (`navigator.audioSession.type = 'ambient'`).
  * Both **Chimes (Tibetan Bell)** and **Voice (Spoken count)** mix seamlessly on top of background music without ducking, pausing, or claiming exclusive audio focus.

* **📱 Mat-Side Landscape & Fullscreen Mode:**
  * **Landscape Mode:** When placed horizontally on the floor beside your yoga mat, the app automatically switches to an ergonomic two-column layout (dial on the left, timer, pose info, and controls on the right).
  * **Fullscreen Toggle (`⛶`):** Eliminates browser chrome for an immersive, distraction-free view.

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
├── README.md               # Documentation and installation guide
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

You can also run the app locally with any standard HTTP server:

### Option 1: Python
```bash
python -m http.server 5500
```
Open `http://localhost:5500` in your browser.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Click **Go Live** on the bottom status bar (or right-click `index.html` → *Open with Live Server*).
3. If viewing on a mobile phone on the same Wi-Fi:
   * Go to the **Ports** tab in VS Code.
   * Right-click the forwarded port (`5500`) and select **Port Visibility → Public**.
   * Open the provided HTTPS address on your mobile device.

---

## 👤 Author & Attribution

**Diwakar Sharma**
* GitHub: [@diwakar2k](https://github.com/diwakar2k)
* Project Repository: [suryanamaskar-timer](https://github.com/diwakar2k/suryanamaskar-timer)

---

## 📜 License

MIT License © Diwakar Sharma. Designed with reverence for traditional Hatha Yoga practice.
