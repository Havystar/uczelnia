class Background {
  constructor() {
    this.loadTexture = function (path) {
      let tmp = new Image();
      tmp.src = path;
      return tmp;
    };
    this.textures = [
      this.loadTexture("/src/graphics/0.png"),
      this.loadTexture("/src/graphics/1.png"),
      this.loadTexture("/src/graphics/2.png"),
      this.loadTexture("/src/graphics/3.png"),
      this.loadTexture("/src/graphics/4.png"),
    ];
    this.offset = [0, 0, 0, 0, 0];
    this.speed = [0, 0.4, 0.8, 1.2, 2.2];
    this.size = { width: 576, height: 324 };
    this.scale = { x: (1280 / 576 / 2) * 2, y: 720 / 324 };
  }
  update(playerPosX) {
    for (let i = 1; i < this.textures.length; i++) {
      this.offset[i] = -playerPosX * this.speed[i];
    }
  }
  draw() {
    ctx.save();

    ctx.save();
    ctx.translate(this.offset.layer0, 0);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.drawImage(this.textures[0], this.size.width, 0);
    ctx.drawImage(this.textures[0], -this.size.width, 0);
    ctx.drawImage(this.textures[0], -this.size.width * 2, 0);
    ctx.drawImage(this.textures[0], 0, 0);
    ctx.restore();
    for (let i = 1; i < this.textures.length; i++) {
      ctx.save();
      ctx.translate(this.offset[i], 0);
      ctx.scale((this.scale.x * 4) / 3, this.scale.y);
      ctx.drawImage(this.textures[i], this.size.width, 0);
      if (i == 4) {
        ctx.drawImage(this.textures[i], this.size.width * 2, 0);
      }
      ctx.drawImage(this.textures[i], -this.size.width, 0);
      ctx.drawImage(this.textures[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }
}
