var invisibleBg;
var obstaclesGroup;
var barGroup;
var topBarGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var kills = 0;


function preload() {
bgImg1 = loadImage("images/forest background.jpg");
kidImg = loadAnimation("images/kid1.png", "images/kid2.png", "images/kid3.png");
m1Img = loadImage("images/dragon.png");
m2Img = loadImage("images/Monsters.png");
m3Img = loadImage("images/thorns.png");
m4Img = loadImage("images/zombie 1.png");
fireImg = loadImage("images/fireBall.png");
kidImg1 = loadAnimation("images/kid2.png");
gameOverImg = loadImage("images/gameOver.png");
restartImg = loadImage("images/restart.png");
heart1Img = loadImage("images/heart_1.png");
heart2Img = loadImage("images/heart_2.png");
heart3Img = loadImage("images/heart_3.png");
dieSound = loadSound("images/die.mp3");
jumpSound = loadSound("images/jump.mp3");
explosionSound = loadSound("images/explosion.mp3");
loseSound = loadSound("images/lose.mp3");
}
function setup() {
  createCanvas(1200,800);

  bg = createSprite(600,400);
  bg.addImage(bgImg1);

  kid = createSprite(60,500);
  kid.addAnimation("running",kidImg);
  kid.addAnimation("stopped",kidImg1);
  kid.scale = 0.4;

  obstaclesGroup = new Group();
  barGroup = new Group();
  topBarGroup = new Group();



  invisibleBg = createSprite(600,565,1200,20);
  invisibleBg.visible = false;

  gameOver = createSprite(600,320);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(600,400);
  restart.addImage(restartImg);
  restart.visible = false;





  bg.velocityX = -3;

 heart1 = createSprite(80, 80, 20, 20);
  heart1.addImage(heart1Img);
  heart1.scale = 0.2;
  heart1.visible = false;

 heart2 = createSprite(80, 80, 20, 20)
 heart2.addImage(heart2Img);
  heart2.scale = 0.2;
  heart2.visible = false;

 heart3 = createSprite(80, 80, 20, 20)
 heart3.addImage(heart3Img);
  heart3.scale = 0.2;
 

}

function draw() {
  background(255,255,255);  


  if(gameState === PLAY) {

    if(life === 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if(life === 2) {
      heart2.visible = true;
      heart3.visible = false;
      heart1.visible = false;
    }

    if(life === 1) {
      heart1.visible = true;
      heart3.visible = false;
      heart2.visible = false;
    }

    if(life == 0) {
      loseSound.play();
      heart1.visible = false;
      heart3.visible = false;
      heart2.visible = false;
      gameState = END;
    }

    

    if(bg.x < 0) {
      bg.x = 600;
    }

    if(keyDown(UP_ARROW) && kid.y > 500) {
      kid.velocityY = -14;
      jumpSound.play();
    }
    kid.velocityY = kid.velocityY + 0.6;
  
    kid.collide(invisibleBg);

    if(barGroup.isTouching(kid)) {
      score = score + 1;
    }

    spawnObstacles();
    Bar();

   if(obstaclesGroup.isTouching(kid)) {
    dieSound.play();
   for(var i = 0; i< obstaclesGroup.length; i++) {

     if(obstaclesGroup[i].isTouching(kid)) {
       obstaclesGroup[i].destroy();
       topBarGroup[i].destroy();
       life = life - 1;
     }
   }

     
   }
   if(topBarGroup.isTouching(kid)) {
    for(var i = 0; i< topBarGroup.length; i++) {
      explosionSound.play();
      if(topBarGroup[i].isTouching(kid)) {
        obstaclesGroup[i].destroy();
        topBarGroup[i].destroy();
        kills = kills + 1;
      }
    }
   }
  }


  if(gameState === END) {
      bg.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);

      barGroup.setVelocityXEach(0);
      barGroup.setLifetimeEach(-1);

      topBarGroup.setVelocityXEach(0);
      topBarGroup.setLifetimeEach(-1);

      kid.velocityX = 0;
      kid.velocityY = 0;

      kid.changeAnimation("stopped");

      gameOver.visible = true;
      restart.visible = true;

      if(mousePressedOver(restart)) {
        reset();
      }


  }



  drawSprites();

  fill("black");
  stroke("purple");
  textSize (20);
  text("score: "+ score, 1050, 90);
  text("kills: "+ kills, 1050, 120);

}

function reset() {
  gameState = PLAY;
  score = 0;
  kills = 0;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  barGroup.destroyEach();
  topBarGroup.destroyEach();
  kid.changeAnimation("running");
  bg.velocityX = -3;
  life = 3;
}

function spawnObstacles() {
if(frameCount % 220 === 0) {
  obstacles = createSprite(1220,520);
  obstaclesGroup.add(obstacles);

  obstacles.lifetime = 440;

  obstacles.velocityX = -3;
  


  var randomNum = Math.round(random(1,5));
  switch(randomNum) {
    case 1: obstacles.addImage(m1Img); 
        obstacles.scale = 0.2;
        topBar = createSprite(1220,480,40,10);
        topBar.velocityX = -3;
        topBarGroup.add(topBar);

        break;
    case 2: obstacles.addImage(m2Img); 
        obstacles.scale = 0.5;
        topBar = createSprite(1220,480,20,10);
        topBar.velocityX = -3;
        topBarGroup.add(topBar);
        obstacles.setCollider("rectangle", 0,0,45,40);
        break;
    case 3: obstacles.addImage(m3Img); 
         obstacles.scale = 0.3;
         topBar = createSprite(1220,500,20,10);
         topBar.velocityX = -3;
         topBarGroup.add(topBar);
         obstacles.setCollider("rectangle", 0,0,52,40);
        break;
    case 4: obstacles.addImage(m4Img); 
         obstacles.scale = 0.1;
         topBar = createSprite(1220,480,20,10);
         topBar.velocityX = -3;
         topBarGroup.add(topBar);
         obstacles.setCollider("rectangle", 0,0,30,50);
        break;
    case 5: obstacles.addImage(fireImg);
    topBar = createSprite(1220,480,20,10);
         topBar.velocityX = -3;
         topBarGroup.add(topBar); 
         obstacles.scale = 0.1;
        break;

    
  }
  topBar.visible = false;
}
}

function Bar() {
  if(frameCount % 220 === 0) {
  var bar = createSprite(1220,520,1,300);
  barGroup.add(bar);
  
  bar.lifetime = 440;

  bar.velocityX = -3;
  bar.visible = false;
  
      
    }
}

