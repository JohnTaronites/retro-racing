class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    
    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const loadingBg = this.add.image(width / 2, height / 2, 'loading-bg');
        const progressBar = this.add.image(width / 2, height / 2, 'loading-bar');
        
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);
        
        // Update progress bar
        this.load.on('progress', (value) => {
            progressBar.setCrop(0, 0, progressBar.width * value, progressBar.height);
        });
        
        // Remove progress bar when loading complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        
        // Load all game assets
        this.loadAssets();
    }
    
    loadAssets() {
        // Load images
        this.load.image('player_car', 'assets/images/player_car.png');
        this.load.image('enemy_car', 'assets/images/enemy_car.png');
        this.load.image('obstacle', 'assets/images/obstacle.png');
        this.load.image('road', 'assets/images/road.png');
        this.load.image('menu_bg', 'assets/images/menu_bg.jpeg');
        this.load.image('life_icon', 'assets/images/life_icon.png');
        
        // Load sounds
        this.load.audio('engine_loop', 'assets/sounds/engine_loop.mp3');
        this.load.audio('crash', 'assets/sounds/crash.wav');
        this.load.audio('level_up', 'assets/sounds/level_up.wav');
        this.load.audio('game_over', 'assets/sounds/game_over.wav');
        this.load.audio('menu_click', 'assets/sounds/menu_click.wav');
        this.load.audio('start_game', 'assets/sounds/start_game.wav');
    }
    
    create() {
        this.scene.start('MenuScene');
    }
}
