// Exercise 0 - Spiritual Self-Portrait
// Justin Cea

function setup() {

  // Set up the canvas and give it a nice pink colour

createCanvas(500,500);
background(242,193,31);

// giving the piece a simplified face
noStroke();
// skin.
fill(237,192,152);
//colors mouth
noStroke(0);
// easier allignment
ellipseMode(CENTER);
// head
ellipse(250,250,200,200);
// black eyes
fill(0);
ellipse(200,250,20,20);
ellipse(300,250,20,20);
// mouth
rectMode(CENTER);
fill(0);
rect(200,243,35,5);
rect(300,243,35,5);

//glasses
rectMode(CENTER);
fill(100);
rect(200,225,80,5);
rect(300,225,80,5);
rect(160,250,5,55);
rect(340,250,5,55);
rect(302,275,80,5);
rect(198,275,80,5);
rect(240,250,5,55);
rect(260,250,5,55);



}


function draw() {

}
