var StateOver = {
  preload: function () {},

  create: function () {
    var lives = game.lives;
    var points = game.points;

    var w = game.world.width;
    var h = game.world.height;
    var margin = 30;

    this.bkg = game.add.tileSprite(0, 0, w, h, 'imgBkg');

    var btnBack = game.add.button(0, 0, 'btnBack', this.goToIntro, this, 1, 0, 2);
    btnBack.anchor.set(.5, 1);
    btnBack.x = game.world.centerX;
    btnBack.y = game.world.height - margin;

    var txtOver = game.add.text(0, 0, game_txtGameOver, txtOverConfig);
    txtOver.anchor.x = .5;
    txtOver.x = game.world.centerX;
    txtOver.y = margin * 2;

    var txtPoints = game.add.text(0, 0, game_txtPoints + points, txtPointConfig);
    txtPoints.anchor.x = .5;
    txtPoints.x = game.world.centerX;
    txtPoints.y = game.world.centerY - margin;

    var sndWinLose;
    if (lives > 0) {
      txtOver.fill = "#e0d700";
      txtOver.text = game_txtCongrats;
      sndWinLose = game.add.audio('sndWin');
    } else {
      sndWinLose = game.add.audio('sndLose');
    }
    sndWinLose.play();

    this.sndFirework = game.add.audio('sndFirework');
    var maxParticles = 100;
    this.firework = game.add.emitter(0, 0, maxParticles);
    this.firework.makeParticles('imgStar');
    this.firework.gravity.y = 500;

    this.topTime = 1;
    this.timer = this.topTime;
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.goToIntro();
    }

    if (game.lives == 0) {
      return;
    }

    this.timer -= game.time.physicsElapsed;
    if (this.timer < 0) {
      this.timer = this.topTime;
      var randX = Math.random() * game.world.width;
      var randY = Math.random() * game.world.height;
      this.firework.x = randX;
      this.firework.y = randY;
      var duration = 800;
      var numStars = 10;
      this.firework.start(true, duration, null, numStars);
      this.sndFirework.play();
    }
  },

  goToIntro: function () {
    game.state.start('StateIntro');
  }
};
