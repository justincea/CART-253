// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume coin objects to maintain its health.



class Hero {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius, upKey, downKey,leftKey,rightKey,sprintKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    //Speed Variable
    this.speed = 5;
    this.sprintSpeed = 7;
    this.defaultSpeed = 5;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.01;
    this.healthGainPerEat = 2.5;
    this.healthLossPerTouch= 0.5;
    // Display properties
    this.image = image;
    this.death = false;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = 87;
    this.downKey = 83;
    this.leftKey = 65;
    this.rightKey = 68;
    //
      this.sprintKey = sprintKey;
      this.eat = 0;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    //Sprint Feature
    if (keyIsDown(this.sprintKey)) {
  this.speed = this.sprintSpeed;
  this.health = this.health - 0.5;
  }
    else {
    this.speed = this.defaultSpeed;
    }
}


  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }
handleDeath(){
  if (this.health<=0){
    this.death = true;
  }
}
  // handleEating
  //
  // Takes a Enemy object as an argument and checks if the predator
  // overlaps it. If so, reduces the Enemy's health and increases
  // the predator's. If the Enemy dies, it gets reset.
  handleEating(enemy) {
    // Calculate distance from this predator to the Enemy
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + enemy.radius) {
      // Increase hero health and constrain it to its possible range
      this.health -= this.healthLossPerTouch;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Check if the Enemy died and reset it if so
      if (enemy.health < 0) {
        enemy.reset();
      }
    }
  }




  // display
  //
  // Draw the Hero as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    if(this.radius > 1) {
    image(this.image,this.x, this.y, this.radius * 2,this.radius * 2);
    fill(255);
    textSize(12);
    textFont(minecraftFont);
    text("prey: "+ this.eat,this.x,this.y+50,this.radius*2);
  }
    pop();
  }

}
