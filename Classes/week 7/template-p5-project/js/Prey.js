class Prey {

  constructor(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0
    this.tx = (random,0,100);
    this.ty = (random,0,100);
    this.speed = 5;
    this.fillColor = color(255,0,0);
    this.radius = 100;
    this.maxHealth = 100;
    this.health = 100;
    this.name = name;
}

  move(){
    this.vx = map(noise(this.tx),0,1,-this.speed,this.speed);
    this.vy = map(noise(this.ty),0,1,-this.speed,this.speed);

    this.x += this.vx;
    this.y += this.vy;

    this.tx += 0.01;
    this.ty += 0.01;
}

  handleWrapping(){
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
}

  display(){
    push();
    noStroke();
    fill(this.fillColor,this.health);
    this.radius = this.health;
    ellipse(this.x,this.y,this.radius * 2);
    pop();
}

  reset(){
    this.x = random(0, width);
    this.y = random(0,height);
    this.health = this.maxHealth;
    this.radius = this.health;
}
}
