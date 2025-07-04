class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_car');
        this.scene = scene;
        
        // Add player to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set scale and physics properties
        this.setScale(0.2);
        // Mniejszy hitbox - 60% oryginalnego rozmiaru
        this.body.setSize(this.width * 0.6, this.height * 0.6);
        // Wycentrowanie hitboxa
        this.body.setOffset(this.width * 0.2, this.height * 0.2);
        
        this.setCollideWorldBounds(true);
        
        // Player is invulnerable after being hit
        this.invulnerable = false;
        this.invulnerableTime = 1500;
        
        // Controls
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        // Setup touch controls
        this.setupTouchControls();
    }
    
    setupTouchControls() {
        // Left half of screen moves left, right half moves right
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.x < this.scene.game.config.width / 2) {
                this.movingLeft = true;
                this.movingRight = false;
            } else {
                this.movingRight = true;
                this.movingLeft = false;
            }
        });
        
        this.scene.input.on('pointerup', () => {
            this.movingLeft = false;
            this.movingRight = false;
        });
        
        this.movingLeft = false;
        this.movingRight = false;
    }
    
    update() {
        // Handle keyboard input
        if (this.cursors.left.isDown || this.movingLeft) {
            this.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursors.right.isDown || this.movingRight) {
            this.setVelocityX(gameSettings.playerSpeed);
        } else {
            this.setVelocityX(0);
        }
        
        // Flash when invulnerable
        if (this.invulnerable) {
            this.alpha = Math.abs(Math.sin(this.scene.time.now / 100));
        } else {
            this.alpha = 1;
        }
    }
    
    hit() {
        if (!this.isInvulnerable) {
        // Odtwórz dźwięk zderzenia z większą głośnością
        this.scene.sound.play('crash', { volume: 1.5 }); // Zwiększono głośność o połowę;
            this.invulnerable = true;
            
            // Make player invulnerable for a short time
            this.scene.time.delayedCall(this.invulnerableTime, () => {
                this.invulnerable = false;
            });
            
            return true; // Hit successful
        }
        return false; // Player was invulnerable
    }
}
