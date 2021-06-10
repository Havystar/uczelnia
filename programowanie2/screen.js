class Screen {
  constructor() {
    this.keyState = new Array(128);
    this.mouse = { x: 0, y: 0, buttons: 0, prevButtons: 0 };
    this.keyUp = 87;
    this.keyDown = 83;
    this.keyLeft = 65;
    this.keyRight = 68;
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

  onKeyDown(key) {
    this.keyState[key] = true;
  }

  onKeyUp(key) {
    this.keyState[key] = false;
  }
}
