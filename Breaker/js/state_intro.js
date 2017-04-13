var StateIntro = {
  preload: function () {},

  create: function () {
    var w = game.world.width;
    var h = game.world.height;
    this.bkg = game.add.tileSprite(0, 0, w, h, 'imgBkg');

    var logo = game.add.image(0, 0, 'imgLogo');
    logo.anchor.x = .5;
    logo.x = game.world.centerX;
    logo.y = 30;

    var btnStart = game.add.button(0, 0, 'btnStart', this.goToStart, this, 1, 0, 2);
    btnStart.anchor.x = .5;
    btnStart.x = game.world.centerX;
    btnStart.y = game.world.centerY;
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.startGame();
    }

    this.bkg.tilePosition.y += 1;
  },

  goToStart: function () {
    game.state.start('StateMain');
  }
};
