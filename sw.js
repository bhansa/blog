/*
  ============================================
  		Service workers are awesome 
  ============================================
*/



const staticVersion = 0.1;

// cache resources when install complete...
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open('bhansa-blog-' + staticVersion).then(function(cache){
			return cache.addAll([
				'index.html',
				'/assets/images/cover.jpeg',
				'/assets/images/cover-medium.jpeg',
				'/assets/images/cover-small.jpeg',
				'/assets/css/main.css',
				'/assets/css/screen.css'
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


// activated sw
self.addEventListener('activate', function (event) {
  console.log('Activated', event);
});

// add push event listener 
self.addEventListener('push', function(event){
	console.log('push message', event);
	// show push notifications
	self.registration.showNotification('Push message', {
		body: 'hey bhansa',
		icon: '/assets/images/icons/icon-96x96.png'
	})
})