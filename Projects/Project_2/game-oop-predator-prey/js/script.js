// Predator-Prey Simulation
// by Justin Cea
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
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

let numPrey = 3;
let prey = [];

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
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");
  minecraftFont = loadFont("assets/fonts/minecraftFont.ttf");
  //Collectables//
  coinImage = loadImage("assets/images/coin.png");
  healthImage = loadImage ("assets/images/lifePack.png");
  //Sounds//
  song = loadSound("assets/sounds/song.mp3");

  coinSound = loadSound("assets/sounds/coinSound.mp3");
  healthSound = loadSound("assets/sounds/healthSound.mp3");



  //Background//
  night = loadImage("assets/images/sky.png");
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

  // Run a for loop numPrey times to generate each Prey and put it in the array
  for (let i = 0; i < numPrey; i++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preySpeed = random(2, 20);
    let preyRadius = 25;
    // Create a new Prey objects with the random values
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

  // Move all the "animals"
  angel.move();

  red.move();
  yellow.move();
  green.move();
  blue.move();

  coin.move();
  lifePack.move();

  // Handle the tiger eating any of the prey
  angel.handleEating(red);
  angel.handleEating(yellow);
  angel.handleEating(green);
  angel.handleEating(blue);

  coin.handleEating(angel);
  lifePack.handleEating(angel);
  //
  angel.handleDeath();
  checkGameOver();
  // Display all the "animals"
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

  coin.display();
  lifePack.display();

  displayInstructions();

  }
  else {

    if (gameOver ==true){
      displayGameOver();
    }
    else{
    background (night);
    displayStartMessage();
    }
  }
}
function displayInstructions(){
  //Black Rectangle
  fill(0);
  rect(0, 0, 1000, 120);

  textAlign(CENTER);
  textSize(20);
  textFont(minecraftFont);
  fill(255);
  //Instructions
  text("=====.:A real CATastrophe:.====== \n oh my. . .Demon Cats are taking over our LANDS. \n Try your BEST to collect at least 9 coins", width / 2, 38);
  fill(138, 12, 134);
  text("GOOD LUCK CHIEF!", width / 2, 115);
  textSize(10);
  fill(255);
  text(" TIP:  HOLYCATS give you a short Speed-Boost",150,107);
  text(" TIP:  Use HEALTHPACKs to help you survive",645,107);



}
function displayStartMessage() {
push();
background(frontimage);
textAlign(CENTER,CENTER);
textSize(25);
textFont(minecraftFont);
fill(255);
text(".:you:.",383,230);
text("Demon Cats have invaded all of Cat-Universe. \n We need to bring a stop to their mischief \n before they steal all of our valuable resources.\n\n\n", width / 2, height/2);
fill(0);
text("CLICK TO START",width / 2, 430);
fill(255);
text("beware of",width/2, 485);
textSize(64);
text(".: | DEMONCATS | :.",width/2,545);
pop();
}

function checkGameOver() {
  if (angel.death === true) {
    gameOver = true;
    playing = false;
  }
}
function displayGameOver() {
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(49);
    let gameOverText="====. : GAME OVER: .===== \n"
    gameOverText = gameOverText+ "you've collected \n" +"======  " + coin.eat + " COINS  =======\n just enough to BRIBE \n the DEMONCATS back to \n their EVIL DIMENSION";

    text(gameOverText, width / 2, height / 2);
    song.stop();
    pop();
  }
function mousePressed() {
    playing = true;
    gameOver = false;
    song.loop();
}
