"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let catchPhrases = [
  "I'll be back.",
  "It's not a tumor!",
  "Let off some steam, Bennett.",
  "Get to the chopper!"
];
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Go through all the phrases in the array one by one
  // and print them somewhere random
  // Each time through the loop i will have the index
  // for one of the catch phrases
  for (let i = 0; i < catchPhrases.length; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let phrase = catchPhrases[i];
    textSize(64);
    textAlign(CENTER, CENTER);
    text(phrase, x, y);
  }
}
