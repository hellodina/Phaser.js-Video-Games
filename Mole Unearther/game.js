const config = {
	type: Phaser.AUTO,
	width: 480,
	height: 640,
	physics: {
		default: 'arcade',
	},
	backgroundColor: 'F8B392',
	scene: [StartScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
