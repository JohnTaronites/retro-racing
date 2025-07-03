class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    
    preload() {
        // Load a minimal loading bar graphic
        this.load.image('loading-bg', 'assets/images/loading-bg.png');
        this.load.image('loading-bar', 'assets/images/loading-bar.png');
    }
    
    create() {
        // Reset game settings
        gameSettings.roadSpeed = 5;
        gameSettings.currentLevel = 1;
        gameSettings.score = 0;
        
        this.scene.start('PreloadScene');
    }
}