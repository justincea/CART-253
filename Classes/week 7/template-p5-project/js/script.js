"use strict";

/*****************
Justin Cea
Week 7

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

let tiger;
let predator;
let zebra;


  function setup() {
    createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100,100,5,color(255,0,0), 50);
  zebra = new Prey(0, 0, 5, color(255,0,0), 25);

  }



// draw()
//
// Description of draw()

  function draw() {
    background(0);

 tiger.handleInput();
 tiger.move();
 tiger.display();
 tiger.handleEating(zebra);

 zebra.display();
 zebra.move();
  }
