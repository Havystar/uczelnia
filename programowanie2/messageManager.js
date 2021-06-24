class MessageManager {
  constructor() {
    this.messageStack = new Array();
  }
  update(time) {
    if (this.messageStack.length != 0) {
      for (let i = 0; i < this.messageStack.length; i++) {
        if (time > this.messageStack[i].endTime) {
          this.messageStack.splice(i, 1);
          if (this.messageStack.length == 0) {
            return true;
          }
        } else {
          this.messageStack[i].draw();
        }
      }
    }
  }
  pushMessage(meassage) {
    this.messageStack.push(meassage);
  }
}
