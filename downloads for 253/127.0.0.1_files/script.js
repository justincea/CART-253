/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

let x;
let y;
let vx = 0;
let vy = 0;
let speed = 2;
function setup() {
  createCanvas(500,500);
  x = width/2;
  y = height/2;
}
function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    vx = -speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    vx = speed;
  }
  else {
    vx = 0;
  }
  if (keyIsDown(UP_ARROW)) {
    vy = -speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    vy = speed;
  }
  x = x + vx;
  y = y + vy;
  rect(x,y,20,20);
}
