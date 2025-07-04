class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    
    create() {
        // Background
        const bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'menu_bg');
        bg.setOrigin(0, 0);
        
        /* Title
        const title = this.add.text(this.game.config.width / 2, 150, 'RETRO RACING', {
            fontFamily: 'Arial',
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        });
        title.setOrigin(0.5);
        */
        // Start button
        const startBtn = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'START GAME', {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: '#ff0000',
            padding: {
                x: 20,
                y: 10
            }
        });
        startBtn.setOrigin(0.5);
        startBtn.setInteractive({ useHandCursor: true });
        
        // Button animation
        this.tweens.add({
            targets: startBtn,
            scale: 1.1,
            duration: 700,
            yoyo: true,
            repeat: -1
        });
        
        // Instructions
        const instructions = this.add.text(this.game.config.width / 2, this.game.config.height - 150, 
            'Use LEFT/RIGHT arrows or touch\nthe screen to move your car.\n\nAvoid obstacles and enemy cars!', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        });
        instructions.setOrigin(0.5);
        
        // Start game on button click
        startBtn.on('pointerdown', () => {
            this.sound.play('menu_click');
            this.sound.play('start_game');
            this.scene.start('GameScene');
        });
    }
}
