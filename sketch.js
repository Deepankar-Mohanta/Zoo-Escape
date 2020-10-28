
var monkey , monkey_running, collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground, groundimg, invisibleground;
var gameState=1;
var PLAY=1;
var END=0;
var gameover, gameoverimg, reset, resetimg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundimg = loadImage("ground.jpg");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  collide=loadImage("sprite_0.png");
  gameoverimg=loadImage("gameOver.png");
  resetimg=loadImage("restart.png");
}



function setup() {
  createCanvas(600,400);
   ground=createSprite(0, 390, 10, 10)
  ground.addImage("ground", groundimg);
  ground.scale=1
  
  invisibleground=createSprite(300, 357, 600, 20);
  invisibleground.visible=false;
  monkey=createSprite(70, 300, 10, 10);
  monkey.addAnimation("monkey",monkey_running );
  monkey.scale=0.15;
  
  gameover=createSprite(300, 150, 10, 10);
  gameover.addImage('gameover', gameoverimg);
  
  reset=createSprite(300 , 200, 10, 10);
  reset.addImage('restart', resetimg);
  reset.scale=0.5

   FoodGroup= new Group();
   obstacleGroup=new Group();
}


function draw() {
background(230);
  textSize(20);
  fill('black');
  text("Survival Time="+score, 230, 50);
  monkey.collide(invisibleground);
  if(gameState===PLAY){
    ground.velocityX=-6;
    if(ground.x<0){
    ground.x = ground.width/2;
    }
   
    if(keyDown("SPACE")&&monkey.y >= 200){
      monkey.velocityY=-10;
    }
    monkey.velocityY=monkey.velocityY+0.5;
    score = score + Math.round(getFrameRate()/60);
   if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach(); 
   }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
   }
     monkey.changeAnimation("monkey", monkey_running);
    gameover.visible=false;
    reset.visible=false;
    
  spawnRock();
  spawnFruit();
   }
  if(gameState===END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.addImage("monkey", collide);
    
    gameover.visible=true;
    reset.visible=true;
  }
  
  if(mousePressedOver(reset)&&gameState===END){
   gameState=PLAY;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.changeAnimation("monkey", monkey_running);
  }
  
  drawSprites();
}

function spawnRock(){
  if(frameCount%300===0){
    obstacle=createSprite(600, 310, 600, 10);
    obstacle.addImage('obstacle', obstaceImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-6;
    obstacle.lifetime=-5;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 130);
    
   
  
  }
   
}

function spawnFruit(){
  if(frameCount%80===0){
    banana=createSprite(600, 0, 10, 10);
    banana.addImage('banana', bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=-1;
    var spawn=Math.round(random(150, 300));
    banana.y=spawn;
    
     FoodGroup.add(banana)
  }
}



