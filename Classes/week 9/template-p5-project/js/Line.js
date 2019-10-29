class Line extends Shape{

  constructor(x,y) {
    this.x = x;
    this.y = y;

  }

  update() {
    this.x += random(-1,1);
    this.y += random(-1,1);
  }
  display() {

  }
}
