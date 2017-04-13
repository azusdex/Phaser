var StateMain = {
  preload: function () {

  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    this.touchOldX = undefined;
    this.touchNewX = undefined;
    this.touchActive = false;
    this.touchMove = 0;

    this.paddleVelX = 500/1000;
    this.prevX = game.input.x;

    var w = game.world.width;
    var h = game.world.height;
    this.bkg = game.add.tileSprite(0, 0, w, h, 'imgBkg');

    this.paddle = game.add.sprite(0, 0, 'imgPaddle');
    game.physics.arcade.enable(this.paddle);
    this.paddle.body.enable = true;
    this.paddle.body.immovable = true;
    this.paddle.anchor.set(0.5, 1);
    this.paddleHalf = this.paddle.width / 2;

    this.ball = game.add.sprite(0, 0, 'imgBall');
    game.physics.arcade.enable(this.ball);
    this.ball.body.enable = true;
    this.ball.body.bounce.set(1);
    this.ball.body.collideWorldBounds = true;
    this.ball.isShot = false;
    this.ball.iniVelX = 200;
    this.ball.iniVelY = -300;
    this.ball.checkWorldBounds = true;
    this.ball.events.onOutOfBounds.add(this.loseLive, this);

    this.resetPaddle();

    /** sound **/
    this.sndHitBrick = game.add.audio('sndHitBrick');
    this.sndHitPaddle = game.add.audio('sndHitPaddle');
    this.bgmMusic = game.add.audio('bgmMusic');
    this.sndLoseLife = game.add.audio('sndLoseLife');

    this.bgmMusic.loop = true;
    this.bgmMusic.play();

    /** bg **/
    h = this.paddle.height;
    var blackLine = game.add.tileSprite(0, 0, w, h, 'imgBlack');
    blackLine.anchor.set(0, 1);
    blackLine.y = game.world.height;

    /** Points & Lives **/
    this.lives = 3;
    this.points = 0;

    this.txtLevels = game.add.text(0, 0, game_txtLives + this.lives, txtConfig);
    this.txtLevels.anchor.set(0, 1);
    this.txtLevels.y = game.world.height;

    this.txtPoints = game.add.text(0, 0, game_txtPoints + this.points, txtConfig);
    this.txtPoints.anchor.set(1);
    this.txtPoints.x = game.world.width;
    this.txtPoints.y = game.world.height;

    /** bricks **/
    this.numCols = 10;
    this.numRows = 4;

    this.bricks = game.add.group();
    this.bricks.enableBody = true;
    this.bricks.bodyType = Phaser.Physics.ARCADE;
    var brickImages = [
      'imgBrickGreen',
      'imgBrickPurple',
      'imgBrickRed',
      'imgBrickYellow'
    ];

    var i, j;
    for (i = 0; i < this.numRows; i++) {
      var img = brickImages[i];
      for (j = 0; j < this.numCols; j++) {
        var brick = this.bricks.create(0, 0, img);
        brick.body.immovable = true;
        brick.x = brick.width * j;
        brick.y = brick.height * i;
      }
    }

    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
  },

  update: function () {
    game.physics.arcade.collide(this.ball, this.paddle, this.hitPaddle, null, this);
    game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);

    this.bkg.tilePosition.y += 1;

    var isLeftDown = game.input.keyboard.isDown(Phaser.Keyboard.Left);
    var isRightDown = game.input.keyboard.isDown(Phaser.Keyboard.Right);

    if (this.prevX != game.input.x) {
      this.paddle.x = game.input.x;
    } else if (isRightDown && !isLeftDown) {
      this.paddle.x += this.paddleVelX * game.time.physicsElapsedMS;
    } else if (isLeftDown && !isRightDown) {
      this.paddle.x -= this.paddleVelX * game.time.physicsElapsedMS;
    }

    this.prevX = game.input.x;

    if (game.device.touch && this.touchActive) {
      this.touchOldX = this.touchNewX;
      this.touchNewX = game.input.x;
      this.touchMove = 0;
      if (this.touchOldX != undefined && this.touchNewX != undefined) {
        this.touchMove = this.touchNewX - this.touchOldX;
      }
      this.paddle.x += this.touchMove;
    }

    if (this.paddle.x - this.paddleHalf < 0) {
      this.paddle.x = 0 + this.paddleHalf;
    }

    if (this.paddle.x + this.paddleHalf > game.world.width) {
      this.paddle.x = game.world.width - this.paddleHalf;
    }

    if (this.ball.isShot == false) {
      this.ball.x = this.paddle.x - (this.ball.width / 2);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.shotBall();
    }
  },

  resetPaddle: function () {
    this.paddle.x = game.world.centerX;
    this.paddle.y = game.world.height - this.paddle.height;

    this.ball.x = this.paddle.x;
    this.ball.y = this.paddle.y - this.ball.height * 2;
    this.ball.isShot = false;
    this.ball.body.velocity.set(0);
  },

  shotBall: function () {
    if (this.ball.isShot) {
      return;
    }

    this.ball.isShot = true;

    var velArray = [1, -1];
    var rand = Math.random() * velArray.length;
    rand = Math.floor(rand);
    var vel = velArray[rand];
    var x = this.ball.iniVelX * vel;
    var y = this.ball.iniVelY;
    this.ball.body.velocity.set(x, y);
  },

  removeBrick: function (ball, brick) {
    brick.kill();
    this.sndHitBrick.play();
    this.points += 10;
    this.txtPoints.text = game_txtPoints + this.points;

    if (this.bricks.countLiving() == 0) {
      this.goToOver();
    }
  },

  hitPaddle: function (ball, paddle) {
    if (ball.isShot) {
      this.sndHitPaddle.play();
    }
  },

  loseLive: function () {
    this.resetPaddle();
    this.lives--;
    this.txtLevels.text = game_txtLives + this.lives;
    this.sndLoseLife.play();

    if (this.lives == 0){
      this.goToOver();
    }
  },

  goToOver: function () {
    this.bgmMusic.stop();
    game.lives = this.lives;
    game.points = this.points;
    game.state.start('StateOver');
  },

  onDown: function () {
    this.shotBall();
    this.touchActive = true;
  },

  onUp: function () {
    this.touchOldX = undefined;
    this.touchNewX = undefined;
    this.touchActive = false;
  },
};
