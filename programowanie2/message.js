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
    this.line = "";
  }

  draw() {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = this.fontsize + "px Georgia";
    ctx.fillStyle = this.textcolor;
    ctx.textAlign = "center";
    if (this.text.length > 60) {
      this.wrapText();
    } else {
      ctx.fillText(
        this.text,
        this.x + this.width / 2,
        this.y + this.height / 2
      );
    }
    ctx.restore();
  }
  wrapText() {
    let startY = this.y;
    this.y = -100;
    let words = this.text.split(" ");
    for (let i = 0; i < words.length; i++) {
      let testLine = this.line + words[i] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > this.width && i > 0) {
        ctx.fillText(
          this.line,
          this.x + this.width / 2,
          this.y + this.height / 2
        );
        this.line = words[i] + " ";
        this.y += 55;
      } else {
        this.line = testLine;
      }
    }
    ctx.fillText(this.line, this.x + this.width / 2, this.y + this.height / 2);
    this.y = startY;
  }
}
