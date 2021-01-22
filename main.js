if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;

        newWorker.addEventListener("statechange", (e) => {});
      });
    })
    .catch((err) => {
      console.log("등록 실패함", err);
    });
}

navigator.serviceWorker.addEventListener("controllerchange", () => {
  // worker에서 skipWaiting을 할 경우 감지를 합니다.
  alert("새로운 업데이트를 감지했습니다. 새로고침 하겠습니다.");
  window.location.reload();
});
