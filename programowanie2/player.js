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
      this.keyState[this.keyLeft] ||
      this.keyState[this.keyRight]
    ) {
      if ((this.x / this.speed) % 8 == 0) {
        ctx.drawImage(this.texturesRun[0], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 1) {
        ctx.drawImage(this.texturesRun[1], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 2) {
        ctx.drawImage(this.texturesRun[2], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 3) {
        ctx.drawImage(this.texturesRun[3], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 4) {
        ctx.drawImage(this.texturesRun[4], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 5) {
        ctx.drawImage(this.texturesRun[5], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 6) {
        ctx.drawImage(this.texturesRun[6], this.x, this.y);
      } else if ((this.x / this.speed) % 8 == 7) {
        ctx.drawImage(this.texturesRun[7], this.x, this.y);
      }
    } else {
      if (ticks % 8 == 0) {
        this.currentTexture++;
        if (this.currentTexture >= this.texturesIdle.length) {
          this.currentTexture = 0;
        }
      }
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
