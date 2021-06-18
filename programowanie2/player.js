class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.keyState = new Array(128);
    this.keyUp = 119;
    this.keyDown = 115;
    this.keyLeft = 97;
    this.keyRight = 100;
    this.speed = 1;
    this.texture = new Image();
    //this.texture.src = "/src/player.png";
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
  draw(ticks) {}
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
