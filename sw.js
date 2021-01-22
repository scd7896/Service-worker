const CACHE_NAME = "example-cache-v1.10.24";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./main.js",
  "./main2.js",
  "./main.css",
  "./img/icon-128x128.png",
  "./img/icon-144x144.png",
  "./img/icon-152x152.png",
  "./img/icon-192x192.png",
  "./img/icon-256x256.png",
  "./img/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("service worker pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  // 파일을 가져올때, 기존에 있는 캐시가 가져오는 캐시이름과 다를 경우 skipWaiting을 진행한다.
  caches.keys().then((keyList) => {
    keyList.map((key) => {
      if (key !== CACHE_NAME) {
        self.skipWaiting();
      }
    });
  });
  // console.log("서비스워커 설치 (install)함");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  // console.log("서비스 워커 동작(activate)함");
});

self.addEventListener("fetch", (event) => {
  // console.log("데이터 (fetch) 요청!", event.request);
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((res) => {
        return res || fetch(event.request);
      });
    })
  );
});
