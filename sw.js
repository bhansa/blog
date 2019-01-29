/*
  ============================================
  		Service workers are awesome 
  ============================================
*/

self.importScripts('/assets/js/sw-toolbox.js');

self.toolbox.precache([
	'offline.html'
]);


self.toolbox.router.get('/(.*)', function(req, vals, opts){

    return toolbox.networkFirst(req, vals, opts)
    .catch(function(error){
        if(req.method === 'GET' && req.headers.get('accept').includes('text/html')){
			return toolbox.cacheOnly(new Request('offline.html'), vals, opts);
        }
        throw error;
    });

});

console.log('%cFiles cached', 'color: green; font-size: 40px');
