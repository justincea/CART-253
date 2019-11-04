// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
let playing = false;
// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(30, 104, 230), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,16);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
    background(0);
    
    displayStartMessage();

  if (playing == true){

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  }
}

function displayStartMessage() {
push();
textAlign(CENTER,CENTER);
textSize(32);
fill(255,0,0);
text("Welcome \n  use AWSD or ARROWKEYS to NAVIGATE\n\n First one to achieve 10 points WINS \n CLICK TO START", width / 2, height / 2);
pop();
}
function mousePressed() {
  playing = true;
  background(0);
}
