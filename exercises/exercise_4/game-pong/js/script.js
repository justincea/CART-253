"use strict";

// UnderWater Bubble-Pong
// by Justin Cea
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;


// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 35;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 40,
  vx: 0,
  vy: 0,
  speed: 6.5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40
}

let oceanbg;// Declared Variable for background image
let weirdoceanbg; //Declared Variable for 2nd background image
let bubble;//declared variable for ball

let leftPaddleScore = 0;//Declared Variable to allow the left paddle score to be 0
let rightPaddleScore = 0;//Declared Variable to allow the right paddle score to be 0

let gameOver = false;//declared variable for gameover

let goPandaFont;//declared variable for downloaded font. (https://fontmeme.com/fonts/go-panda-font/)


let bubblePopSFX;//declared variable for sound effect of ball
let waterSong;//declared variable for the song that plays during gameplay
let winSong;//declared variable for winning sound

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  //sounds
  bubblePopSFX = new Audio("assets/sounds/pop.mp3");
  waterSong = new Audio("assets/sounds/song.mp3");
  winSong = new Audio("assets/sounds/music.mp3");

  //backgrounds
  oceanbg = loadImage('assets/images/bg.png');
  weirdoceanbg = loadImage("assets/images/weirdocean.png");
  bubble = loadImage("assets/images/bubble.png");

  //fonts
  goPandaFont = loadFont("assets/fonts/GoPanda.ttf");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);

  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();

  waterSong.play(); //Allows song to play throughout gameplay.

}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
background(oceanbg);// Sets main background

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      //allows a GameOver function to work if a paddle reaches 10 pts.
      if (leftPaddleScore === 10 || rightPaddleScore ===10) {
        gameOver = true;
        playing = false;
      }

      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }


  else {
    // Otherwise we display the message to start the game
    displayStartMessage();
    //allows game over screen to be shown
    if (gameOver == true){
      displayGameOver();
    }
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides

  //keeps track of points of the right paddle
  if (ball.x < 0)  {
    console.log("RightPoints");
    rightPaddleScore += 1;//adds a point to the right paddle for every score they make
    return true;
  }

  //keeps track of points of the left paddle
  else if (ball.x > width){
console.log("LeftPoints");
  leftPaddleScore +=1;//adds a point to the left paddle for every score they make
  return true;
  }
  return false;
}


// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    bubblePopSFX.currentTime = 0;
    bubblePopSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {



    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction

      ball.vx = -ball.vx;
      background(weirdoceanbg);//for every collision the ball makes with a paddle, it hints the SECRET OCEAN

      // Play our bouncing sound effect by rewinding and then playing
      bubblePopSFX.currentTime = 0;
      bubblePopSFX.play();

    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball as a bubble
  push();
  imageMode(CENTER);
  image(bubble,ball.x, ball.y, ball.size, ball.size);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height/2;
  if (random(0,1) < 0.5) {
    ball.vx = ball.speed;
  }
  else {
    ball.vx = -ball.speed;
  }
  ball.vy = random(-5,5);

}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(goPandaFont);
  text("Welcome to Underwater \n Bubble-Pong \n  use AWSD or ARROWKEYS to NAVIGATE\n\n First one to achieve 10 points\n will open the gate to the SECRET OCEAN \n CLICK TO START", width / 2, height / 2);
  pop();
}
//Shows a GameOver message as soon as one of the paddles achieves 10 pts
function displayGameOver(){

  if (leftPaddleScore === 10) {
  push();
  background(weirdoceanbg);
  textAlign(CENTER,CENTER);
  textFont(goPandaFont);
  textSize(32);
  text(".:Game Over:. \n Left Paddle WINS\n and has unlocked the SECRET OCEAN", 320,350);
  waterSong.pause();
  winSong.play();
  pop();
}
  if (rightPaddleScore=== 10){
    push();
    background(weirdoceanbg);
    textAlign(CENTER,CENTER);
    textFont(goPandaFont);
    textSize(32);
    text(".:Game Over:. \n Right Paddle WINS \n and has unlocked the SECRET OCEAN", 320,350);

    waterSong.pause();
    winSong.play();
    pop();
  }
}
// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
  gameOver = false;
}
