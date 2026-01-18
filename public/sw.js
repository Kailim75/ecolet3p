// T3P Campus Service Worker - Cache Strategy
const CACHE_NAME = 't3p-campus-v1';
const RUNTIME_CACHE = 't3p-runtime-v1';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, then network (for static assets)
  cacheFirst: async (request, cacheName = RUNTIME_CACHE) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return cached;
    }
  },
  
  // Network first, fallback to cache (for dynamic content)
  networkFirst: async (request, cacheName = RUNTIME_CACHE) => {
    const cache = await caches.open(cacheName);
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      
      // Return offline page for navigation requests
      if (request.mode === 'navigate') {
        return cache.match('/');
      }
      throw error;
    }
  },
  
  // Stale while revalidate (for fonts, images)
  staleWhileRevalidate: async (request, cacheName = RUNTIME_CACHE) => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);
    
    return cached || fetchPromise;
  }
};

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // Skip API calls (Supabase, external APIs)
  if (url.hostname.includes('supabase') || 
      url.pathname.startsWith('/api') ||
      url.pathname.includes('functions')) {
    return;
  }
  
  // Strategy based on request type
  let strategy;
  
  // Fonts - stale while revalidate
  if (url.hostname.includes('fonts.googleapis.com') || 
      url.hostname.includes('fonts.gstatic.com')) {
    strategy = CACHE_STRATEGIES.staleWhileRevalidate(request);
  }
  // Images - cache first
  else if (request.destination === 'image' || 
           url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    strategy = CACHE_STRATEGIES.cacheFirst(request);
  }
  // JS/CSS assets - stale while revalidate
  else if (request.destination === 'script' || 
           request.destination === 'style' ||
           url.pathname.match(/\.(js|css)$/i)) {
    strategy = CACHE_STRATEGIES.staleWhileRevalidate(request);
  }
  // HTML pages - network first
  else if (request.mode === 'navigate' || 
           request.destination === 'document') {
    strategy = CACHE_STRATEGIES.networkFirst(request);
  }
  // Default - network first
  else {
    strategy = CACHE_STRATEGIES.networkFirst(request);
  }
  
  event.respondWith(strategy);
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
