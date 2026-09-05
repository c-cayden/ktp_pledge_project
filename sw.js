// Kill-switch service worker.
// An earlier version of this file cached every page cache-first and never refreshed,
// so returning visitors could be stuck on the old site. This version replaces it:
// it clears every cache, unregisters itself, and reloads open tabs so they fetch
// the live site. Keep this file at /sw.js so browsers that still have the old
// worker pick it up on their next visit.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((name) => caches.delete(name)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});

// No fetch handler on purpose: the browser talks to the network directly.
