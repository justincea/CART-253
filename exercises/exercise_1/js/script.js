// Exercise 1 - Movement
// Justin Cea
//
// Draws a moving square and circle that intersect
// in the middle of the canvas.


//Determines the size of the face.
let faceSize = 150;


// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The current position and size of the square #2
let rectX;
let rectY;
let rectSize = 100;


// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  // Start the green square off screen to the middle left
  // We divide the size by two because we're drawing from the center
  rectX = -rectSize/2;
  rectY = (250) + rectSize/2;

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;


  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

}

// draw()
function draw() {
  //Makes the variables of the Face follow the Mouse.
  faceX = mouseX;
  faceY = mouseY;
  // We don't fill the background so we get a drawing effect

  //Move rectangle left to right
  rectX += 1;
  // Makes the Rectangle transparent green
  fill(0,255,0,10);
  //display rectangle
  rect(rectX,rectY,rectSize,rectSize);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

//Makes following circle Yellow
  fill (244,232,104,10);
// Displays the Yellow Circle
ellipse(faceX,faceY,faceSize,faceSize);


}
