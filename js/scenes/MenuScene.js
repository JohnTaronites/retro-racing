class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Pobierz wymiary ekranu gry
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        // Dodaj tło menu - metoda skalowania "cover"
        const bg = this.add.image(gameWidth/2, gameHeight/2, 'menu_bg');
        
        // Oblicz skalę potrzebną do pokrycia całego ekranu
        const scaleX = gameWidth / bg.width;
        const scaleY = gameHeight / bg.height;
        const scale = Math.max(scaleX, scaleY);
        
        // Ustaw skalę obrazu
        bg.setScale(scale);
        
        // Opcjonalnie: Dodaj przyciemnienie, aby tekst był lepiej widoczny
        // const overlay = this.add.rectangle(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 0x000000, 0.2);
        
        // START GAME button - umieść na środku ekranu
        const startButton = this.add.rectangle(gameWidth/2, gameHeight/2, 300, 80, 0xff0000);
        const startText = this.add.text(gameWidth/2, gameHeight/2, 'START GAME', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Dodaj interakcję do przycisku
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
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
