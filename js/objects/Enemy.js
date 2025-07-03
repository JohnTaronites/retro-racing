class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy_car');
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.1);
        this.body.setSize(this.width * 0.8, this.height * 0.8);

        // Stała prędkość w dół (np. 250 px/s, możesz zmienić)
        this.setVelocityY(250 + Phaser.Math.Between(0, 80));
    }

    update() {
        // Destroy if off screen
        if (this.y > this.scene.game.config.height + 100) {
            this.destroy();
        }
    }
}
