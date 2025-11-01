// VexoStream minimal service worker (static pre-cache)
const VERSION = 'v1';
const CACHE_NAME = `vexo-${VERSION}`;
const PRECACHE = [
  '/',
  '/index.html',
  '/browse.html',
  '/title.html',
  '/watch.html',
  '/profile.html',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/js/helpers.js',
  '/assets/js/data.js',
  '/assets/js/ui.js',
  '/assets/js/app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return; // only GET
  if (url.origin !== location.origin) return; // skip cross-origin (images/videos)

  // Cache-first for precached/static assets
  if (PRECACHE.includes(url.pathname)) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const copy = res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req, copy)); return res;
      }))
    );
    return;
  }

  // Network-first fallback to cache for navigations/others
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req, copy)); return res;
    }).catch(()=> caches.match(req))
  );
});

