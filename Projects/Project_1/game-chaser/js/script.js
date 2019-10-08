"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;

let playerRadius = 25;

let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 5;
let playerSprintSpeed = 10;
let playerDefaultSpeed = 5;
// Player health
let playerHealth;
let playerMaxHealth = 400;
// Player fill color
let playerFill = 50;


// Prey position, size, velocity
let preyX;
let preyY;

let preySizeX = 50;
let preySizeY = 50;

let preyRadius = 75;

let preyVX;
let preyVY;
let preyMaxSpeed = 10;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
let backimage;
let playerimage;
let preyimage;
let playerCreature;
let preyMeteor;

function preload (){
    backimage = loadImage('assets/images/bg.png');
    playerCreature = loadImage('assets/images/milo.png');
    preyMeteor = loadImage('assets/images/meteor.png');
}

// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 1 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
imageMode(CORNER);
  background(backimage); //draws out background.

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
}
//When SHIFT is held down, the player's speed increases by 10.
    if (keyIsDown(SHIFT)) {
      playerMaxSpeed = playerSprintSpeed;
}
//When SHIFT is held down, the player's health decreases by 5pts.
  if (keyIsDown(SHIFT)) {
  playerMaxHealth = playerMaxHealth -5;

}
//When SHIFT is held down, the player's speed is set back to its initial speed, that being 5.
    else {
      playerMaxSpeed = playerDefaultSpeed;

    }

}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    //Increases size of player when player eats prey.
    playerRadius = playerRadius + 0.5;
    //Player Speed becomes Slower the more it eats.
    playerDefaultSpeed -= 0.05;
    playerSprintSpeed -= 0.05;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = noise(255, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (noise() < 0.05) {

    preyVX = map(noise(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the Star as an ellipse with alpha based on health
function drawPrey() {
  push();
  imageMode(CENTER);
  fill(preyFill, preyHealth);
  image(preyMeteor,preyX, preyY, preyRadius * 1.5,preyRadius * 1.5);
  pop();
}

// drawPlayer()
//
// Draw the player as a Creature with alpha value based on health
function drawPlayer() {
push();
  imageMode(CENTER);
  tint(250,playerFill,playerHealth);
  image(playerCreature,playerX, playerY, playerRadius * 3,playerRadius * 3);
pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = ".:Game Over:.\n"; // \n means "new line"
  gameOverText = gameOverText + "You Swallowed " + preyEaten + " METEORS\n";
  gameOverText = gameOverText + "before you FAINTED."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
