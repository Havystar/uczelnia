class Ocr {
  constructor() {
    this.model = null;
    this.input = null;
    this.image = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 280;
    this.height = 280;
    this.done = false;
    this.ctxclicked = false;
    this.btnclicked = false;
    this.butclicked2 = false;
    this.posX, this.posY;
    this.messages = new MessageManager();
    this.img = new ImageData(280, 280);
    this.imgs = new ImageData(28, 28);
    this.butx = 290;
    this.butx2 = 290;
    this.buty = 260;
    this.buty2 = 340;
    this.butwidth = 30;
    this.butheight = 30;
    this.first = true;
    this.math1 = Math.floor(Math.random() * 3);
    this.math2 = Math.floor(Math.random() * 3);
    this.math3 = Math.floor(Math.random() * 2);
    this.answer = this.math1 + this.math2 * this.math3;
    this.ocr = [];
    for (let i = 0; i < this.img.data.length; i += 4) {
      this.img.data[i] = 0;
      this.img.data[i + 1] = 0;
      this.img.data[i + 2] = 0;
      this.img.data[i + 3] = 255;
    }
  }
  predict() {
    this.input = tf.browser
      .fromPixels(this.imgs, 1)
      .toFloat()
      .reshape([1, 28, 28, 1]);

    console.log(this.input.arraySync().toString());

    const predictions = model.predict(this.input).arraySync();
    let res = [];
    for (let pred of predictions) {
      let maxi = 0;
      for (let i = 1; i < pred.length; i++) {
        if (pred[maxi] < pred[i]) {
          maxi = i;
        }
      }
      res.push(maxi);
    }
    return res;
  }
  update() {
    if (this.butclicked2) {
      this.butclicked2 = false;
      for (let i = 0; i < this.img.data.length; i += 4) {
        this.img.data[i] = 0;
        this.img.data[i + 1] = 0;
        this.img.data[i + 2] = 0;
        this.img.data[i + 3] = 255;
      }
    }
    if (this.answer == this.ocr[0]) {
      this.done = true;
      screenManager.popScreen();
      screenManager.pushScreen(new VictoryScreen());
      this.ocr = [];
    }
    if (this.done) {
      this.tick += deltaTime;
      if (this.tick >= 3) {
        this.done = false;
        //return true;
      }
    }
    //return false;
  }

  onClick(mouse) {
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.width &&
      mouse.y > this.y &&
      mouse.y < this.y + this.height &&
      (mouse.buttons & 1) == 1
    ) {
      this.ctxclicked = true;
    } else if (
      mouse.x > this.butx &&
      mouse.x < this.butx + this.butwidth &&
      mouse.y > this.buty &&
      mouse.y < this.buty + this.butheight &&
      (mouse.buttons & 1) == 1
    ) {
      this.butclicked = true;
    } else if (
      mouse.x > this.butx2 &&
      mouse.x < this.butx2 + this.butwidth &&
      mouse.y > this.buty2 &&
      mouse.y < this.buty2 + this.butheight &&
      (mouse.buttons & 1) == 1
    ) {
      this.butclicked2 = true;
    } else if ((mouse.buttons & 1) == 0) {
      this.ctxclicked = false;
      this.butclicked = false;
    }
  }

  onMove(mouse) {
    this.posX = mouse.x;
    this.posY = mouse.y;
  }
  draw() {
    if (this.first) {
      this.messages.pushMessage(
        new Message(
          (canvas.width - 800) / 2,
          (canvas.height - 600) / 2,
          800,
          128,
          this.math1 + " + " + this.math2 + " * " + this.math3,
          "rgba(255,0,0,255)",
          20,
          time,
          time + 5
        )
      );
      this.first = false;
    }

    if (!this.done) {
      ctx.putImageData(this.img, this.x, this.y);
      if (this.ctxclicked) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 280 / 12;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX, this.posY);
        ctx.stroke();
        ctx.restore();
      }
      this.img = ctx.getImageData(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "red";
      ctx.fillRect(this.butx, this.buty, this.butwidth, this.butheight);
      ctx.font = "18px 'Press Start 2P'";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Wyślij",
        this.butx + 15,
        this.buty - 10,
        this.butwidth + 30,
        this.butheight
      );
      ctx.fillRect(this.butx2, this.buty2, this.butwidth, this.butheight);
      ctx.fillText(
        "Wymaż",
        this.butx2 + 15,
        this.buty2 - 10,
        this.butwidth + 30,
        this.butheight
      );
      if (this.butclicked) {
        ctx.save();
        this.buttonclicked = false;
        ctx.drawImage(
          canvas,
          this.x,
          this.y,
          this.width,
          this.height,
          this.x - 28,
          this.y - 28,
          28,
          28
        );
        this.imgs = ctx.getImageData(this.x - 28, this.y - 28, 28, 28);
        ctx.fillStyle = "rgba(3,6,120,255)";
        ctx.fillRect(this.x - 28, this.y - 28, 28, 28);
        this.ocr = this.predict();
        console.log(this.ocr);
        ctx.restore();
      }
      this.messages.update(time);
      ctx.save();
      ctx.fillStyle = "white";
      ctx.restore();
    } else {
      ctx.font = "32px Georgia";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Good Job",
        this.x + this.width / 2,
        this.y + this.height / 2
      );
    }
  }
}
