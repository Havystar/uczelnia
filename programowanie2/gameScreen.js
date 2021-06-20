class GameScreen extends Screen {
  constructor() {
    super();
    this.pauseKey = 69;
    this.actionKey = 101;
    this.map = new Array();
    this.background = new Background();
    this.player = new Player(canvas.width / 2, canvas.height / 2);
  }

  update() {
    this.ticks++;
    this.player.update();
    this.background.update(this.player.getXPosition());
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.background.draw(this.ticks);
    this.player.draw(this.ticks);
  }
  onClick(x, y, buttons) {
    super.onClick(x, y, buttons);
  }
  onKeyDown(key) {
    this.player.onKeyDown(key);
    if (key == this.pauseKey) {
      screenManager.pushScreen(new PauseScreen());
    }
    if (key == this.enterKey) {
    }
    super.onKeyDown(key);
  }
  onKeyUp(key) {
    this.player.onKeyUp(key);
  }
}
