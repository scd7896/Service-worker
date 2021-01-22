const root = document.querySelector("#root");

window.onload = () => {
  const h1 = document.createElement("h1");
  h1.textContent = "루트 변경하겠습니다.3";
  root.appendChild(h1);
};
