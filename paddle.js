const paddle = function(colour, side, playerControlled = true) {

    // attributes
    this.vel = createVector(0,0);
    this.size = createVector(width / 30, height / 5);
    this.isPlayer = playerControlled;
    this.colour = colour;

    // set pos
    this.pos = side == "left" ? 
        createVector(0 , height / 2 - this.size.y /2) : 
        createVector(width - this.size.x, height / 2 - this.size.y /2);

    this.bounce = function() {
        // top
        if (this.pos.y <= 0 && this.vel.y < 0) 
            this.vel.y *=-.9;

        // bottom
        else if(this.pos.y >= (height - this.size.y) && this.vel.y > 0) 
            this.vel.y *=-.9;
    
    }
    this.update = function() {

        
        if (this.isPlayer) {
            if (wDown) 
                this.vel.y -= .4;
            if (sDown) 
                this.vel.y += .4;
        } else {
            var inc = 0;
            if (ball.vel.x < 0) {
                inc = ((height/2) - (this.pos.y + this.size.y/2));
            } else {
                inc = (ball.pos.y - (this.pos.y + this.size.y/2));

            }
            var max = .13;
            inc = (inc < -max) ? -max : (inc > max) ? max : inc;
            this.vel.y += inc;
            //this.vel.y = .01;
            if (this.vel.y < -7) this.vel.y = -7;
            if (this.vel.y > 7) this.vel.y = 7;
        }
        
        this.bounce();

        // change pos
        this.pos.y += this.vel.y;

        // drag
        this.vel.y *= .95;
        
    }

    this.draw = function() {
        
        fill(this.colour);
        noStroke();
        rect(this.pos.x, this.pos.y,  this.size.x, this.size.y);
    
    } 

    this.intersectingWith = function(other) {
        if (this.pos.x + this.size.x < other.pos.x) return false;
        if (this.pos.y + this.size.y < other.pos.y) return false;
        if (other.pos.x + other.size.x < this.pos.x) return false;
        if (other.pos.y + other.size.y < this.pos.y) return false;

        return true;
        
    }
}
