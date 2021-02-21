//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, dogImg1


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,250)
  dog.addImage(dogImg)
  dog.scale = 0.1

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


  
}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1)
  }
 
  
  drawSprites();
  //add styles here
  textSize(20)
  fill("black")
  stroke(5)
  text("Food remaining: "+foodS,150,200)
  text("Press up arrow to feed the dog", 150,150)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  
  database.ref('/').update({
    Food:x
  })
}

