var PLAY=1;
var END=0;
var gameState=PLAY;


var vaccine;
var corona;
var coronaGroup;
var groundSprite,monster,monster1,monster2,monster3;
var corona1,ground1,vaccine2,monster1,gameover1,restart1,
    vaccine2,invisibleground;
var vaccine2_collided;
var vaccine2_running;

var gameover,restart;
var score=0;
var life=0;




function preload(){
corona1=loadImage("corona1.jpg");
ground1=loadImage("ground.jpg");
  vaccine_running=loadAnimation("vaccine.jpg");
vaccine3_collided=loadAnimation("vaccine2.jpg");
  monster1=loadImage("monster.jpg");
  gameover1=loadImage("gameover.webp");
  restart1=loadImage("restart.jpg");
  monster2=loadImage("monster2.jpg");
  monster3=loadImage("monster3.jpg");
}

function setup() {
  createCanvas(600,400);
 
 
  vaccine=createSprite(70,320,5,5);
  vaccine.addAnimation("running",vaccine_running);
  vaccine.scale=0.1;
  
  groundSprite=createSprite(0,350,1200,10);
  
  //200,350,1000,10
  groundSprite.shapeColor="yellow";
   groundSprite.x = groundSprite.width /2;
  groundSprite.velocityX = -(6 + 3*score/100);
               
  invisibleground=createSprite(0,345,1200,10);
  invisibleground.visible=false;
  
 

  restart=createSprite(300,200,20,20);
  restart.addImage(restart1);
  restart.scale=0.3;
  
  gameover=createSprite(300,100,20,20);
  gameover.addImage(gameover1);
  gameover.scale=0.3;
  
  gameover.visible=false;
  restart.visible=false;
  
  coronaGroup=new Group();
  monsterGroup=new Group();
  
  score=0;
}

function draw() {
  background("black");
  
  fill("white");
  textSize(20);
  text("score :" + score,500,40);
  text("life :"+life,50,40);
   drawSprites();
  
    fill("pink");
  textSize(30);
  text("kill  corona  using  vaccine  &  score  points",10,380);

  if(gameState===PLAY){
    if(score>=0){
      groundSprite.velocityX=-6;
    }
   // vaccine.addAnimation("running",vaccine_running);
    
    if(keyDown("space")&&vaccine.y>150){
      vaccine.velocityY=-15;}
    
      vaccine.velocityY=vaccine.velocityY+0.8;
    
    if(groundSprite.x < 0){
    groundSprite.x=groundSprite.width/2;}
    
    vaccine.collide(invisibleground);
    
    spawncorona();
    spawnmonster();
    
   
    if(monsterGroup.isTouching(vaccine)){
    gameState=END;
    life=life-1 ;
  }
    
  if(coronaGroup.isTouching(vaccine)){
    score=score+1;
    coronaGroup[0].destroy();
  }
  }
  
    
    else if (gameState===END){
      gameover.visible=true;
      restart.visible=true;
     vaccine.addAnimation("collided",vaccine3_collided);
      
      groundSprite.velocityX=0;
      vaccine.velocityX=0;
      vaccine.velocityY=0;
      vaccine.x=70;
      vaccine.y=320;
      
      //    vaccine.addAnimation("running",vaccine_running);
      
      coronaGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);

   vaccine.changeAnimation("collided",vaccine3_collided);
      
     // coronaGroup.setLifetimeEach(-1);
      //monsterGroup.setLifetimeEach(-1);
    
    
  if(mousePressedOver(restart)){
   // if(life>-1){
    reset();
  //}
  }
  }
  }

function spawncorona(){
  if(frameCount%20===0){
    var  corona=createSprite(100,100,20,20);
    corona.y=Math.round(random(80,120))
  corona.addImage(corona1);
  corona.scale=0.1;
    corona.velocityX=-5;
    
   // corona.lifetime=200;
    
    corona.depth=vaccine.depth;
    vaccine.depth=vaccine.depth+1;
    
    coronaGroup.add(corona);
  }
  }

function spawnmonster(){
  if(frameCount%100===0){
    
    monster=createSprite(200,200,100,100);
  
    var rand=Math.round(random(1,3));
      
          
          
          
      
      monster.velocityX=-(6+3*score/100);
    monster.scale=0.2;
    //monster.lifetime=300;
      
    monsterGroup.add(monster);
       }
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  
 // gameover.destroy();
 // restartGroup.destroyEach();
  monsterGroup.destroyEach();
  coronaGroup.destroyEach();
  
  vaccine.addAnimation("collided",vaccine3_collided);
  vaccine.scale=0.1;
  
  score=0;
  
}  





