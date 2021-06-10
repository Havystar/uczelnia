class WelcomeScreen extends Screen {
  constructor() {
    super();
    this.ticks = 0;
    this.bubblesWidth = 60;
    this.bubblesheight = 10;
    this.bubbles = [];
    this.start = false;
    this.welcomeText = "programowanie2";
    this.createBubbles = function () {
      for (let j = 0; j < this.bubblesWidth; j++) {
        for (let k = 0; k < this.bubblesheight; k++) {
          let r = 3;
          let speedX = Math.random() * 1;
          let randomX = [speedX, "-" + speedX];
          let speedY = Math.random() * 1;
          let randomY = [speedY, "-" + speedY];
          let nbrRandomX = Math.floor(Math.random() * 2);
          let nbrRandomY = Math.floor(Math.random() * 2);
          let newBubble = new Bubble(
            canvas.width / 2 + j * 5 - 120,
            canvas.height / 2 + k * 5 - 30,
            r,
            randomX[nbrRandomX],
            randomY[nbrRandomY]
          );
          this.bubbles.push(newBubble);
        }
      }
    };
    this.createBubbles();
  }

  onClick() {
    if (this.start == false) {
      //after some time reverse prosess.
    }
    this.start = true;
  }
  draw() {
    ctx.beginPath();
    if (!this.start) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = "transparent";
    }
    ctx.font = "bold 28px Lucida Handwriting";
    ctx.fillText(this.welcomeText, canvas.width / 2 - 120, canvas.height / 2);
  }
  update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.start) {
      for (let m = this.bubbles.length - 1; m >= 0; m--) {
        this.bubbles[m].update();
      }
    }
  }
}
