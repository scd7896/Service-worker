const CACHE_NAME = "example-cache-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./main.js",
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
  console.log("서비스워커 설치 (install)함");
  console.log("새로 생성함");
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

  console.log("서비스 워커 동작함");
  console.log("더 추가함");
});

self.addEventListener("fetch", (event) => {
  console.log("데이터 요청!", event.request);
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((res) => {
        return res || fetch(event.request);
      });
    })
  );
});
