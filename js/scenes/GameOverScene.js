class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    create() {
        // Background
        const bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'menu_bg');
        bg.setOrigin(0, 0);
        bg.tint = 0x555555; // Darker background
        
        // Game Over text
        const gameOverText = this.add.text(this.game.config.width / 2, 150, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        });
        gameOverText.setOrigin(0.5);
        
        // Final score
        const scoreText = this.add.text(this.game.config.width / 2, 250, `FINAL SCORE: ${gameSettings.score}`, {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        });
        scoreText.setOrigin(0.5);
        
        // Level reached
        const levelText = this.add.text(this.game.config.width / 2, 320, `YOU REACHED LEVEL: ${gameSettings.currentLevel}`, {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        levelText.setOrigin(0.5);
        
        // Play Again button
        const playAgainBtn = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, 'PLAY AGAIN', {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: '#008800',
            padding: {
                x: 20,
                y: 10
            }
        });
        playAgainBtn.setOrigin(0.5);
        playAgainBtn.setInteractive({ useHandCursor: true });
        
        // Main Menu button
        const mainMenuBtn = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 200, 'MAIN MENU', {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: '#0000aa',
            padding: {
                x: 20,
                y: 10
            }
        });
        mainMenuBtn.setOrigin(0.5);
        mainMenuBtn.setInteractive({ useHandCursor: true });
        
        // Button hover effects
        [playAgainBtn, mainMenuBtn].forEach(btn => {
            btn.on('pointerover', () => {
                btn.setScale(1.1);
            });
            
            btn.on('pointerout', () => {
                btn.setScale(1);
            });
        });
        
        // Button click events
        playAgainBtn.on('pointerdown', () => {
            this.sound.play('menu_click');
            this.sound.play('start_game');
            this.scene.start('GameScene');
        });
        
        mainMenuBtn.on('pointerdown', () => {
            this.sound.play('menu_click');
            this.scene.start('MenuScene');
        });
    }
}