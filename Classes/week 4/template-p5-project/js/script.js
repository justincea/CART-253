/*****************

Class - Week 4
Justin Luc Maxim Cea
******************/



let x;
let y;
let tx;
let ty;
function setup() {
  createCanvas(500,500);
  tx = random(0,1000);
  ty = random(0,1000);
}
function draw() {
  background(255);
  x = width * noise(tx);
  y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
  ellipse(x,y,100,35);
}
