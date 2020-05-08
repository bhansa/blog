/*
  ============================================
  		Service workers are awesome 
  ============================================
*/

self.importScripts("/assets/js/sw-toolbox.js");
self.importScripts("/assets/js/idb-wrapper.js");

self.addEventListener("install", function (event) {
  event.waitUntil(
    idbKeyval.get("promosData").then((data) => {
      self.toolbox.precache([data.url]);
    })
  );
});

// intercept fetch
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
