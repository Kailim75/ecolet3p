// Kill-switch Service Worker
// Remplace l'ancien SW qui servait des chunks JS obsoletes (page blanche).
// Ce SW se desinscrit lui-meme et vide tous les caches au prochain chargement.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {
      // ignore
    }

    try {
      await self.registration.unregister();
    } catch (e) {
      // ignore
    }

    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => {
        if ('navigate' in client) {
          client.navigate(client.url);
        }
      });
    } catch (e) {
      // ignore
    }
  })());
});

// Pass-through: ne jamais intercepter de requetes (pas de cache).
self.addEventListener('fetch', () => {});
