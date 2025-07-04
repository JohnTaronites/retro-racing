class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy_car');
        this.scene = scene;
        
        // Add enemy to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Ustaw skalę
        this.setScale(0.2);
        
        // Mniejszy hitbox - 60% oryginalnego rozmiaru
        this.body.setSize(this.width * 0.6, this.height * 0.6);
        // Wycentrowanie hitboxa
        this.body.setOffset(this.width * 0.2, this.height * 0.2);
        
        // Ustaw stałą prędkość pionową - wysoka wartość dla pewności
        this.setVelocityY(300);
    }
    
    update() {
        // Ponownie ustaw prędkość przy każdej aktualizacji (obejście problemu)
        this.setVelocityY(300);
        
        // Zniszcz obiekt gdy znajdzie się poza ekranem
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
}
