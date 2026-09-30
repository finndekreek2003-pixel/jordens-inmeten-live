const CACHE='jordens-inmeten-v2';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./manifest.webmanifest','./icon.svg']))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.pathname.startsWith('/api/'))return;event.respondWith(fetch(request).then(response=>{if(response.ok&&url.origin===location.origin)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));return response;}).catch(()=>caches.match(request).then(response=>response||caches.match('./'))));});
