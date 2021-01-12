self.onmessage = (e) => {
  let result = 0;
  for (let i = 0; i <= 1e10; i++) {
    result += 1;
  }
  self.postMessage(result);
};
