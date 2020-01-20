var doCache = false;

// navngiv cache
var CACHE_NAME = 'my-pwa-cache-v2';

// Slet de gamle caches, men ikke de nye
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// Når appen startes første gang, vil install køre
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          //Tag assets manifest, så vi kan få navnet på js filen (webpack hasher det)
          fetch("asset-manifest.json")
            .then(response => {
              response.json()
            })
            .then(assets => {
              //nu cacher vi filerne 
              //vi vil cache den side og main.js der bliver genereret af webpack
              // vi vil også cache alle static assets som billeder og css filer 
              const urlsToCache = [
                "/",
                assets["main.js"]
              ]
              cache.addAll(urlsToCache)
              console.log('cached');
            })
        })
    );
  }
});

// Når websiden vil fetch, så tager vi det request og ser om vi har de matchende filer
self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});