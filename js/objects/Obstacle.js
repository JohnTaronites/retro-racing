class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'obstacle');
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.4); // Przykładowe skalowanie
        this.body.setSize(this.width * 0.8, this.height * 0.8);

        const speed = gameSettings.roadSpeed * 60;
        this.setVelocityY(speed);
    }

    update() {
        if (this.y > this.scene.game.config.height + 100) {
            this.destroy();
        }
    }
}
