const CACHE_NAME = 'tokyo-trip-2026-v1';

const ASSETS_TO_CACHE = [
  '/tokyo-trip-2026/',
  '/tokyo-trip-2026/index.html',
  '/tokyo-trip-2026/assets/akihabara_street.png',
  '/tokyo-trip-2026/assets/aqua_park.png',
  '/tokyo-trip-2026/assets/kawagoe_clock_tower.png',
  '/tokyo-trip-2026/assets/odaiba_gundam.png',
  '/tokyo-trip-2026/assets/pokemon_center_dx.png',
  '/tokyo-trip-2026/assets/sanrio_cafe.png',
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
