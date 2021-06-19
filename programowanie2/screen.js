class Screen {
  constructor() {
    this.mouse = { x: 0, y: 0, buttons: 0, prevButtons: 0 };
    this.ticks = 0;
  }

  update() {}

  draw() {}

  onClick(x, y, buttons) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.prevButtons = this.mouse.buttons;
    this.mouse.buttons = buttons;
    return false;
  }

  onMove(x, y) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  onKeyDown() {}

  onKeyUp() {}
  pause() {}
}
