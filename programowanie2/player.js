class Player extends sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.keyState = new Array(128);
    this.keyUp = 119;
    this.keyDown = 115;
    this.keyLeft = 97;
    this.keyRight = 100;
    this.speed = 1;
    this.texturesIdle = [
      this.loadTexture("/src/player/idle/idle-1.png"),
      this.loadTexture("/src/player/idle/idle-2.png"),
      this.loadTexture("/src/player/idle/idle-3.png"),
      this.loadTexture("/src/player/idle/idle-4.png"),
    ];
    this.texturesRun = [
      this.loadTexture("/src/player/run/run-1.png"),
      this.loadTexture("/src/player/run/run-2.png"),
      this.loadTexture("/src/player/run/run-3.png"),
      this.loadTexture("/src/player/run/run-4.png"),
      this.loadTexture("/src/player/run/run-5.png"),
      this.loadTexture("/src/player/run/run-6.png"),
      this.loadTexture("/src/player/run/run-7.png"),
      this.loadTexture("/src/player/run/run-8.png"),
    ];
    this.currentTexture = 0;
    this.bound = 8;
  }
  changeCurrentTexture(chenger, bound, textures) {
    if (chenger % bound == 0) {
      this.currentTexture++;
    }
    if (this.currentTexture >= textures.length) {
      this.currentTexture = 0;
    }
  }
  update() {
    console.log(this.x + "," + this.y);
    if (this.keyState[this.keyLeft]) {
      this.x -= this.speed;
    }
    if (this.keyState[this.keyRight]) {
      this.x += this.speed;
    }
  }
  draw(ticks) {
    if (
      this.keyState[this.keyUp] ||
      this.keyState[this.keyDown] ||
      this.keyState[this.keyRight]
    ) {
      this.changeCurrentTexture(this.x, this.bound, this.texturesRun);
      ctx.drawImage(this.texturesRun[this.currentTexture], this.x, this.y);
    } else if (this.keyState[this.keyLeft]) {
      ctx.save();
      ctx.setTransform(-1, 0, 0, 1, 0, 0);
      this.changeCurrentTexture(this.x, this.bound, this.texturesRun);
      ctx.drawImage(
        this.texturesRun[this.currentTexture],
        -this.x - 71,
        this.y
      );
      ctx.restore();
    } else {
      this.changeCurrentTexture(ticks, this.bound, this.texturesIdle);
      ctx.drawImage(this.texturesIdle[this.currentTexture], this.x, this.y);
    }
  }
  getXPosition() {
    return this.x;
  }
  onKeyDown(key) {
    this.keyState[key] = true;
  }
  onKeyUp(key) {
    this.keyState[key] = false;
  }
}
