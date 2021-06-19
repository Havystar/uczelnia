class sprite {
  constructor() {
    this.loadTexture = function (path) {
      let tmp = new Image();
      tmp.src = path;
      return tmp;
    };
  }
}
