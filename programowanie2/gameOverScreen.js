class GameOverScreen extends Screen {
  constructor() {
    super();
    this.focused = true;
    this.endText = "GAME OVER";
    this.menuBtns = new Array();
    this.menuBtns.push(
      new Button(
        500,
        350,
        300,
        100,
        "PLAY AGAIN",
        "rgba(255,0,0,1)",
        "rgba(255,255,255,1)",
        40,
        () => {
          screenManager.popScreen();
          screenManager.pushScreen(new GameScreen());
        }
      )
    );
    this.menuBtns.push(
      new Button(
        500,
        500,
        300,
        100,
        "MENU",
        "rgba(255,0,0,1)",
        "rgba(255,255,255,1)",
        40,
        () => {
          screenManager.popScreen();
        }
      )
    );
  }
  onClick(x, y, buttons) {
    super.onClick(x, y, buttons);
    if (this.focused) {
      for (let j = 0; j < this.menuBtns.length; j++) {
        this.menuBtns[j].onClick(this.mouse);
      }
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "bold 36px Lucida Handwriting";
    for (let j = 0; j < this.menuBtns.length; j++) {
      this.menuBtns[j].draw();
    }
    ctx.fillText(this.endText, canvas.width / 2 - 110, canvas.height / 2 - 150);
  }
}
