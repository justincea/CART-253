// Predator-Prey Simulation
// by Justin Cea
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
let playing = false;

// Our Hero
let angel;

// The three invaders
let red;
let green;
let yellow;

//Colectable
let coin;

//Music
let song;

//Declared Variables for Images//
let holyCat;
let redDemon;
let yellowDemon;
let greenDemon;
let bling;
//Declared Variable for Font
let goPandaFont;

// setup()
//
function preload(){

  //Characters//
  holyCat = loadImage("assets/images/holycat.png");
  redDemon = loadImage ("assets/images/demoncat.png");
  yellowDemon = loadImage ("assets/images/demoncat_C.png");
  greenDemon = loadImage ("assets/images/demoncat_B.png");

  //Fonts//
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");
  //Collectables//
  bling = loadImage("assets/images/coin.png");
  //Sounds//
  song = loadSound("assets/sounds/song.mp3");
  //Background//
  night = loadImage("assets/images/sky.png");
}
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(800, 750);
  angel = new Hero(250, 250, 5, holyCat, 65, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,16);

  coin = new Coin(500, 500, 1, bling, 75);

  red = new Enemy(100, 100, 15, redDemon, 75);
  yellow = new Enemy(100, 100, 20, yellowDemon, 75);
  green = new Enemy(100, 100, 10, greenDemon, 75);
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

  coin.move();

  // Handle the tiger eating any of the prey
  angel.handleEating(red);
  angel.handleEating(yellow);
  angel.handleEating(green);

  angel.handleEating(coin);
  // Display all the "animals"
  angel.display();
  red.display();
  yellow.display();
  green.display();

  coin.display();

  displayInstructions();

  }
  else {
    background (night);
    displayStartMessage();
  }
}
function displayInstructions(){
  //Black Rectangle
  fill(0);
  rect(0, 0, 1000, 120);

  textAlign(CENTER);
  textSize(25);
  textFont(goPandaFont);
  fill(255);
  //Instructions
  text("Demon Cats are VERY dangerous try to avoid them at ALL COST. \n Try your BEST to collect as many ressources you possibly can", width / 2, 35);
  fill(138, 12, 134);
  text("GOOD LUCK CHIEF!", width / 2, 100);


}
function displayStartMessage() {
push();
textAlign(CENTER,CENTER);
textSize(32);
textFont(goPandaFont);
fill(255);
text("Demon Cats have invaded all of Cat-Universe. \n We need to bring a stop to their mischief \n before they steal all of our valuable resources.\n\n\n CLICK TO START", width / 2, height/2);
pop();
}
function mousePressed() {
    playing = true
    song.loop();

  background(0);
}
