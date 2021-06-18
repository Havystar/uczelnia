class MenuScreen extends Screen {
  constructor() {
    super();
    this.ticks = 0;
    this.focused = true;
    this.menuBtns = new Array();
    this.menuBtns.push(
      new Button(
        500,
        100,
        300,
        100,
        "New game",
        "rgba(255,0,0,1)",
        "rgba(255,255,255,1)",
        40,
        () => {
          screenManager.pushScreen(new GameScreen());
        }
      )
    );
    this.menuBtns.push(
      new Button(
        500,
        250,
        300,
        100,
        "Author",
        "rgba(255,0,0,1)",
        "rgba(255,255,255,1)",
        40
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
    for (let j = 0; j < this.menuBtns.length; j++) {
      this.menuBtns[j].draw();
    }
  }
  update() {}
}
