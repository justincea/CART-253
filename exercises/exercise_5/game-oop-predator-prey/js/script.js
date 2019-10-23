// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let player;
let player2;

// The three prey
let fishA;
let fishB;
let fishC;

let oceanImg;//declared variable for background
let goPandaFont;//declared variable for font

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload(){
  oceanImg = loadImage("assets/images/ocean.png");
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");
}

function setup() {
  createCanvas(700, 500);
  player = new Predator(100, 100, 5, color(30, 104, 230), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,76);
  player2 = new Predator(600,100,5,color(15, 69, 184),40, 87,83,65,68,16);
  fishA = new Prey(100, 100, 10, color(227, 118, 82), 50);
  fishB = new Prey(100, 100, 8, color(217, 208, 78), 60);
  fishC = new Prey(100, 100, 20, color(106, 196, 132), 10);

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(oceanImg);
  displayStartMessage();

  // Handle input for the tiger
  player.handleInput();
  player2.handleInput();

  // Move all the "animals"
  player.move();
  player2.move();
  fishA.move();
  fishB.move();
  fishC.move();

  // Handle the player 1 eating any of the prey
  player.handleEating(fishA);
  player.handleEating(fishB);
  player.handleEating(fishC);

  // Handle the player 2 eating any of the Prey
  player2.handleEating(fishA);
  player2.handleEating(fishB);
  player2.handleEating(fishC);

  // Display all the "animals"
  player.display();
  player2.display();
  fishA.display();
  fishB.display();
  fishC.display();
}
function displayStartMessage() { //Displays Instruction
  push();
  textAlign(CENTER,TOP);
  textSize(36);
  textFont(goPandaFont);
  text("Welcome to UNDERWATER SURVIVAL \n use AWSD to navigate SHARK \n ARROWKEYS to navigate WHALE\n", width / 2, height / 2);
  pop();
}
