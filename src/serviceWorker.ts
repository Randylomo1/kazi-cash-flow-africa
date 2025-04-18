
// This simple service worker enables basic offline functionality
// It caches app assets and API responses for offline access

const CACHE_NAME = 'kazi-cash-v1';

// Assets to cache immediately during installation
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
];

// Listen for the install event and cache static assets
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate new service worker and clean up old caches
self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response to cache it and return it
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            // Only cache same-origin requests
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseClone);
            }
          });
        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, return a basic offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle message events (for communication with the app)
self.addEventListener('message', (event: any) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }
});

// TypeScript requires export something to be a module
export {};
