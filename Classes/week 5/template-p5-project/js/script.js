"use strict";

/*****************

Week 5 - Class 5
Justin Luc Maxim Cea
******************/

// preload()
//

let music;
let started = false;
function preload() {
  music = new Audio("assets/sounds/bark.wav");
}
function setup() {
  createCanvas(500,500);
}
function draw() {
  background(255);
  if (!started) {
    text("CLICK TO PLAY",0,250);
  }
  else {
    text("THE SOUND OF MUSIC!",0,250);
  }
}
function mousePressed() {
  music.play();
  started = true;
}
