class ScreenManager {
  constructor() {
    this.screenStack = new Array();
  }

  pushScreen(screen) {
    if (this.screenStack.length > 0) {
      this.screenStack[0].pause();
    }
    this.screenStack.unshift(screen);
  }

  popScreen() {
    let temp = this.screenStack.shift();
    return temp;
  }

  clearAll() {
    this.screenStack = new Array();
  }

  update() {
    this.screenStack[0].update();
  }

  draw() {
    this.screenStack[0].draw();
  }

  onClick(x, y, buttons) {
    this.screenStack[0].onClick(x, y, buttons);
  }

  onMove(x, y) {
    this.screenStack[0].onMove(x, y);
  }

  onKeyDown(key) {
    this.screenStack[0].onKeyDown(key);
  }

  onKeyUp(key) {
    this.screenStack[0].onKeyUp(key);
  }
}
