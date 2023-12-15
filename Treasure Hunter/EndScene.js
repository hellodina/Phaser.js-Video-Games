lass EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    })
  }

  preload() {
    this.load.spritesheet('playerWins', 'https://content.codecademy.com/courses/learn-phaser/Treasure%20Hunter/You%20Won.png', {
      frameWidth: 480,
      frameHeight: 640
    });
    this.load.spritesheet('playerLose', 'https://content.codecademy.com/courses/learn-phaser/Treasure%20Hunter/You%20Lost.png', {
      frameWidth: 480,
      frameHeight: 640
    });
  }

  create() {
    if (playerCoins === 3) {
      // Add the playerWins sprite and animation below:
      let win = this.add.sprite(240, 320, 'playerWins');
      this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNames('playerWins', {
          start: 0,
          end: 1
        }),
        delay: 0,
        frameRate: 2,
        repeat: -1
      });

      win.anims.play('win');
    } else {
      // Add the playerLose sprite and animation below:
      let lose = this.add.sprite(240, 320, 'playerLose');
      this.anims.create({
        key: 'lose',
        frames: this.anims.generateFrameNames('playerLose', {
          start: 0,
          end: 1
        }),
        delay: 0,
        frameRate: 2,
        repeat: -1
      });
      lose.anims.play('lose');
    }

    this.input.on('pointerdown', () => {
      // Add logic to transition from EndScene to GameScene
      plot = undefined;
      grid = [];
      coinCollection = [];
      playerCoins = 0;
      compCoins = 0;
      this.scene.stop('EndScene');
      this.scene.start('GameScene');
    })
  }
}
