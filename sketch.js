var ground;
var groundimage;
var trex ,trex_running;
var invisibleground;
var cloudimage;
var cloud;
var obstacle
var obsimg1,obsimg2,obsimg3,obsimg4,obsimg5,obsimg6
var score=0
var PLAY=1
var END=0
var gamestate=PLAY
var obstaclegroup,cloudgroup

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obsimg1=loadImage("obstacle1.png")
  obsimg2=loadImage("obstacle2.png")
  obsimg3=loadImage("obstacle3.png")
  obsimg4=loadImage("obstacle4.png")
  obsimg5=loadImage("obstacle5.png")
  obsimg6=loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200)
  
  trex=createSprite(100,150,50,50)
  trex.addAnimation("running",trex_running)

  trex.scale=0.6

  invisibleground=createSprite(300,200,600,20);
  invisibleground.visible=false

  ground=createSprite(300,185,600,20)
  ground.addImage(groundimage)
  
  obstaclegroup=new Group()
  cloudgroup=new Group()
}

function draw(){
  background("white")
  if (gamestate==PLAY){
   score+=Math.round(frameCount/200)

   if(keyDown("space")&&trex.y>150){
    trex.velocityY=-6
    ground.velocityX=-8
    
   }
   if(ground.x<0){
    ground.x=ground.width/2
   }
   trex.velocityY+=0.5
   spawnclouds()
   spawnobstacles()
   if (trex.isTouching(obstaclegroup)){
     gamestate=END
   }
  }

  else if (gamestate==END){
    trex.velocityY=0
    ground.velocityX=0
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
  }
  text ("Score: "+score,500,50)
  trex.collide(invisibleground)
  drawSprites()
}

function spawnclouds(){
  if (frameCount%80==0){
    cloud=createSprite(600,random(0,120),10,10)
    cloud.addImage(cloudimage)
    cloud.velocityX=-6
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime=120
    cloudgroup.add(cloud)
  }
}
function spawnobstacles(){
  if (frameCount%80==0){
    obstacle=createSprite(600,165,10,10)
    obstacle.velocityX=-6
    obstacle.scale=0.5
    obstacle.lifetime=120
    var selectimage=Math.round(random(1,6))
    switch(selectimage){
      case 1:obstacle.addImage(obsimg1)
      break;
      case 2:obstacle.addImage(obsimg2)
      break;
      case 3:obstacle.addImage(obsimg3)
      break;
      case 4:obstacle.addImage(obsimg4)
      break;
      case 5:obstacle.addImage(obsimg5)
      break;
      case 6:obstacle.addImage(obsimg6)
      break;
    }
    obstaclegroup.add(obstacle)
  }
}