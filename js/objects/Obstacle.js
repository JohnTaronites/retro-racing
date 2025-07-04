class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'obstacle');
        this.scene = scene;
        
        // Add obstacle to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Ustaw skalę
        this.setScale(0.2);
        
        // WAŻNE: Zastosuj skalę przed ustawieniem hitboxa
        // Najpierw zastosuj skalę do obrazu
        const scaledWidth = this.width;
        const scaledHeight = this.height;
        
        // Pełny hitbox pokrywający całe koło (100%)
        this.body.setSize(scaledWidth, scaledHeight);
        
        // Wycentruj hitbox idealnie
        this.body.setOffset(0, 0);
        
        // Ustaw stałą prędkość pionową
        this.setVelocityY(280);
    }
    
    update() {
        // Ponownie ustaw prędkość przy każdej aktualizacji
        this.setVelocityY(280);
        
        // Zniszcz obiekt gdy znajdzie się poza ekranem
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
}
