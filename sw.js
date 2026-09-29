/**
 * @file sw.js
 * @description Service Worker for Surya Namaskar PWA.
 * Provides full offline capabilities, pre-caches audio assets, icons, and pose diagrams,
 * and handles WebKit/iOS Safari standalone WebClip navigation edge-cases.
 *
 * @version 10.0.0
 */

// Cache version identifier — bump this whenever assets or code are updated to trigger cache rotation.
const CACHE_NAME = 'surya-namaskar-v10';

// Complete manifest of static assets to pre-cache on service worker installation.
const ASSETS = [
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './apple-touch-icon-precomposed.png',
  './favicon.png',
  './images/apple-touch-icon.png',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/Surya-Namaskar-step-1.webp',
  './images/Surya-Namaskar-step-2.webp',
  './images/Surya-Namaskar-step-3.webp',
  './images/Surya-Namaskar-step-4.webp',
  './images/Surya-Namaskar-step-5.webp',
  './images/Surya-Namaskar-step-6.webp',
  './images/Surya-Namaskar-step-7.webp',
  './images/Surya-Namaskar-step-8.webp',
  './images/Surya-Namaskar-step-9.webp',
  './images/Surya-Namaskar-step-10.webp',
  './images/Surya-Namaskar-step-11.webp',
  './images/Surya-Namaskar-step-12.webp',
  './audio/1.wav',
  './audio/2.wav',
  './audio/3.wav',
  './audio/4.wav',
  './audio/5.wav',
  './audio/6.wav',
  './audio/7.wav',
  './audio/8.wav',
  './audio/9.wav',
  './audio/10.wav',
  './audio/11.wav',
  './audio/12.wav',
  './audio/start.wav',
  './audio/inhale.wav',
  './audio/exhale.wav',
  './audio/hold.wav'
];

/**
 * Service Worker Install Event.
 * Opens the new cache, pre-caches index.html with clean HTTP response headers,
 * then fetches and stores all media and icon assets.
 * Calls skipWaiting() so new worker activates immediately without waiting for tabs to close.
 */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Fetch index.html and store as a clean, unredirected text/html response
      // This prevents iOS Safari WebClip blank-screen bugs when launched from Home Screen.
      try {
        const htmlRes = await fetch('./index.html');
        const htmlText = await htmlRes.text();
        const cleanHtml = new Response(htmlText, {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
        await cache.put('./index.html', cleanHtml.clone());
        await cache.put('./', cleanHtml.clone());
        await cache.put('index.html', cleanHtml.clone());
      } catch (err) {
        console.error('[ServiceWorker] Failed to pre-cache index.html:', err);
      }

      // 2. Pre-cache all sub-resources (images, icons, synthesized audio WAV files)
      for (const url of ASSETS) {
        if (url === './index.html') continue;
        try {
          const res = await fetch(url);
          if (res.ok && res.status === 200) {
            await cache.put(url, res);
          }
        } catch (err) {
          console.warn('[ServiceWorker] Failed to pre-cache asset:', url, err);
        }
      }
    })
  );
  self.skipWaiting();
});

/**
 * Service Worker Activate Event.
 * Cleans up stale caches from previous versions and claims active clients immediately.
 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/**
 * Strips WebKit/Safari internal `redirected` flag from a response.
 * Safari Mobile throws errors if a redirected Response is passed to `respondWith` in certain standalone PWA contexts.
 *
 * @param {Response} response - The raw fetch or cache Response object.
 * @returns {Response} A normalized Response object safe for Safari WebKit.
 */
function cleanResponse(response) {
  if (!response || !response.redirected) return response;
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

/**
 * Service Worker Fetch Event.
 * Implements a Cache-First strategy with network fallback for offline support.
 */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Handle top-level HTML navigation (e.g. initial URL load, reload, or iOS WebClip launch)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then((cached) => {
        if (cached) {
          return cached.text().then((html) => {
            return new Response(html, {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        }
        return fetch(e.request).then(cleanResponse).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  // Handle all other sub-resources (images, icons, audio files, web manifest)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cleanResponse(cached);
      return fetch(e.request).then(cleanResponse);
    })
  );
});