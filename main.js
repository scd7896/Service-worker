if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((pSw) => {
      console.log("등록됨", pSw);
    })
    .catch((err) => {
      console.log("등록 실패함", err);
    });
}

alert("이제 취소했어");
