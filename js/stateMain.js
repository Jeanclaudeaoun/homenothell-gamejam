var StateMain = {
    preload: function() {

game.load.audio('hotttt', ['images/Game.wav']);

// *true* param enables looping

    game.load.image("background" , "images/Background.png")
        //game.load.image("ground", "images/ground.png");
        game.load.image("hero", "images/Demon.png");
      //  game.load.image("bar", "images/powerbar.png");
        //game.load.image("block", "images/block.png");
        game.load.image("water", "images/water.png");
        game.load.image("playAgain", "images/playAgain.png");
        //game.load.image("clouds", "images/clouds.png");
        //game.load.atlasJSONHash('hero', 'images/explorer.png', 'images/explorer.json');
        game.load.image("powerUp", "images/baby.png");
        game.load.image("babyDemon","images/babyDemon.png")
    },
    create: function() {
      this.backgroundSound = game.add.audio('hotttt', 0.5, true) // here "true" means to loop

this.backgroundSound.play()
        this.backgroundControler = 0;
        this.power = 20*12;
        //turn the background sky blue
        game.stage.backgroundColor = "#00ffff";
        this.background1 = game.add.sprite(0, 0, "background");
        this.background2 = game.add.sprite(100000, 0, "background");
        //add the ground
        //this.ground = game.add.sprite(0, game.height * .9, "ground");
        //add the hero in
        this.hero = game.add.sprite(game.width /2 , game.height, "hero");
        //make animations
        // this.hero.animations.add("die", this.makeArray(0, 10), 12, false);
        // this.hero.animations.add("jump", this.makeArray(20, 30), 12, false);
        // this.hero.animations.add("run", this.makeArray(30, 40), 12, true);
        // this.hero.animations.play("run");
      //  this.hero.width = game.width / 12;
        this.hero.scale.y =0.6;
        this.hero.scale.x=0.6;
        this.hero.anchor.set(0.5, 1);
        //add the power bar just above the head of the hero
        //this.powerBar = game.add.sprite(this.hero.x + this.hero.width / 2, this.hero.y - this.hero.height / 2, "bar");
        //this.powerBar.width = 0;
        //add the clouds
        //this.clouds = game.add.sprite(0, 0, "clouds");
        //this.clouds.width = game.width;
        //start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the hero for physics
        game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        //game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 100;
        this.hero.body.gravity.y = 1000;
        this.hero.body.collideWorldBounds = true;
        //this.hero.body.bounce.set(0, .2);
        //this.ground.body.immovable = true;
        //record the initial position
        //this.startY = this.hero.y;
        //set listeners
        game.input.onDown.add(this.mouseDown, this);


        this.makeWaterCreate();
        this.makePowerUp();

    },
    mouseDown: function() {

        this.doJump();
        // this.hero.animations.play("jump");
        game.input.onDown.add(this.mouseDown, this);
    },
    doJump: function() {
        this.hero.body.velocity.y = -this.power ;
        //  this.hero.y= this.hero.y - 12;
    },
    makeWaterCreate: function() {
        //if the bird already exists
        //destory it
        // if (this.w1) {
        //     this.w1.destroy();
        // }

        //add the bird sprite to the game

        this.w1 = game.add.sprite(0, Math.floor(Math.random() * game.height), "water");
              //enable the sprite for physics
        game.physics.enable(this.w1, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.w1.body.velocity.x = Math.floor(Math.random() * 200)+100;
        this.w1.body.mass=0;
        // if (this.w2) {
        //     this.w2.destroy();
        // }

        //add the bird sprite to the game

        this.w2 = game.add.sprite(0, Math.floor(Math.random() * game.height), "water");
              //enable the sprite for physics
        game.physics.enable(this.w2, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.w2.body.velocity.x = Math.floor(Math.random() * 200)+100;
        this.w2.body.mass = 0;
    },
    makeWaterUpdate: function() {
        //if the bird already exists
        //destory it
        // if (this.w1) {
        //     this.w1.destroy();
        // }
        if(this.w2.x>game.width && this.w1.x>game.width){
        if(this.w1)
          this.w1.destroy();
        //add the bird sprite to the game

        this.w1 = game.add.sprite(0, Math.floor(Math.random() * game.height), "water");
              //enable the sprite for physics
        game.physics.enable(this.w1, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.w1.body.velocity.x = Math.floor(Math.random() * 200)+100;
        this.w1.body.mass=0;
        // if (this.w2) {
        //     this.w2.destroy();
        // }

        if(this.w2)
          this.w2.destroy();
        //add the bird sprite to the game

        this.w2 = game.add.sprite(0, Math.floor(Math.random() * game.height), "water");
              //enable the sprite for physics
        game.physics.enable(this.w2, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.w2.body.velocity.x = Math.floor(Math.random() * 200)+100;
        this.w2.body.mass = 0;
    }},
    makePowerUp: function() {
        //if the bird already exists
        //destory it
        // if (this.powerUp) {
        //     this.powerUp.destroy();
        // }
        //add the bird sprite to the game

        this.powerUp = game.add.sprite(game.width+1000, game.height-50, "powerUp");
    // this.powerUp = game.add.sprite(game.width, this.ground.y, "powerUp");
              //enable the sprite for physics
        game.physics.enable(this.powerUp, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.powerUp.body.velocity.x = -300;

        this.powerUp.scale.x=0.1;
        this.powerUp.scale.y=0.1;
    },
    onGround: function() {
        if (this.hero) {
            // this.hero.animations.play("run");
        }
    },
    background: function(){
      this.background1.x -= 10;
      this.background2.x -= 10;
      if (this.background1.x <= ((-this.background1.width) +  game.width) ) {
        if(this.backgroundControler==0){
          //this.background1.x=100000;
          this.background2.x = game.width-10;
          this.backgroundControler=1;
        }
      }
      if(this.background2.x <= ((-this.background2.width) +  game.width) ){
        if(this.backgroundControler==1){
        //  this.background2.x=100000;
          this.background1.x = game.width-10;
          this.backgroundControler=0;
        }
      }
    },
    poweredUp:false,

    update: function() {
    //  game.physics.arcade.collide(this.hero, this.ground, this.onGround, null, this);
      this.background();
      if(this.powerUp.alive){
        if (this.checkOverlap(this.hero, this.powerUp)){
          this.powerUp.destroy();
          this.hero.loadTexture("babyDemon");
          // this.hero.scale.x=0.15;
          // this.hero.scale.y=0.15;
          //this.hero.anchor.set(0.5, 1);
          //this.hero.body.setSize(400,400);
          this.poweredUp = true;
        }
      }
        if (game.input.activePointer.isDown) {
              this.mouseDown();
            //  this.hero.body.velocity.y = -this.power * 12000;
            }

          game.physics.arcade.collide(this.hero, this.w1,  function() {this.delayOver(1)}, null, this);
          game.physics.arcade.collide(this.hero, this.w2, function() {this.delayOver(2)}, null, this);


        //
        //collide the hero with the blocks
        //


      //  game.physics.arcade.collide(this.hero, this.powerUp, this.givePower, null, this);
        //
        //collide the blocks with the ground
        //
        //game.physics.arcade.collide(this.ground, this.blocks);
        //
        //when only specifying one group, all children in that
        //group will collide with each other

        //

        //
        //get the first child
        //if off the screen reset the blocks
        //if the bird has flown off screen
        //reset it
        if (this.w1.x > game.width && this.w2.x > game.width) {
          if(Math.floor(Math.random() * 10)>2)
            this.makeWaterUpdate();
        }
         //this.makeWaterUpdate();
        // if (this.hero.y < this.hero.height) {
        //     this.hero.body.velocity.y = 200;
        //     this.delayOver();
        // }
    },
    delayOver: function(x=0) {
      if(x==1){
          this.w1.x=game.width+1;
          this.w1.destroy()
      }
      if (x==2) {
        this.w2.x=game.width+1;
          this.w2.destroy()
      }
        if(this.poweredUp){
          this.hero.loadTexture("hero");
          this.hero.scale.y =0.6;
          this.hero.scale.x=0.6;
          this.hero.anchor.set(0.5, 1);
          this.poweredUp=false;
          this.makePowerUp();
        }
        else{
          if (this.hero) {
            // this.hero.animations.play("die");
            this.hero.body.velocity.y = 100;
          }
          game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
        }

    },
    gameOver: function() {
        game.state.start("StateOver");
    },
    givePower: function() {

    },
    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);



},render: function () {
  //game.debug.body(this.hero);

}
}
