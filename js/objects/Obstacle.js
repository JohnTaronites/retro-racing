class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'obstacle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.2);
        
        // Ustaw prędkość na bardzo wysoką, stałą wartość
        this.setVelocityY(280);
    }
    
    update() {
        // Siłowo ustaw prędkość ponownie przy każdej aktualizacji (obejście problemu)
        this.setVelocityY(280);
        
        // Zniszcz gdy poza ekranem
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
}
