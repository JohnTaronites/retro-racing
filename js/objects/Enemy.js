class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy_car');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.2);
        
        // Ustaw prędkość na bardzo wysoką, stałą wartość
        this.setVelocityY(300);
    }
    
    update() {
        // Siłowo ustaw prędkość ponownie przy każdej aktualizacji (obejście problemu)
        this.setVelocityY(300);
        
        // Zniszcz gdy poza ekranem
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
}
