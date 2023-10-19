/*displays the game as well as contains the logic for controlling Bob’s movement, scoring points and ending the game.*/

const gameState = {
  numCoordinates: {},
};

// Add a variable to keep count of Bob's earnings
// Add a variable to control speed of Bob sprite
// Add a variable to multiply money

let score=0;
const moneyMultiplier = 100;
const speed=1;



let randomCoord;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('bob-front', 'https://content.codecademy.com/courses/learn-phaser/BOB/Bob%20front.png');
    this.load.image('bob-back', 'https://content.codecademy.com/courses/learn-phaser/BOB/Bob%20back.png');
    this.load.image('bob-side', 'https://content.codecademy.com/courses/learn-phaser/BOB/Bob%20side.png');
    this.load.image('money', 'https://content.codecademy.com/courses/learn-phaser/BOB/Money.png');
    this.load.image('paper', 'https://content.codecademy.com/courses/learn-phaser/BOB/Paperwork.png');
  }

  create() {
    // Display text showing how much cash Bob earned
    let scoreText = this.add.text(140, 610, `Earnings: $${score}`, { fontSize: '25px', fill: '#fff' });

    // Create the Bob sprite and set boundaries for it
    gameState.player = this.physics.add.sprite(240, 500, 'bob-front').setScale(.8);
    this.physics.world.setBounds(0, 0, 480, 600);  // Slightly above score
    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;

    // Create money sprite in random spots on canvas
    randomCoord = assignCoords();
    gameState.money = this.physics.add.sprite(randomCoord.x, randomCoord.y, 'money').setScale(.5);

    // Create paper sprite group
    gameState.enemies = this.physics.add.group();

    // Collision detection between Bob and money sprite
    this.physics.add.overlap(gameState.player, gameState.money, () => {
      // Hide and deactivate the money sprite after Bob collides with it
      gameState.money.disableBody();
      // Move money somewhere else on the canvas
      delete gameState.numCoordinates[`x${gameState.money.x}y${gameState.money.y}`];
      randomCoord = assignCoords();
      // Place the money sprite somewhere new, then show and activate it
      gameState.money.enableBody(true, randomCoord.x, randomCoord.y);
      // Increase the score randomly between 100 and 1000
      score += (Math.round(Math.random() * 10) * moneyMultiplier);
      // Update cash total text
      scoreText.setText(`Earnings: \$${score}`);
      // Place paper sprite on canvas randomly
      randomCoord = assignCoords();
      gameState.enemies.create(randomCoord.x, randomCoord.y, 'paper').setScale(.6);
    });

    // Collision detection between Bob and paper sprites
    this.physics.add.collider(gameState.player, gameState.enemies, () => this.endGame());

    // Helper function to return an object containing evenly spaced x and y coordinates:
    function generateRandomCoords() {
      const randomX = Math.floor(Math.random() * 5) * 75 + 25
      const randomY = Math.floor(Math.random() * 5) * 75 + 25
      return { x: randomX, y: randomY }
    }

    // Helper function that returns one set of coordinates not in gameState.numCoordinates
    function assignCoords() {
      let assignedCoord = generateRandomCoords();

      // If the coordinates are already in gameState.numCoordinates, then other set of coordinates are generated until there is one not in use
      while (gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`]) {
        assignedCoord = generateRandomCoords()
      }

      gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`] = true

      return assignedCoord;
    }
  }

  update() {
    // Arrow keys that will move Bob in 4 directions
    const cursors = this.input.keyboard.createCursorKeys();

    // Add variables that store if a specific arrow key is being pressed

    const rightArrow = cursors.right.isDown;
    const leftArrow = cursors.left.isDown;
    const upArrow = cursors.up.isDown;
    const downArrow = cursors.down.isDown;

    // Add code to check whether any of the arrow keys were pressed, move Bob
    if (rightArrow) {
      moveBobRight();
    } else if (leftArrow) {
      moveBobLeft();
    } else if (upArrow) {
      moveBobUp();
    } else if (downArrow) {
      moveBobDown();
    }

    // Add variables that store the x and y coordinates of the Bob sprite
    const bobXCoord = gameState.player.x;
    const bobYCoord = gameState.player.y;

    // Add code to check collision between Bob and edges of the canvas of the game
    if (bobXCoord <= 32 || bobXCoord >= 448) {
      this.endGame();
    }
    if (bobYCoord <= 32 || bobYCoord >= 568) {
      this.endGame();
    }








    // Helper functions to move Bob in 4 directions
    function moveBobRight() {
      gameState.player.flipX = false;
      gameState.player.setTexture('bob-side');
      gameState.player.setVelocityX(150) * speed;
      gameState.player.setVelocityY(0) * speed;
    }

    function moveBobLeft() {
      // NOTE: By default Bob looks to the right so we flip the image if moving left
      gameState.player.flipX = true;
      gameState.player.setTexture('bob-side');
      gameState.player.setVelocityX(-150) * speed;
      gameState.player.setVelocityY(0) * speed;
    }

    function moveBobUp() {
      gameState.player.flipX = false;
      gameState.player.setTexture('bob-back');
      gameState.player.setVelocityX(0) * speed;
      gameState.player.setVelocityY(-150) * speed;
    }

    function moveBobDown() {
      gameState.player.flipX = false;
      gameState.player.setTexture('bob-front');
      gameState.player.setVelocityX(0) * speed;
      gameState.player.setVelocityY(150) * speed;
    }
  }

  // Class function that ends current Game and transitions to End Scene
  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene w/fade
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
      if (progress > .5) {
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
      }
    });
  }
}
