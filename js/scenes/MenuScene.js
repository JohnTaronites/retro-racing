class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Pobierz wymiary ekranu gry
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        // Dodaj tło menu - metoda skalowania "cover" z dodatkowym powiększeniem o 5%
        const bg = this.add.image(gameWidth/2, gameHeight/2, 'menu_bg');
        
        // Oblicz skalę potrzebną do pokrycia całego ekranu + dodatkowe 5%
        const scaleX = (gameWidth / bg.width) * 1.05;
        const scaleY = (gameHeight / bg.height) * 1.05;
        const scale = Math.max(scaleX, scaleY);
        
        // Ustaw skalę obrazu
        bg.setScale(scale);
        
        // Dodaj delikatne przyciemnienie tła pod przyciskiem
        const buttonY = gameHeight/2 + (gameHeight * 0.15); // Przycisk obniżony o 15%
        const buttonShadow = this.add.graphics();
        buttonShadow.fillStyle(0x000000, 0.3);
        buttonShadow.fillRoundedRect(gameWidth/2 - 160, buttonY - 50, 320, 100, 20);
        buttonShadow.fillStyle(0x000000, 0.1);
        buttonShadow.fillRoundedRect(gameWidth/2 - 170, buttonY - 60, 340, 120, 30);
        
        // START GAME button - obniżony o 15% i z zaokrąglonymi rogami
        const startButton = this.add.graphics();
        startButton.fillStyle(0xFFFFFF, 1);
        startButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
        
        const startText = this.add.text(gameWidth/2, buttonY, 'START GAME', {
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
                this.scene.start('GameScene');
            }
        });
        
        // Dodaj efekt najechania na przycisk
        this.input.on('pointermove', (pointer) => {
            if (hitAreaCallback(hitArea, pointer.x, pointer.y)) {
                startButton.clear();
                startButton.fillStyle(0xEEEEEE, 1);
                startButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
                document.body.style.cursor = 'pointer';
            } else {
                startButton.clear();
                startButton.fillStyle(0xFFFFFF, 1);
                startButton.fillRoundedRect(gameWidth/2 - 150, buttonY - 40, 300, 80, 15);
                document.body.style.cursor = 'default';
            }
        });
        
        // Instrukcje gry - na dole ekranu
        this.add.text(gameWidth/2, gameHeight - 100, 'Use LEFT/RIGHT arrows or touch\nthe screen to move your car.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(gameWidth/2, gameHeight - 50, 'Avoid obstacles and enemy cars!', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
    }
}
