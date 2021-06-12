class Bubble {
  constructor(x, y, ra, speedX, speedY, color) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.ra = ra;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isReverse = false;
    this.draw = function () {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ra, 0, 2 * Math.PI);
      ctx.fill();
    };
    this.update = function () {
      if (!this.isReverse) {
        this.x -= this.speedX;
        this.y -= this.speedY;
      } else {
        this.x += this.speedX * 3;
        this.y += this.speedY * 3;
      }
      this.draw();
    };
  }
  reverse() {
    this.isReverse = true;
  }
}
