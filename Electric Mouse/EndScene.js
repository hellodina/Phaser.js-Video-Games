class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    })
  }

  preload() {
    this.load.image('playerWins', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/electric-mouse/won.png');
    this.load.image('playerLose', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/electric-mouse/lost.png');
  }

  create() {
    if (gameState.player.health <= 0) {
      // A lose screen appears if Electric Mouse has 0 (or less) HP:
      let lose = this.add.sprite(240, 320, 'playerLose');  
    } else {
      // A win screen appears:
      let win = this.add.sprite(240, 320, 'playerWins');  
    }

    this.input.on('pointerdown', () => {
      // Reset gameState and transition from EndScene to GameScene
      gameState = {
        player: {},
        computer: {},
        computerSprite: {},
        playerHealthBar: {},
        computerHealthBar: {},
        attackButton: {},
        defendButton: {},
        specialButton: {},
        information: {},
        playerMove: {},
        computerMove: {},
        waveCount: 0,
        opponents: []
      };
      this.scene.stop('EndScene');
      this.scene.start('GameScene');
    });
  }
}