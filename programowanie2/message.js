class Message {
  constructor(
    x,
    y,
    width,
    height,
    text,
    textcolor,
    fontsize,
    startTime,
    endTime
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.textcolor = textcolor;
    this.fontsize = fontsize;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  draw() {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = this.fontsize + "px Georgia";
    ctx.fillStyle = this.textcolor;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }
}
