class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'obstacle');
        this.scene = scene;
        
        // Add obstacle to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Ustaw skalę
        this.setScale(0.2);
        
        // Mniejszy hitbox - 60% oryginalnego rozmiaru
        this.body.setSize(this.width * 0.6, this.height * 0.6);
        // Wycentrowanie hitboxa
        this.body.setOffset(this.width * 0.2, this.height * 0.2);
        
        // Ustaw stałą prędkość pionową - wysoka wartość dla pewności
        this.setVelocityY(280);
    }
    
    update() {
        // Ponownie ustaw prędkość przy każdej aktualizacji (obejście problemu)
        this.setVelocityY(280);
        
        // Zniszcz obiekt gdy znajdzie się poza ekranem
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
}
