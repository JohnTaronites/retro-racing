class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    create() {
        // Reset game state
        this.lives = gameSettings.maxLives;
        this.score = 0;
        this.level = gameSettings.currentLevel;
        this.gameOver = false;
        
        // Create scrolling road background
        this.road = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'road');
        this.road.setOrigin(0, 0);
        
        // Create player
        this.player = new Player(
            this, 
            this.game.config.width / 2, 
            this.game.config.height - 100
        );
        
        // Create groups for enemies and obstacles
        this.enemies = this.physics.add.group();
        this.obstacles = this.physics.add.group();
        
        // Set up collisions
        this.physics.add.overlap(this.player, this.enemies, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.handleCollision, null, this);
        
        // Set up timers for spawning enemies and obstacles
        this.enemyTimer = this.time.addEvent({
            delay: gameSettings.enemySpawnTime,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
        this.obstacleTimer = this.time.addEvent({
            delay: gameSettings.obstacleSpawnTime,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });
        
        // Score timer (score increases over time)
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateScore,
            callbackScope: this,
            loop: true
        });
        
        // Level timer (level increases every minute)
        this.levelTimer = this.time.addEvent({
            delay: 60000,
            callback: this.levelUp,
            callbackScope: this,
            loop: true
        });
        
        // Create UI
        this.createUI();
        
        // Start background engine sound
        this.engineSound = this.sound.add('engine_loop', { loop: true, volume: 0.5 });
        this.engineSound.play();
    }
    
    createUI() {
        // UI Container
        this.uiContainer = this.add.container(0, 0);
        
        // Score text
        this.scoreText = this.add.text(20, 20, 'SCORE: 0', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.uiContainer.add(this.scoreText);
        
        // Level text
        this.levelText = this.add.text(this.game.config.width - 20, 20, 'LEVEL: 1', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.levelText.setOrigin(1, 0);
        this.uiContainer.add(this.levelText);
        
        // Lives
        this.lifeIcons = [];
        for (let i = 0; i < this.lives; i++) {
            const icon = this.add.image(40 + i * 40, 70, 'life_icon');
            icon.setScale(0.1);
            this.lifeIcons.push(icon);
            this.uiContainer.add(icon);
        }
    }
    
    update() {
        if (this.gameOver) return;
        
        // Scroll the road
        this.road.tilePositionY -= gameSettings.roadSpeed;
        
        // Update player
        this.player.update();
        
        // Update enemies and obstacles
        this.enemies.getChildren().forEach(enemy => enemy.update());
        this.obstacles.getChildren().forEach(obstacle => obstacle.update());
        
        // Update UI
        this.scoreText.setText(`SCORE: ${this.score}`);
        this.levelText.setText(`LEVEL: ${this.level}`);
    }
    
    spawnEnemy() {
        if (this.gameOver) return;
        
        // Random x position within road bounds (add some padding)
        const padding = 50;
        const x = Phaser.Math.Between(padding, this.game.config.width - padding);
        
        // Create enemy at top of screen
        const enemy = new Enemy(this, x, -50);
        this.enemies.add(enemy);
    }
    
    spawnObstacle() {
        if (this.gameOver) return;
        
        // Random x position within road bounds (add some padding)
        const padding = 50;
        const x = Phaser.Math.Between(padding, this.game.config.width - padding);
        
        // Create obstacle at top of screen
        const obstacle = new Obstacle(this, x, -50);
        this.obstacles.add(obstacle);
    }
    
    handleCollision(player, object) {
        // Only register hit if player is not invulnerable
        if (player.hit()) {
            // Reduce life
            this.lives--;
            
            // Update life icons
            if (this.lives >= 0 && this.lifeIcons[this.lives]) {
                this.lifeIcons[this.lives].setVisible(false);
            }
            
            // Check for game over
            if (this.lives <= 0) {
                this.endGame();
            }
        }
    }
    
    updateScore() {
        if (this.gameOver) return;
        
        // Increase score based on current level
        this.score += this.level * 10;
    }
    
    levelUp() {
        if (this.gameOver) return;
        
        // Increase level
        this.level++;
        gameSettings.currentLevel = this.level;
        
        // Play level up sound
        this.sound.play('level_up');
        
        // Increase road speed
        gameSettings.roadSpeed *= gameSettings.speedIncreasePerLevel;
        
        // Make enemies spawn faster
        this.enemyTimer.delay = Math.max(500, gameSettings.enemySpawnTime - (this.level * 100));
        
        // Flash level text
        this.tweens.add({
            targets: this.levelText,
            scale: 1.5,
            duration: 300,
            yoyo: true,
            ease: 'Sine.easeInOut'
        });
    }
    
    endGame() {
        this.gameOver = true;
        
        // Stop spawning
        this.enemyTimer.remove();
        this.obstacleTimer.remove();
        this.scoreTimer.remove();
        this.levelTimer.remove();
        
        // Stop engine sound
        this.engineSound.stop();
        
        // Play game over sound
        this.sound.play('game_over');
        
        // Save final score
        gameSettings.score = this.score;
        
        // Show game over screen after a short delay
        this.time.delayedCall(1500, () => {
            this.scene.start('GameOverScene');
        });
    }
}
