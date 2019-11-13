"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload
let osc;
let frequency = 440;
function setup() {
  createCanvas(500,500);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(frequency);
  osc.amp(1);
  osc.start();
}
function draw() {
  background(0);
}
function keyPressed() {
  frequency += 110;
  osc.freq(frequency);
}
