class Button {
  constructor(
    x,
    y,
    width,
    height,
    text,
    textColor,
    backgroundColor,
    fontSize,
    callback
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
    this.callback = callback;
  }

  draw() {
    ctx.save();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = this.fontSize + "px Georgia";
    ctx.fillStyle = this.textColor;
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + this.fontSize / 2 - 8
    );

    ctx.restore();
  }

  checkPosition(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  onClick(mouse) {
    if (this.checkPosition(mouse.x, mouse.y) && (mouse.buttons == 1) == true) {
      console.log(mouse);
      if (this.callback) {
        this.callback();
      }
    }
  }
}
