// Predator-Prey Simulation - INVADED by DEMONCATS
// by Justin Cea
//
// Creates a Hero and three DEMONCATS (of different speeds)
// The DEMONCATS wander dangerously around the prey.
// The HERO loses health over time, so they must keep absorbing LIFEPACKS in order to survive.
//THe Goal is for the HERO to collect at least 9 coins in the goal to bribe the DEMONCATS away; back to their home planet.
let playing = false;
let gameOver = false;
let winning = false;
// Our Hero
let angel;

// The three invaders
let red;
let green;
let yellow;
let blue;

//Colectable
let coin;
let lifePack;
//Music & Sounds
let song;
let coinSound;

//Declared Variables for Images//
let angelCatImage;

let redDemonImage;
let yellowDemonImage;
let greenDemonImage;

let soldier;

let coinImage;

let healthImage;

//Declared Variable for Font
let goPandaFont;
let minecraftFont;

let numPrey = 3;// How many Preys to simulate
let prey = [];// An empty array to store them in

// setup()
//
function preload(){

  //Characters//
  angelCatImage = loadImage("assets/images/holycat.png");
  redDemonImage = loadImage ("assets/images/demoncat.png");
  greenDemonImage = loadImage ("assets/images/demoncat_B.png");
  yellowDemonImage = loadImage ("assets/images/demoncat_C.png");
  soldier =loadImage ("assets/images/civilCat.png");
  //Fonts//
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");//https://www.dafont.com/
  minecraftFont = loadFont("assets/fonts/minecraftFont.ttf");//https://www.dafont.com/
  //Collectables//
  coinImage = loadImage("assets/images/coin.png");
  healthImage = loadImage ("assets/images/lifePack.png");
  //Sounds//
  song = loadSound("assets/sounds/meowMusic.mp3");
  // Sound FX //
  coinSound = loadSound("assets/sounds/coinSound.mp3");
  healthSound = loadSound("assets/sounds/healthSound.mp3");



  //Background//
  night = loadImage("assets/images/sky.png");
  win = loadImage("assets/images/winImage.png");
  lose = loadImage("assets/images/gameoverimage.png");
  frontimage = loadImage("assets/images/frontimage.png");

}
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(800, 750);
  angel = new Hero (415, 400, 5, angelCatImage, 65, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,16);

  coin = new Coin (550, 250, 1, coinImage, 75);


  lifePack = new HealthPack (400,250, 1, healthImage,30);

  red = new Enemy (415, 100, 15, redDemonImage, 75);
  yellow = new Enemy (700, 100, 20, yellowDemonImage, 75);
  green = new Enemy (100, 100, 5, greenDemonImage, 75);
  blue = new Prey (200,200,5,soldier,75);

  // Generates each Prey and puts it in the array
  for (let i = 0; i < numPrey; i++) {
    // Arguments of the Prey constructor
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preySpeed = random(2, 20);
    let preyRadius = 25;
    // New Prey objects with the random values
    prey.push(new Prey(preyX,preyY,preySpeed,soldier,preyRadius));

  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
    background(night);

  if (playing == true){

  // Handle input for the tiger
  angel.handleInput();

  // Move all the "Cats including HeroCat"
  angel.move();

  red.move();
  yellow.move();
  green.move();
  blue.move();

// Move "Objects"
  coin.move();
  lifePack.move();

  // Handle the tiger eating any of the prey
  angel.handleEating(red);
  angel.handleEating(yellow);
  angel.handleEating(green);
  angel.handleEating(blue);

  coin.handleEating(angel);
  lifePack.handleEating(angel);

  //Declared variable for Death
  angel.handleDeath();
  checkGameOver();
  // Display all the "CATS"
  angel.display();

  red.display();
  yellow.display();
  green.display();


  for (let i = 0; i < prey.length; i++) {
  // And for each one, move it and display it
  prey[i].move();
  prey[i].display();
  prey[i].handleEating(angel);
}
//Display all Objects
  coin.display();
  lifePack.display();

  displayInstructions();//Declared Variable for Instructions

  }
  else {

    if (gameOver ==true){
      displayGameOver();
    }
    else{
    background (night);
    displayStartMessage();
    }
    if (winning === true){
      displayWinning();
    }

  }
}
function displayInstructions(){
  //Black Rectangle
  fill(0);
  //black border behind text to make it more visible
  rect(0, 0, 1000, 85);
  textAlign(CENTER);
  textSize(20);
  textFont(minecraftFont);
  fill(255);
  //Instructions
  text("=====.:A real CATastrophe:.====== \n Try your BEST to collect at least 9 CatCoins", width / 2, 38);
  fill(138, 12, 134);
  text("GOOD LUCK CHIEF!", width / 2, 92);
  textSize(10);
  fill(255);
  text(" TIP:  HOLYCATS give you a short Speed-Boost",150,78);
  textSize(7.5);
  fill(255);
  text("    TIP:  Use SHIFT to sprint but by doin so it slowly drains your life",645,78);



}
function displayStartMessage() {
push();
background(frontimage);
textAlign(CENTER,CENTER);
textSize(15);
textFont(minecraftFont);
fill(255);
text(".:you:.",383,230);
textSize(25);
text("\n\nDemon Cats have invaded all of Cat-Universe. \nTheir goal is to exploit our CATCOINS.\n We need to bring a stop to their mischief \n before they steal all of our valuable resources.\n\nUSE AWSD to move your PLAYER\n\n\n \n", width / 2, height/2);
fill(0);
text("CLICK TO START",width / 2,455);
fill(255);
text("beware of",width/2, 485);
textSize(64);
text(".: | DEMONCATS | :.",width/2,545);
pop();
}

function checkGameOver() {//checks if Hero is dead if so -> game over
  if (angel.death === true) {
    gameOver = true;
    playing = false;
  }
}
function displayGameOver() { //Game Over Message
    push();
    background(lose);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(32);
    let gameOverText="\n\n\n\n\n\n\n\n\n\n\n\n====. : GAME OVER: .===== \n"
    gameOverText = gameOverText+ "you've collected\n" +"====  " + coin.eat + " CATCOINS  ====\n it's NOT enough to drive \n the DEMONCATS back to \n their EVIL DIMENSION";
    text(gameOverText, width / 2, height / 2);
    song.stop();
    pop();
  }
  function displayWinning() { //Game Over Message
      push();
      background(win);
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(49);
      let gameOverText="\n\n\n\n====. : YOU WIN : .===== \n"
      gameOverText = gameOverText+ "you've collected ALL \n" +"=====  " + coin.eat + " CATCOINS  ======\n now the DEMONCATS have \n no choice but to go back to \n their EVIL DIMENSION";
      text(gameOverText, width / 2, height / 2);
      song.stop();
      pop();
    }
function mousePressed() { //Allows Game to start once Mouse is Pressed
    playing = true;
    gameOver = false;
    song.loop();
}
