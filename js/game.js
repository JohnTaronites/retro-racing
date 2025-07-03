const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 854,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        GameScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        activePointers: 3
    }
};

const game = new Phaser.Game(config);

// Global game variables
let gameSettings = {
    roadSpeed: 5,
    playerSpeed: 300,
    enemySpawnTime: 2000,
    obstacleSpawnTime: 4000,
    maxLives: 5,
    currentLevel: 1,
    score: 0,
    speedIncreasePerLevel: 1.2
};