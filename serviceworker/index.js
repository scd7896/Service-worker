var CACHE_NAME = "my-site-cache-v1"; // 캐시 storage의 key 값이 됩니다.
var urlsToCache = [
  // 저장할 정적 파일들의 경로들을 문자열로 갖는 배열입니다.
  "../",
  "../styles/main.css",
  "../script/main.js",
  "../script/main2.js",
];

self.addEventListener("install", function (event) {
  // 이때 self는 serviceWorker를 가르킵니/다.
  console.log("install");
  event.waitUntil(
    caches
      .open(CACHE_NAME) // 해당 키값을 cache storage 에서 오픈합니다.
      .then(function (cache) {
        return cache.addAll(urlsToCache); // 위의 리스트를 chache storage에 저장합니다.
      })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log(response, event.request);
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
