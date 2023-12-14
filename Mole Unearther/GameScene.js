//Set up the initial game variables
let timeLeft = 30;
let score = 0;
let isPaused = false;

// Stores the current "key" location of the mole
let currentBurrowKey;

const gameState = {};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    // list of all burrow locations
    // each location contains a corresponding key on the keyboard,
    // and the x and y pixel coordinates on the screen
    this.burrowLocations = [
      {
        key: "j",
        x: 100,
        y: 310,
      },
      {
        key: "k",
        x: 240,
        y: 390,
      },
      {
        key: "l",
        x: 380,
        y: 310,
      },
    ];
  }

  // import all of the visual assets we will use throughout the game
  preload() {
    // calls the image function to load in the background, and assigns the image to the field key
    // the background is loaded from the given url
    this.load.image(
      "background",
      "https://content.codecademy.com/courses/learn-phaser/mole-unearther/background.png"
    );
    // calls the spritesheet function to load in the mole as a spritesheet to make animations, and assigns it to the mole key
    // the mole is loaded from the given url with the given width and height
    this.load.spritesheet(
      "mole",
      "https://content.codecademy.com/courses/learn-phaser/mole-unearther/mole-sprite.png",
      { frameWidth: 198, frameHeight: 250 }
    );
  }

  // set up scene visuals, animations, and game logic when events occur
  create() {
    function updateTimer() {
      timeLeft -= 1;
    }
    // executed after every second passes
    const onSecondElapsed = () => {
      if (isPaused === false) {
        updateTimer();
        // display the new time to the user
        this.updateTimerText();
      }
    };

    // display background
    this.initializeBackground();

    // set up score text
    this.initializeScoreText();

    // go through each burrow and set up key listeners on the corresponding key
    this.initializeBurrowKeys();

    // set up animation callbacks
    this.initializeAnimations();

    // set up mole and place in first location
    this.initializeMole();

    // set up text for timer and callback for countdown
    this.initializeTimer(onSecondElapsed);
  }

  // periodically checks and handles user input by updating game logic
  update() {
    if (timeLeft <= 0) {
      // Provided for user
      this.scene.stop("GameScene");
      this.scene.start("EndScene");
    }
    function updateScore(points){
        score += points;
    }
    // user successfully hit the mole, so reward the user with 5pts
    const applyHitReward = () => {
      // display how many points the user will gain
      this.displayRewardText();
      
      updateScore(5);
      // display the new score to the user
      this.updateScoreText();
    };

    // user missed the mole, so penalize the user by taking away 5pts
    const applyMissPenalty = () => {
      // display how many points the user will lose
      this.displayPenaltyText();
      updateScore(-5);
      // display the new score to the user
      this.updateScoreText();
    };

    const onBurrowHit = (key) => {
      if (currentBurrowKey === key) {
        applyHitReward();
        this.relocateMole();
      } else {
        applyMissPenalty();
      }
    };

    const togglePause = () =>{
        if (isPaused === false){
          let isPaused = true;
          this.displayPauseScreen();
        }
        else {
          this.removePauseScreen();
        }
    };
    if (isPaused === false) {
      // check each burrow's location if the user is hitting the corresponding key
      // and run the handler to determine if user should get a reward or penalty
      if (Phaser.Input.Keyboard.JustDown(gameState.jKey)) {
        onBurrowHit("j");
      } else if (Phaser.Input.Keyboard.JustDown(gameState.kKey)) {
        onBurrowHit("k");
      } else if (Phaser.Input.Keyboard.JustDown(gameState.lKey)) {
        onBurrowHit("l");
      }
    }

    if (Phaser.Input.Keyboard.JustDown(gameState.spaceKey)) {
      togglePause();
    }
  }

  // adds the background image to the scene starting at the coordinates (0, 0)
  initializeBackground() {
    const background = this.add.image(0, 0, "background");
    background.setScale(0.5);
    background.setOrigin(0, 0);

    // create box for the score and timer
    const scoreBox = this.add.rectangle(90, 70, 140, 90, 0xffffff);
    scoreBox.alpha = 0.5;
  }

  // display user's score on screen
  initializeScoreText() {
    gameState.scoreText = this.add
      .text(50, 50, `Score: ${score}`)
      .setColor("#000000");
  }

  // go through each burrow and set up listeners on the corresponding key
  initializeBurrowKeys() {
    // set up listeners at the burrow's assigned key that will tell us when user input at that key occurs
    gameState.jKey = this.input.keyboard.addKey("j");
    gameState.kKey = this.input.keyboard.addKey("k");
    gameState.lKey = this.input.keyboard.addKey("l");
    gameState.spaceKey = this.input.keyboard.addKey("space");

    // set up text to identify which key belongs to which burrow
    this.burrowLocations.forEach((burrow) => {
      this.add.text(burrow.x - 10, burrow.y + 70, burrow.key.toUpperCase(), {
        fontSize: 32,
        color: "#553a1f",
      });
    });
  }

  // create mole character from the spritesheet that was loaded
  initializeMole() {
    // add mole sprite to scene
    gameState.mole = this.physics.add.sprite(0, 0, "mole");
    gameState.mole.setScale(0.5, 0.5);

    // set mole's location
    this.updateBurrow();

    // after mole appears, run idle animation
    gameState.mole.on("animationcomplete-appear", () => {
      gameState.mole.anims.play("idle");
    });

    // after mole is hidden, immediately relocate to another burrow
    gameState.mole.on("animationcomplete-disappear", () => {
      this.updateBurrow();
    });
  }

  // creates all the animations that will run after an action is performed
  initializeAnimations() {
    // create the appear animation from mole spritesheet
    this.anims.create({
      key: "appear",
      frames: this.anims.generateFrameNumbers("mole", { start: 0, end: 2 }),
      frameRate: 10,
    });

    // create the idle animation from mole spritesheet that will repeat indefinitely
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("mole", {
        frames: [1, 3, 1, 1, 4],
      }),
      frameRate: 3,
      repeat: -1,
    });

    // create the disappear animation from mole spritesheet
    this.anims.create({
      key: "disappear",
      frames: this.anims.generateFrameNumbers("mole", {
        frames: [5, 6, 6, 5, 2, 1, 0],
      }),
      frameRate: 15,
    });
  }

  // display remaining time left on screen and run update after every second
  initializeTimer(timerCallback) {
    gameState.timerText = this.add
      .text(50, 75, `Time: ${timeLeft}`)
      .setColor("#000000");

    this.time.addEvent({
      delay: 1000, // call after every 1000ms (1sec)
      callback: timerCallback, // run function after 1sec elapsed
      args: [1], // amount of time that elapsed
      callbackScope: this, // scope to this class
      loop: true, // repeat forever
    });
  }

  // fetches a random burrow from our list of burrows
  getRandomBurrow() {
    return Phaser.Utils.Array.GetRandom(this.burrowLocations);
  }

  // select new burrow and move mole to it
  updateBurrow() {
    // select a random burrow from our list of burrows
    const burrowLocation = this.getRandomBurrow();

    // update the current burrow key to the new burrow's key
    currentBurrowKey = burrowLocation.key;

    // set the mole's position to the new burrow's (x, y) coordinates
    gameState.mole.setPosition(burrowLocation.x, burrowLocation.y);

    // play animation to make mole appear
    gameState.mole.anims.play("appear");
  }

  // play the mole's disappear animation to indicate it was hit
  // and after animation is complete, mole will move to a new burrow
  relocateMole() {
    gameState.mole.anims.play("disappear");
  }

  // update the clock text on the screen to reflect the changed amount
  updateTimerText() {
    gameState.timerText.setText(`Time: ${timeLeft}`);
  }

  // update the score text on the screen to reflect the changed amount
  updateScoreText() {
    gameState.scoreText.setText(`Score: ${score}`);
  }

  // display the number of points the user gained
  displayRewardText() {
    // add text to display score reward
    const rewardText = this.add.text(160, 50, "+5").setColor("#228B22");
    this.time.addEvent({
      delay: 500, // call after 200ms
      callback: () => {
        rewardText.destroy();
      }, // remove text after 200ms
      args: [rewardText], // text to remove
      repeat: -1,
    });
  }

  // display the number of points the user lost
  displayPenaltyText() {
    // add text to display score penalty
    const penaltyText = this.add.text(160, 50, "-5").setColor("#991A00");
    this.time.addEvent({
      delay: 300, // call after 200ms
      callback: () => {
        penaltyText.destroy();
      }, // remove text after 200ms
      args: [penaltyText], // text to remove
      repeat: -1,
    });
  }

  // display background overlay with pause messages to indicate game is paused
  displayPauseScreen() {
    gameState.pauseOverlay = this.add.rectangle(0, 0, 480, 640, 0xffffff);
    gameState.pauseOverlay.alpha = 0.75;
    gameState.pauseOverlay.setOrigin(0, 0);

    gameState.pauseText = this.add.text(225, 325, "PAUSED").setColor("#000000");
    gameState.resumeText = this.add
      .text(125, 375, "Press space to resume game")
      .setColor("#000000");
  }

  // remove overlay and pause messages when game is unpaused
  removePauseScreen() {
    gameState.pauseOverlay.destroy();
    gameState.pauseText.destroy();
    gameState.resumeText.destroy();
  }
}
