class Bubble {
  constructor(x, y, ra, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.ra = ra;
    this.speedX = speedX;
    this.speedY = speedY;
    this.draw = function () {
      ctx.fillStyle = "rgb(255,0,30)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ra, 0, 2 * Math.PI);
      ctx.fill();
    };
    this.update = function () {
      this.x -= this.speedX;
      this.y -= this.speedY;
      this.draw();
    };
  }
}
