// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.image = image;
    this.radius = this.health;

  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
      this.vx = -7, -this.speed, this.speed;
      // Update position
      this.x += this.vx;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
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

  handleEating(hero){ //Once Hero and Prey overlap Hero obtains a short boost
    let d = dist(this.x,this.y, hero.x, hero.y);
    if (d < this.radius + hero.radius){
      hero.health += hero.healthGainPerEat;//Heals the Hero Cat Significantly
      hero.health = constrain(hero.health, 0, hero.maxHealth);
      this.health -= hero.healthGainPerEat;
        if (this.health < 1) {
          hero.eat=hero.eat +1; //Declared Variable for the num of Prey Eaten
          eatSound.play(); //  Allows Sound FX to play when Hero eats a prey
          console.log();
          this.reset();
          if (hero.eat>=15){ //Declares when the Game Ends as soon as hero eats 15 Preys
            playing = false;
            winning = true;
            displayWinning(); //Displays Winning Screen
          }
    }
  }
}
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    imageMode(CENTER);
    this.radius = this.health;
    image(this.image,this.x, this.y, this.radius * 2,this.radius * 2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
