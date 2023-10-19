const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: '#808080',
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      enableBody: true,
    }
  },
};

const game = new Phaser.Game(config);
