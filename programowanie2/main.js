var deltaTime = 0;
var now = 0;
var time = 0;
var last = Date.now();
function main() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;
  ctx.imageSmoothingEnabled = false;
  tick();
}

function tick() {
  now = Date.now();
  deltaTime = (now - last) / 1000;
  last = now;
  time += deltaTime;
  requestAnimationFrame(tick);
}

main();

canvas.onmousemove = function (e) {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
};
canvas.onmousedown = function (e) {
  e.preventDefault();
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
};
canvas.onmouseup = function (e) {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
};
