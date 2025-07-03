class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'obstacle');
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.1);
        this.body.setSize(this.width * 0.8, this.height * 0.8);

        // Stała prędkość w dół (np. 220 px/s)
        this.setVelocityY(220 + Phaser.Math.Between(0, 50));
    }

    update() {
        if (this.y > this.scene.game.config.height + 100) {
            this.destroy();
        }
    }
}
