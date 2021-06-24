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
    this.bckgrdAudio = new Audio("src/music/WarriyoMortals.mp3");
    this.bckgrdAudio.volume = 0.0;
    this.bckgrdAudio.loop = true;
    this.bckgrdAudio.play();
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
    this.player.update();
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
