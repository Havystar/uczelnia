class GameScreen extends Screen {
  constructor() {
    super();
    this.pauseKey = 69;
    this.actionKey = 101;
    this.map = new Array();
  }

  update() {}
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  onClick(x, y, buttons) {
    super.onClick(x, y, buttons);
  }
  onKeyDown(key) {
    console.log(key);
    if (key == this.pauseKey) {
      screenManager.pushScreen(new PauseScreen());
    }
    if (key == this.enterKey) {
    }
    super.onKeyDown(key);
  }
  onKeyUp(key) {}
}
