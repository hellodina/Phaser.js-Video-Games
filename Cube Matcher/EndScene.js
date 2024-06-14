class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  preload() {
    this.load.image('endScreen', 'https://codecademy-content.s3.amazonaws.com/courses/learn-phaser/cube-matcher/end.png');
  }

  create() {
    // Reset the board
    board = Array(12).fill(Array(12).fill('x'));
    // Set end screen image
    this.add.image(0, 0, 'endScreen').setOrigin(0);
    // Display score of completed game
    const scoreText = this.add.text(150, 520, `Score: ${score}`, {
      fontSize: '25px',
      fill: '#ff0000'
    });
    // Sets the z-index: Put the text on top of the background and any other images
    scoreText.setDepth(1);
    // Transition to new game if player clicks
    this.input.on('pointerup', () => {
      this.scene.stop('EndScene');
      this.scene.start('GameScene');
    });
  }
}
