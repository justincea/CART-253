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
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Predator(100, 100, 5, color(200, 200, 0), 40);
  player2 = new Predator(100,100,5,color(200,0,0),30);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  player.handleInput();
  player2.handleInput();

  // Move all the "animals"
  player.move();
  player2.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the player 1 eating any of the prey
  player.handleEating(antelope);
  player.handleEating(zebra);
  player.handleEating(bee);

  // Handle the player 2 eating any of the Prey
  player2.handleEating(antelope);
  player2.handleEating(zebra);
  player2.handleEating(bee);

  // Display all the "animals"
  player.display();
  player2.display();
  antelope.display();
  zebra.display();
  bee.display();
}
