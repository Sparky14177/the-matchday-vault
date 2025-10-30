const CACHE = 'mv-v3_1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './intro.js',
  './collection.js',
  './items.json',
  './logo-vault.jpg'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
