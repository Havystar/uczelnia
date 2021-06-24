class GameScreen extends Screen {
  constructor() {
    super();
    this.pauseKey = 69;
    this.actionKey = 101;
    this.focused = true;
    this.background = new Background();
    this.map = new Map();
    this.player = new Player(100, 0);
    this.messages = new MessageManager();
  }

  update() {
    this.ticks++;
    this.player.isOnPlatform = this.map.checkIfOnPlatform(
      this.player.getCoordinatesOnMap()
    );
    if (this.player.isClimbing) {
      this.player.isClimbing = this.map.checkIfOnLadder(
        this.player.getCoordinatesOnMap()
      );
    }
    if (
      this.map.teleports[this.map.teleport - 1] ==
        this.player.getCoordinatesOnMap() &&
      this.player.teleportCuldown <= 0 &&
      this.map.teleport > 0
    ) {
      this.player.y = Math.floor(this.map.newCoordinates / 80) * 16 - 64;
      this.player.x = Math.floor(this.map.newCoordinates % 80) * 16;
      this.player.teleportCuldown = 300;
    }
    this.player.update(this.ticks);
    this.background.update(this.player.getXPosition());
    this.focused = this.messages.update(time);
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.background.draw(this.ticks);
    this.map.draw();
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
    if (key == this.actionKey) {
      if (this.player.isClimbing) {
        this.player.isClimbing = false;
      } else {
        this.player.isClimbing = this.map.checkIfOnLadder(
          this.player.getCoordinatesOnMap()
        );
        this.player.update();
      }
    }
    super.onKeyDown(key);
  }
  onKeyUp(key) {
    this.player.onKeyUp(key);
  }
}
