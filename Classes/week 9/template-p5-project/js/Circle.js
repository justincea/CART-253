class Circle extends Shape {
  constructor(x,y,size,fillColor) {
    super(x,y,size);
    this.fillColor = fillColor; // Unlike a Square, a circle has a specified color
  }
  update() {
    super.update(); // Do the generic Shape update()
    this.size += random(-1,1); // Also jiggle in size
    // Note how we can refer to the size property even though it's
    // only defined and stored in Shape
  }
  display() {
    push();
    ellipseMode(CENTER);
    fill(this.fillColor);
    noStroke();
    ellipse(this.x,this.y,this.size);
    pop();
  }
}
