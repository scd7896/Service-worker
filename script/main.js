onload = function (e) {
  const root = document.querySelector("#root");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  h1.textContent = "h1입니다.";
  h2.textContent = "h2를 추가했습니다";
  root.appendChild(h1);
  root.appendChild(h2);
};
