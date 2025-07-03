class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy_car');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.body.setSize(this.width * 0.8, this.height * 0.8);

        // ZAWSZE na końcu konstruktora!
        this.setVelocityY(250 + Phaser.Math.Between(0, 80));
    }

    update() {
        if (this.y > this.scene.game.config.height + 100) {
            this.destroy();
        }
    }
}
