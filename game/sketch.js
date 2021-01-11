var START = 2;
var PLAY = 1;
var END = 0;
var gameState =START;

var background

var spaceship
var enemyGroup
var bulletGroup
var edges


function preload() {
  ship_running = loadImage("spaceship1.png");
  enemyImage = loadImage("enemyship.png");
  backgroundImage = loadImage("spaceback1.jpg");
  bulletImage = loadImage("bullet.png");
}

function setup() {
  createCanvas(400, 600);
  score = 0;
  background(022);
  background = createSprite(200, 300, 5, 5);
  background.addImage(backgroundImage);
  background.scale =4;

  spaceship = createSprite(200, 500, 5, 5);
  spaceship.addImage(ship_running);
  spaceship.scale = 1;
  
  edges = createEdgeSprites();
  enemyGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  
    
  if(gameState === START){
    
  
    stroke("cyan");
    textSize(35);
    text("press 'n' to start the game",0,590);
    stroke("red");
    text("instruction",100,100);
    stroke("black");
    textSize(20);
    text("1.press 'right key' for moving the spaceship ",0,150);
    text("to right.",15,180);
    text("2.press 'left key' for moving the spaceship ",0,210);
    text("to left.",15,240);
    text("3.press 'Space key' for shooting bullets. ",0,270);
    stroke("sky")
    textSize(45);
    text("SPACE SHOOTER",0,50);
  
    if(keyWentDown("n")){
      gameState = PLAY;
    }
  }else if(gameState === PLAY){
    drawSprites();
  
  if (keyDown("right")) {
    spaceship.x = spaceship.x + 9;
  }
  if (keyDown("left")) {
    spaceship.x = spaceship.x - 9;
  }
    
  if (keyWentDown("space")) {

    var bullet
    bullet = createSprite(300, 490, 5, 5);
    bullet.x = spaceship.x - 20;
    bullet.scale = 0.2;
    bullet.visible = true;
    bullet.velocityY = -20;
    bullet.lifetime = 200;
    bullet.addImage(bulletImage);
    bulletGroup.add(bullet);

    var bullet1
    bullet1 = createSprite(300, 490, 5, 5);
    bullet1.x = spaceship.x + 15;
    bullet1.scale = 0.2;
    bullet1.visible = true;
    bullet1.velocityY = -20;
    bullet1.lifetime = 200;
    bullet1.addImage(bulletImage);
    bulletGroup.add(bullet1);
  }
    
    background.velocityY = 10;                 
    if (background.y > 600) {
    background.y = background.height / 4;
  }
    var select_enemy = Math.round(1);

    if (World.frameCount % 60 === 0) {

    if (select_enemy == 1) {
      enemy();
    }
    }
    
   if(bulletGroup.isTouching(enemyGroup)){
    score = score + 5;
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
   }
    
   if(enemyGroup.isTouching(spaceship)){
     gameState = END;
     spaceship.destroy();
     enemyGroup.destroyEach();
   }
    stroke("yellow");
    textSize(25);
    text("score:" + score, 10, 580);
   
    
  }
  else if(gameState === END){
    background.velocityY = 0;
    enemyGroup.setVelocityYEach(0);
    score = score ;
    stroke("yellow");
    textSize(40);
    text("Better luck next time !",10, 300);
    
    stroke("cyan");
    textSize(25);
    text("score : " + score, 130,350);
    
  }

  spaceship.collide(edges);

   
}

function enemy() {
  var enemy = createSprite(Math.round(random(40, 360)), 0, 10, 10);
  enemy.addImage(enemyImage);
  enemy.velocityY = 15;
  enemy.lifetime = 150;
  enemy.scale = 0.1;
  enemyGroup.add(enemy);
}