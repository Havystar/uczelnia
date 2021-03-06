class Player extends sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.keyState = new Array(128);
    this.keyUp = 119;
    this.keyDown = 115;
    this.keyLeft = 97;
    this.keyRight = 100;
    this.oldChanger;
    this.oldTicks = 0;
    this.teleportCuldown = 0;
    this.speed = 2;
    this.gravity = 4;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isClimbing = false;
    this.isOnPlatform = false;
    this.coordinatesOnMap;
    this.texturesIdle = [
      this.loadTexture("/src/player/idle/idle-1.png"),
      this.loadTexture("/src/player/idle/idle-2.png"),
      this.loadTexture("/src/player/idle/idle-3.png"),
      this.loadTexture("/src/player/idle/idle-4.png"),
    ];
    this.texturesRun = [
      this.loadTexture("/src/player/run/run-1.png"),
      this.loadTexture("/src/player/run/run-2.png"),
      this.loadTexture("/src/player/run/run-3.png"),
      this.loadTexture("/src/player/run/run-4.png"),
      this.loadTexture("/src/player/run/run-5.png"),
      this.loadTexture("/src/player/run/run-6.png"),
      this.loadTexture("/src/player/run/run-7.png"),
      this.loadTexture("/src/player/run/run-8.png"),
    ];
    this.texturesJump = [
      this.loadTexture("/src/player/jump/jump-1.png"),
      this.loadTexture("/src/player/jump/jump-2.png"),
      this.loadTexture("/src/player/jump/jump-3.png"),
      this.loadTexture("/src/player/jump/jump-4.png"),
    ];
    this.texturesClimb = [
      this.loadTexture("/src/player/climb/climb-1.png"),
      this.loadTexture("/src/player/climb/climb-2.png"),
      this.loadTexture("/src/player/climb/climb-3.png"),
      this.loadTexture("/src/player/climb/climb-4.png"),
      this.loadTexture("/src/player/climb/climb-5.png"),
      this.loadTexture("/src/player/climb/climb-6.png"),
    ];
    this.currentTexture = 0;
    this.bound = 6;
  }

  changeCurrentTexture(chenger, bound, textures) {
    if (this.oldChanger != parseInt(chenger)) {
      if (parseInt(chenger) % bound == 0) {
        this.currentTexture++;
      }
      if (this.currentTexture >= textures.length) {
        this.currentTexture = 0;
      }
    }
    this.oldChanger = parseInt(chenger);
  }
  moveInX() {
    if (
      (this.keyState[this.keyRight] && this.keyState[this.keyLeft]) ||
      !this.isOnPlatform
    ) {
      //this.velocityX = 0;
    } else if (this.isClimbing) {
      this.velocityX = 0;
      this.velocityY = 0;
      return;
    } else if (this.keyState[this.keyLeft]) {
      if (this.velocityX <= -this.speed) {
        this.velocityX = -this.speed;
      } else {
        this.velocityX -= this.speed / 10;
      }
    } else if (this.keyState[this.keyRight]) {
      if (this.velocityX >= this.speed) {
        this.velocityX = this.speed;
      } else {
        this.velocityX += this.speed / 10;
      }
    } else {
      if (this.velocityX > 0) {
        this.velocityX -= this.speed / 20;
        if (this.velocityX < this.speed / 20) {
          this.velocityX = 0;
        }
      } else if (this.velocityX < 0) {
        this.velocityX += this.speed / 20;
        if (this.velocityX > this.speed / 20) {
          this.velocityX = 0;
        }
      }
    }
    this.x += this.velocityX;
  }

  jump() {
    this.velocityY = -5;
  }

  isGameOver() {
    if (
      this.x > canvas.width + 30 ||
      this.x < -60 ||
      this.y > canvas.height + 20
    ) {
      screenManager.popScreen();
      screenManager.pushScreen(new GameOverScreen());
    }
  }

  update(ticks) {
    this.isGameOver();
    this.moveInX();
    let margin = 0;

    if (this.keyState[this.keyUp] && this.isOnPlatform) {
      this.jump();
    }

    if (Math.floor((this.x + 27) / 16) + 0.3 > Math.round((this.x + 27) / 16)) {
      margin = 0.3;
    } else if (
      Math.ceil((this.x + 27) / 16) - 0.35 <
      Math.round((this.x + 27) / 16)
    ) {
      margin = -0.35;
    }
    this.coordinatesOnMap =
      Math.round(margin + (this.x + 27) / 16) +
      Math.round((this.y + 60) / 16) * 80;
    if (this.isClimbing) {
      if (this.keyState[this.keyUp]) {
        this.y -= this.speed;
      } else if (this.keyState[this.keyDown] && !this.isOnPlatform) {
        this.y += this.speed;
      }
      this.velocityY = 0;
      this.velocityX = 0;
    } else if (this.isOnPlatform && this.velocityY > 0) {
      this.y = Math.floor(this.coordinatesOnMap / 80) * 16 - 64;
      this.velocityY = 0;
    } else {
      if (this.velocityY <= this.gravity * 1.5) {
        this.velocityY += this.gravity / 30;
      }
      this.y += this.velocityY;
    }
    if (this.teleportCuldown >= 0) {
      this.teleportCuldown += this.oldTicks - ticks;
      this.oldTicks = ticks;
    }
  }

  draw(ticks) {
    if (this.isOnPlatform && this.velocityX > 0) {
      this.changeCurrentTexture(ticks, this.bound, this.texturesRun);
      ctx.drawImage(
        this.texturesRun[this.currentTexture],
        0,
        0,
        71,
        67,
        this.x,
        this.y + 4,
        64,
        60
      );
    } else if (this.isOnPlatform && this.velocityX < 0) {
      ctx.save();
      ctx.setTransform(-1, 0, 0, 1, 0, 0);
      this.changeCurrentTexture(ticks, this.bound, this.texturesRun);
      ctx.drawImage(
        this.texturesRun[this.currentTexture],
        0,
        0,
        71,
        67,
        -this.x - 64,
        this.y + 4,
        64,
        60
      );
      ctx.restore();
    } else if (this.isClimbing) {
      this.changeCurrentTexture(this.y, this.bound + 1, this.texturesClimb);
      ctx.drawImage(
        this.texturesClimb[this.currentTexture],
        0,
        0,
        71,
        67,
        this.x,
        this.y + 4,
        64,
        60
      );
    } else if (this.isOnPlatform) {
      this.changeCurrentTexture(ticks, this.bound, this.texturesIdle);
      ctx.drawImage(
        this.texturesIdle[this.currentTexture],
        0,
        0,
        71,
        67,
        this.x,
        this.y + 4,
        64,
        60
      );
    } else if (this.velocityY != 0 && this.velocityX >= 0) {
      this.changeCurrentTexture(ticks, this.bound + 4, this.texturesJump);
      ctx.drawImage(
        this.texturesJump[this.currentTexture],
        0,
        0,
        71,
        67,
        this.x,
        this.y + 8,
        64,
        60
      );
    } else if (this.velocityY != 0 && this.velocityX <= 0) {
      ctx.save();
      ctx.setTransform(-1, 0, 0, 1, 0, 0);
      this.changeCurrentTexture(ticks, this.bound + 4, this.texturesJump);
      ctx.drawImage(
        this.texturesJump[this.currentTexture],
        0,
        0,
        71,
        67,
        -this.x - 64,
        this.y + 8,
        64,
        60
      );
      ctx.restore();
    } else {
      ctx.drawImage(
        this.texturesIdle[0],
        0,
        0,
        71,
        67,
        this.x,
        this.y + 4,
        64,
        60
      );
    }
  }

  getXPosition() {
    return this.x;
  }

  getCoordinatesOnMap() {
    return this.coordinatesOnMap;
  }

  onKeyDown(key) {
    this.keyState[key] = true;
  }

  onKeyUp(key) {
    this.keyState[key] = false;
  }
}
