var StateLoad =  {
  preload: function () {
    game.load.image('imgBkg', 'img/bg_blue.png');
    game.load.image('imgLogo', 'img/logo_game.png');
    game.load.spritesheet('btnStart', 'img/btn_start.png', 190, 49);

    game.load.image('imgPaddle', 'img/paddle.png');
    game.load.image('imgBrickGreen', 'img/brick_green.png');
    game.load.image('imgBrickPurple', 'img/brick_purple.png');
    game.load.image('imgBrickRed', 'img/brick_red.png');
    game.load.image('imgBrickYellow', 'img/brick_yellow.png');
    game.load.image('imgBall', 'img/ball.png');
    game.load.image('imgBkg', 'img/bg_blue.png');
    game.load.image('imgBlack', 'img/bg_black.png');
    game.load.audio('sndHitBrick', 'sound/fx_hit_brick.wav');
    game.load.audio('sndHitPaddle', 'sound/fx_hit_paddle.wav');
    game.load.audio('bgmMusic', 'sound/bgm_electric_air.ogg');
    game.load.audio('sndLoseLife', 'sound/fx_lose_life.ogg');

    game.load.image('imgBkg', 'img/bg_blue.png');
    game.load.image('imgLogo', 'img/logo_game.png');
    game.load.image('imgStar', 'img/star.png');
    game.load.spritesheet('btnBack', 'img/btn_back.png', 190, 49);
    game.load.audio('sndLose', 'sound/fx_lose.ogg');
    game.load.audio('sndWin', 'sound/fx_win.ogg');
    game.load.audio('sndFirework', 'sound/fx_firework.ogg');
  },

  create: function () {
    var progVoid = game.add.image(0, 0, 'imgProgVoid');
    progVoid.x = game.world.centerX - progVoid.width / 2;

    var progFull = game.add.image(0, 0, 'imgProgFull');
    progFull.anchor.x = progVoid.anchor.x;
    progFull.x = progVoid.x;
    progFull.y = progVoid.y;

    game.load.setPreloadSprite(progFull);

    game.state.start('StateIntro');
  },
};
