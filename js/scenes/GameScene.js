class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    init() {
        console.log("GameScene init called");
        this.lives = gameSettings.maxLives;
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.roadStripeOffset = 0; // Nowa zmienna do śledzenia przesunięcia tekstury drogi
    }
    
    create() {
        console.log("GameScene create started");
        
        this.levelThresholds = [200, 500, 750, 1000];
        this.nextLevelThreshold = this.levelThresholds[0];
        
        // Pobierz wymiary ekranu gry
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        // 1. Najpierw dodajemy CIEMNIEJSZĄ ZIELONĄ tło na cały ekran
        this.add.rectangle(gameWidth/2, gameHeight/2, gameWidth, gameHeight, 0x2A7D2A); // Ciemniejszy odcień zieleni
        
        // 2. Dodajemy szarą drogę z odpowiednim marginesem (bez pasów)
        const roadWidth = gameWidth * 0.8; // 80% szerokości ekranu
        this.add.rectangle(gameWidth/2, gameHeight/2, roadWidth, gameHeight, 0x555555);
        
        // 3. CAŁKOWICIE NOWE PODEJŚCIE - dynamiczne rysowanie tekstury drogi z pasami
        
        // Tworzenie tekstury graficznej dla pasa drogi
        const roadStripeGraphics = this.make.graphics({x: 0, y: 0, add: false});
        
        // Ustawienia dla pasa drogi
        const stripeWidth = roadWidth * 0.05;  // szerokość pasa
        const stripeHeight = gameHeight * 0.1; // wysokość pojedynczego pasa
        const stripeGap = gameHeight * 0.2;    // przerwa między pasami
        const totalPatternHeight = stripeHeight + stripeGap;
        
        // Czyścimy grafikę
        roadStripeGraphics.clear();
        
        // Rysujemy biały prostokąt (pasek) na górze tekstury
        roadStripeGraphics.fillStyle(0xFFFFCC);
        roadStripeGraphics.fillRect(0, 0, stripeWidth, stripeHeight);
        
        // Generujemy teksturę z grafiki
        roadStripeGraphics.generateTexture('roadStripe', stripeWidth, totalPatternHeight);
        
        // Tworzymy sprite, który będzie używał tej tekstury jako pasa na drodze
        // Rozciągamy go na całą wysokość ekranu i dodajemy więcej, aby zapewnić płynne przewijanie
        this.roadStripeSprite = this.add.tileSprite(
            gameWidth/2,          // x środka
            gameHeight/2,         // y środka
            stripeWidth,          // szerokość pasa
            gameHeight + totalPatternHeight * 2, // wysokość (ekran + dodatkowa przestrzeń)
            'roadStripe'          // klucz tekstury
        );
        
        console.log("Road stripe created with dimensions:", stripeWidth, "x", gameHeight + totalPatternHeight * 2);
        
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
        
        // Create UI
        this.createUI();
        
        // Start background engine sound - zmniejszona głośność
        this.engineSound = this.sound.add('engine_loop', { loop: true, volume: 0.25 });
        this.engineSound.play();
        
        // Debugowanie fizyki
        this.physics.world.createDebugGraphic();
        this.physics.world.debugGraphic.visible = false;
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
        });
        
        // Prędkość przewijania drogi
        this.scrollSpeed = gameSettings.roadSpeed;
        
        console.log("GameScene create completed");
    }
    
    update() {
        if (this.gameOver) return;
        
        // NOWA ANIMACJA PASA DROGI
        // Aktualizujemy offset tekstury, aby uzyskać efekt przewijania
        this.roadStripeOffset += this.scrollSpeed * 0.01; // Mnożnik kontroluje prędkość przewijania
        this.roadStripeSprite.tilePositionY = this.roadStripeOffset;
        
        // Update player
        this.player.update();
        
        // Update enemies and obstacles
        this.enemies.getChildren().forEach(enemy => {
            enemy.setVelocityY(300);
            enemy.update();
        });
        
        this.obstacles.getChildren().forEach(obstacle => {
            obstacle.setVelocityY(280);
            obstacle.update();
        });
        
        // Sprawdź czy osiągnięto próg punktowy dla kolejnego poziomu
        if (this.score >= this.nextLevelThreshold) {
            this.levelUp();
            
            // Ustaw następny próg (jeśli istnieje)
            const nextThresholdIndex = this.levelThresholds.indexOf(this.nextLevelThreshold) + 1;
            if (nextThresholdIndex < this.levelThresholds.length) {
                this.nextLevelThreshold = this.levelThresholds[nextThresholdIndex];
            } else {
                this.nextLevelThreshold = Number.MAX_SAFE_INTEGER;
            }
        }
        
        // Update UI
        this.scoreText.setText(`SCORE: ${this.score}`);
        this.levelText.setText(`LEVEL: ${this.level}`);
    }
    
    // Pozostała część kodu bez zmian
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
    
    isPositionOccupied(x, y, minDistance) {
        for (let obstacle of this.obstacles.getChildren()) {
            const distanceX = Math.abs(obstacle.x - x);
            if (distanceX < minDistance) {
                return true;
            }
        }
        
        for (let enemy of this.enemies.getChildren()) {
            const distanceX = Math.abs(enemy.x - x);
            if (distanceX < minDistance) {
                return true;
            }
        }
        
        return false;
    }
    
    spawnEnemy() {
        if (this.gameOver) return;
        
        const padding = 50;
        const minSpacing = 70;
        let x;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            x = Phaser.Math.Between(padding, this.game.config.width - padding);
            attempts++;
        } while (this.isPositionOccupied(x, -50, minSpacing) && attempts < maxAttempts);
        
        const enemy = new Enemy(this, x, -50);
        enemy.setVelocityY(300);
        this.enemies.add(enemy);
    }
    
    spawnObstacle() {
        if (this.gameOver) return;
        
        const padding = 50;
        const minSpacing = 70;
        let x;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            x = Phaser.Math.Between(padding, this.game.config.width - padding);
            attempts++;
        } while (this.isPositionOccupied(x, -50, minSpacing) && attempts < maxAttempts);
        
        const obstacle = new Obstacle(this, x, -50);
        obstacle.setVelocityY(280);
        this.obstacles.add(obstacle);
    }
    
    handleCollision(player, object) {
        if (player.hit()) {
            this.lives--;
            
            if (this.lives >= 0 && this.lifeIcons[this.lives]) {
                this.lifeIcons[this.lives].setVisible(false);
            }
            
            if (this.lives <= 0) {
                this.endGame();
            }
        }
    }
    
    updateScore() {
        if (this.gameOver) return;
        this.score += this.level * 10;
    }
    
    levelUp() {
        if (this.gameOver) return;
        
        this.level++;
        gameSettings.currentLevel = this.level;
        
        this.sound.play('level_up');
        
        // Zwiększ prędkość przewijania drogi
        this.scrollSpeed *= gameSettings.speedIncreasePerLevel;
        gameSettings.roadSpeed = this.scrollSpeed;
        
        this.enemyTimer.delay = Math.max(500, gameSettings.enemySpawnTime - (this.level * 100));
        
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
        
        this.enemyTimer.remove();
        this.obstacleTimer.remove();
        this.scoreTimer.remove();
        
        this.engineSound.stop();
        
        this.sound.play('game_over');
        
        gameSettings.score = this.score;
        
        this.time.delayedCall(1500, () => {
            this.scene.start('GameOverScene');
        });
    }
}
