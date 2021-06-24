class PauseScreen extends Screen {
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    this.width = canvas.width - this.x;
    this.height = canvas.height - this.y;
    this.menuBtns = new Array();
    this.backgroundColor = "rgba(120, 190, 200, 0.6)";
    this.menuBtns.push(
      new Button(
        500,
        225,
        300,
        100,
        "Resume",
        "rgba(90,205,0,1)",
        "rgba(50,50,50,1)",
        40,
        () => {
          screenManager.popScreen();
        }
      )
    );
    this.menuBtns.push(
      new Button(
        500,
        375,
        300,
        100,
        "Exit",
        "rgba(90,205,0,1)",
        "rgba(50,50,50,1)",
        40,
        () => {
          screenManager.popScreen();
          screenManager.popScreen();
        }
      )
    );
  }

  update() {}
  draw() {
    ctx.save();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width - this.x, this.height - this.y);
    ctx.restore();
    for (let j = 0; j < this.menuBtns.length; j++) {
      this.menuBtns[j].draw();
    }
  }
  onClick(x, y, buttons) {
    super.onClick(x, y, buttons);
    for (let j = 0; j < this.menuBtns.length; j++) {
      this.menuBtns[j].onClick(this.mouse);
    }
  }
  onKeyDown(key) {}
  onKeyUp(key) {}
}
