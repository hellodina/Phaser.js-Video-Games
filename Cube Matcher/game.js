const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: "000000",
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: 200,
      enableBody: true
    }
  }
};

const game = new Phaser.Game(config);
