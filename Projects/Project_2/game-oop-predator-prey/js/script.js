// Predator-Prey Simulation
// by Justin Cea
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
function preload(){
  holyCat = loadImage("assets/images/holycat.png");
  redDemon = loadImage ("assets/images/demoncat.png");
  yellowDemon = loadImage ("assets/images/demoncat_C.png");
  greenDemon = loadImage ("assets/images/demoncat_B.png")

  night = loadImage("assets/images/sky.png");
}
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  holy = new Predator(250, 250, 5, holyCat, 65, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,16);
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
  holy.handleInput();

  // Move all the "animals"
  holy.move();
  red.move();
  yellow.move();
  green.move();

  // Handle the tiger eating any of the prey
  holy.handleEating(red);
  holy.handleEating(yellow);
  holy.handleEating(green);

  // Display all the "animals"
  holy.display();
  red.display();
  yellow.display();
  green.display();
  }
  else {
    background (night);

    displayStartMessage();
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
