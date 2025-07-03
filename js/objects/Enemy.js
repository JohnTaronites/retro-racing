class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy_car');
        this.scene = scene;
        
        // Add enemy to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.1);
        // Set physics properties
        this.body.setSize(this.width * 0.8, this.height * 0.8);
        
        // Set enemy speed
        const speed = gameSettings.roadSpeed * 60 * (1 + Math.random() * 0.5);
        this.setVelocityY(speed);
    }
    
    update() {
        // Destroy if off screen
        if (this.y > this.scene.game.config.height + 100) {
            this.destroy();
        }
    }
}
