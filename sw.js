// cache resources when install complete...
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open('bhansa-blog').then(function(cache){
			return cache.addAll([
				'index.html',
				'/assets/images/cover.jpeg',
				'/assets/images/cover-medium.jpeg',
				'/assets/images/cover-small.jpeg'
			]);
		})
	);
});


// bypass the network requests
self.addEventListener('fetch', function(e) {
  console.log('[Serive Worker] ', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});