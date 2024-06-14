class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'StartScene'
    });
  }

  preload() {
    this.load.spritesheet('startScreen', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/electric-mouse/start.png', {
      frameWidth: 480,
      frameHeight: 640
    });
  }

  create() {
    // Adds in the background image
    this.add.sprite(240, 320, 'startScreen');

    // Transition from StartScene to GameScene on a click
    this.input.on('pointerup', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}