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
  screenManager = new ScreenManager();
  welcomeScreen = new WelcomeScreen();
  screenManager.pushScreen(welcomeScreen);
  tick();
}

function tick() {
  now = Date.now();
  deltaTime = (now - last) / 1000;
  last = now;
  time += deltaTime;
  screenManager.update();
  screenManager.draw();
  requestAnimationFrame(tick);
}

main();

document.onkeydown = function (e) {
  screenManager.onKeyDown(e.key.charCodeAt(0));
};

document.onkeyup = function (e) {
  screenManager.onKeyUp(e.key.charCodeAt(0));
};

canvas.oncontextmenu = function (e) {
  e.preventDefault();
};

canvas.onmousemove = function (e) {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
  screenManager.onMove(x, y);
};

canvas.onmousedown = function (e) {
  e.preventDefault();
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
  screenManager.onClick(x, y, e.buttons);
};

canvas.onmouseup = function (e) {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
  screenManager.onClick(x, y, e.buttons);
};
