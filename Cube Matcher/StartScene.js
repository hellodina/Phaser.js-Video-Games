class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('startScreen', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/cube-matcher/start.png');
  }

  create() {
    screen = this.add.image(0, 0, 'startScreen').setOrigin(0);
    this.input.on('pointerup', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}
