class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    create() {
        // Pobierz wymiary ekranu gry
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        // Dodaj tło menu - metoda skalowania "cover" z dodatkowym powiększeniem o 5%
        const bg = this.add.image(gameWidth/2, gameHeight/2, 'menu_bg');
        
        // Oblicz skalę potrzebną do pokrycia całego ekranu + dodatkowe 5%
        const scaleX = (gameWidth / bg.width) * 0.90;
        const scaleY = (gameHeight / bg.height) * 0.90;
        const scale = Math.max(scaleX, scaleY);
        
        // Ustaw skalę obrazu
        bg.setScale(scale);
        
        // Dodaj przyciemnienie na całe tło
        const overlay = this.add.rectangle(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 0x000000, 0.5);
        
        // GAME OVER text
        this.add.text(gameWidth/2, gameHeight * 0.3, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);
        
        // Final score
        this.add.text(gameWidth/2, gameHeight * 0.4, `SCORE: ${gameSettings.score}`, {
            fontFamily: 'Arial',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // PLAY AGAIN button - z zaokrąglonymi rogami i cieniem
        const buttonY = gameHeight * 0.6;
        
        // Dodaj cień pod przyciskiem
        const buttonShadow = this.add.graphics();
        buttonShadow.fillStyle(0x000000, 0.3);
        buttonShadow.fillRoundedRect(gameWidth/2 - 160, buttonY - 50, 320, 100, 20);
        buttonShadow.fillStyle(0x000000, 0.1);
        buttonShadow.fillRoundedRect(gameWidth/2 - 170, buttonY - 60, 340, 120, 30);
        
        // Przycisk z zaokrąglonymi rogami
        const restartButton = this.add.graphics();
        restartButton.fillStyle(0xFFFFFF, 1);
        restartButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
        
        const restartText = this.add.text(gameWidth/2, buttonY, 'PLAY AGAIN', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#000000'
        }).setOrigin(0.5);
        
        // Obszar interaktywny dla przycisku
        const hitArea = new Phaser.Geom.Rectangle(gameWidth/2 - 150, buttonY - 40, 300, 80);
        const hitAreaCallback = Phaser.Geom.Rectangle.Contains;
        
        // Dodaj interakcję do przycisku
        this.input.on('pointerdown', (pointer) => {
            if (hitAreaCallback(hitArea, pointer.x, pointer.y)) {
                // Reset game settings
                gameSettings.currentLevel = 1;
                gameSettings.roadSpeed = gameSettings.initialRoadSpeed;
                
                this.scene.start('GameScene');
            }
        });
        
        // Dodaj efekt najechania na przycisk
        this.input.on('pointermove', (pointer) => {
            if (hitAreaCallback(hitArea, pointer.x, pointer.y)) {
                restartButton.clear();
                restartButton.fillStyle(0xEEEEEE, 1);
                restartButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
                document.body.style.cursor = 'pointer';
            } else {
                restartButton.clear();
                restartButton.fillStyle(0xFFFFFF, 1);
                restartButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
                document.body.style.cursor = 'default';
            }
        });
    }
}
