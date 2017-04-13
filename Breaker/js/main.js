var game;

window.onload = function () {
  game = new Phaser.Game(640, 400, Phaser.AUTO, 'game');
  game.state.add('StateMain', StateMain);
  game.state.add('StateIntro', StateIntro);
  game.state.add('StateOver', StateOver);
  game.state.add('StateInit', StateInit);
  game.state.add('StateLoad', StateLoad);
  game.state.start('StateInit');
};
