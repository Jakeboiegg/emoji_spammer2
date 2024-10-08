// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = [
  "/",
  "/fonts/OpenSans.ttf",
  "/fonts/SpaceGrotesk.ttf",
  "/images/favicon-128.png",
  "/images/favicon.ico",
  "/emoji_generator.js",
  "/index.html",
  "/index.js",
  "/manifest.json",
  "style.css"
]; 

// Install event: Cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources);
    })
  );
});

// Activate event: Cleanup old caches if necessary
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];  // Only keep the current cache version
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            // Delete old cache that isn't in the whitelist
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cache first, then update the cache with network response
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Check if the response is valid
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;  // Return the network response if itÕs invalid for caching
        }
        
        // Update the cache with the new response
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        
        return networkResponse;  // Return the fetched network response
      }).catch(() => {
        // Optional: handle network errors (e.g., display an offline page)
      });
      
      // Return the cached response first, and update the cache in the background
      return cachedResponse || fetchPromise;
    })
  );
});
