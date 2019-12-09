// Predator-Prey Simulation - INVADED by DEMONCATS
// Project 3
// by Justin Cea
//
// Creates a Hero and three DEMONCATS (of different speeds)
// The DEMONCATS wander dangerously around the prey.
// The HERO loses health over time, so they must keep absorbing LIFEPACKS in order to survive.
//The Goal is for the HERO to collect at least 9 coins in the goal to bribe the DEMONCATS away; back to their home planet.
let playing = false;
let gameOver = false;
let winning = false;



// Our Hero
let angel;
let angel2;
// The three invaders
let red;

let babyRed;

//Colectable
let coin;
let lifePack;
let speedPack;
//Music & Sounds
let song;
let coinSound;

//Declared Variables for Preys(soldiers)//
let soldierA;
let soldierB;
let soldierC;
let soldierD;

let coinImage;

let healthImage;

//Declared Variable for Font
let goPandaFont;
let minecraftFont;

let numPrey = 5;// How many Preys to simulate
let prey = []; // An empty array


// setup()
//
function preload(){

  //Avatars//
  angelCatImage = loadImage("assets/images/holycat.png");
  angelCat2Image = loadImage("assets/images/coincat.png");
  //Demoncats//
  redDemonImage = loadImage ("assets/images/demoncat.png");
  greenDemonImage = loadImage ("assets/images/demoncat_B.png");
  yellowDemonImage = loadImage ("assets/images/demoncat_C.png");

  //Enemies//
  soldierA = loadImage ("assets/images/demoncatsoldierA.png");
  soldierB = loadImage ("assets/images/demoncatsoldierB.png");
  soldierC = loadImage ("assets/images/demoncatsoldierC.png");
  soldierD = loadImage ("assets/images/demoncat_D.png");
  //Fonts//
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");//https://www.dafont.com/
  minecraftFont = loadFont("assets/fonts/minecraftFont.ttf");//https://www.dafont.com/

  //Collectables//
  coinImage = loadImage("assets/images/coin.png");
  healthImage = loadImage ("assets/images/lifePack.png");
  speedImage = loadImage ("assets/images/speedPack.png");

  //Sounds//
  song = loadSound("assets/sounds/song.mp3");

  // Sound FX //
  coinSound = loadSound("assets/sounds/coinSound.mp3");
  healthSound = loadSound("assets/sounds/healthSound.mp3");
  eatSound = loadSound("assets/sounds/eatSound.mp3");
  hurtSound = loadSound("assets/sounds/hurtSound.mp3");


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

  lifePack = new HealthPack (400,250, 1, healthImage,30);
  speedPack = new SpeedPack (600,250,1,speedImage,30);


  red = new Enemy (415, 1002, 5, redDemonImage, 100);
  green = new Enemy (415, 100, 10, greenDemonImage, 150);
  yellow = new Enemy (415, 100, 15, yellowDemonImage, 125);


  babyRed = new Prey (200,200,5,soldierA,55);
  babyGreen = new Prey (200,400,10,soldierB,55);
  babyYellow = new Prey (200,200,15,soldierC,55);

  // Generates each Prey and puts it in the array
  for (let i = 0; i < numPrey; i++) {
    // Arguments of the Prey constructor
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preySpeed = random(5, 20);
    let preyRadius = 55;
    // New Prey objects with the random values
    prey.push(new Prey(preyX,preyY,preySpeed,soldierD,preyRadius));
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
    background(night);

  if (playing == true){
  angel.display();
  // Handle input for the tiger
  angel.handleInput();

  // Move all the "Cats including HeroCat"
  angel.move();



// Move "Objects"

  lifePack.move();
  speedPack.move();
  // Handle the tiger eating any of the prey





  lifePack.handleEating(angel);
  speedPack.handleEating(angel);

  //Declared variable for Death
  angel.handleDeath();
  lifePack.display();
  speedPack.display();


  checkGameOver();

//lvl 2
    if (angel.eat >= 5) {
      displayInstructionsLevel2();//Declared Variable for Instructions

      green.display();
      red.display();

      red.move();
      green.move();

      angel.handleEating(red);
      angel.handleEating(green);



      babyRed.display();
      babyRed.move();
      babyRed.handleEating(angel);

      prey = [];


      babyGreen.display();
      babyGreen.move();
      babyGreen.handleEating(angel);

    }
else {
  displayInstructionsLevel1();
}
//lvl 3
    if (angel.eat >= 10) {
      displayInstructionsLevel3();
        red.move();
        red.display();
        angel.handleEating(red);

        green.move();
        green.display();
        angel.handleEating(green);

        yellow.move();
        yellow.display();
        angel.handleEating(yellow);

        babyRed.display();
        babyRed.move();
        babyRed.handleEating(angel);

        babyYellow.display();
        babyYellow.move();
        babyYellow.handleEating(angel);
      }

  for (let i = 0; i < prey.length; i++) {
  // And for each one, move it and display it
  prey[i].move();
  prey[i].display();
  prey[i].handleEating(angel);
}

//Display all Objects


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

function resetGame(){
  gameOver = false;
}



function displayInstructionsLevel1(){
  //Black Rectangle
  push();
  fill(0);
  //black border behind text to make it more visible
  rectMode(CENTER);
  rect(400, 43, 650, 75);
  textAlign(CENTER);
  textSize(20);
  textFont(minecraftFont);
  fill(255);
  //Instructions
  text("=====.:A real CATastrophe again:.====== \n Try your BEST to eat \n DEMONCAT SOLDIERS in order to beat Lvl 1", width / 2, 38);
textSize(15);
fill(96, 114, 125);
text ("5 BASIC",570, 58);

pop();

}
function displayInstructionsLevel2(){
  push();
  fill(0);
  //black border behind text to make it more visible
  rectMode(CENTER);
  rect(400, 43, 650, 75);
  textAlign(CENTER);
  textSize(20);
  textFont(minecraftFont);
  fill(255);
  //Instructions
  text("You've CAT to be kidding me!! \n Now you must attempt to eat 5 RED or/and GREEN \n DEMONCAT SOLDIERS in order to beat Lvl 2", width / 2, 38);

textSize(15);

rectMode(CENTER);
fill(0);
rect(398, 95, 300, 25);
textAlign(CENTER);
textSize(20);
fill(255,0,0);
text("BEWARE OF DEMONCATS",width / 2, 115);
textFont(minecraftFont);
pop();
}
function displayInstructionsLevel3(){
  push();
  fill(0);
  //black border behind text to make it more visible
  rectMode(CENTER);
  rect(400, 43, 650, 75);
  textAlign(CENTER);
  textSize(20);
  textFont(minecraftFont);
  fill(255);
  //Instructions
  text("!!!BRACE YOURSELF!!! \n eat at least 5 more RED, YELLOW or/and GREEN \n DEMONCAT SOLDIERS in order to beat the FINAL LEVEL", width / 2, 38);
pop();
}

function displayStartMessage() {
push();
background(54, 54, 54);
textAlign(CENTER,CENTER);
textSize(15);
textFont(minecraftFont);
fill(255);

textSize(25);
text("\n\nDemon Cats have invaded returned \nBIGGER & STRONGER\n We need to bring a stop to their mischief \n before they conquer all of CAT-UNIVERSE.\n\nUSE AWSD to move your PLAYER\n\n\n \n", width / 2, 350);
fill(0);
text("CLICK TO START",width / 2,485);
fill(255);
text("RETURN OF THE",width/2, 545);
textSize(64);
text(".: | DEMONCATS | :.",width/2,600);
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
    textFont(minecraftFont);
    let gameOverText="\n\n\n\n\n\n\n\n\n\n\n\n====. : GAME OVER: .===== \n"
    gameOverText = gameOverText+ "You Haven't EATEN ALL \n the DEMONCAT SOLDIERS... \n THE DEMONCATS HAVE INVADED ALL \n of CAT UNIVERSE";
    text(gameOverText, width / 2, height / 2);
    song.stop();
    pop();
  }
  function displayWinning() { //Game Over Message
      push();
      background(win);
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(45);
      textFont(minecraftFont);
      let gameOverText="\n\n\n\n====. : YOU WIN : .===== \n"
      gameOverText = gameOverText+ "you've eaten ALL 20 \n" + "== DEMONCAT SOLDIERS ==\n now the DEMONCATS \n are obliged to return to \n their EVIL DIMENSION!!";
      text(gameOverText, width / 2, height / 2);
      song.stop();
      pop();
    }

function mousePressed() { //Allows Game to start once Mouse is Pressed
    playing = true;
    gameOver = false;
}
