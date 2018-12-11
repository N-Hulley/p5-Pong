const Ball = function(colour) {

    // attributes
    this.vel = createVector((random(0, 1) < .5) ? 3 : -3 ,random(-3, 3));
    this.size = width >= height ? 
        createVector(width/15, width/15) : 
        createVector(height/15, height/15) ;

    this.colour = colour;

    // set pos
    this.pos = createVector(width/2, height/2);
    
    this.bounce = function() {
        // top
        if (this.pos.y - this.size.y / 2 <= 0 && this.vel.y < 0) 
            this.vel.y *=-1;

        // bottom
        else if(this.pos.y >= (height - this.size.y/2) && this.vel.y > 0) 
            this.vel.y *=-1;
        
        if (this.pos.x > width || this.pos.x < 0) playing = false;
    }

    this.update = function() {
        
        this.bounce();

        // change pos
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;

        // Detect collision with player
        if (this.intersectingWith(left)) {
            if (this.vel.x < 0) {
                this.vel.y = (this.pos.y - (left.pos.y + left.size.y/2)) * .08;
                this.vel.x *= -1;
                this.vel.x += this.vel.x > 0 ? -.1 : .1;
            }
        }
        if (this.intersectingWith(right)) {
            if (this.vel.x > 0) {
                this.vel.y = (this.pos.y - (right.pos.y + right.size.y/2)) * .08;
                this.vel.x *= -1;
                this.vel.x += this.vel.x < 0 ? -.1 : .1;
            }
        }
    }

    this.draw = function() {
        
        colorMode(HSB, 255);
        fill(this.colour);
        noStroke();
        ellipse(this.pos.x, this.pos.y,  this.size.x, this.size.y);
        
    } 

    this.intersectingWith = function(rect) {

        //https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
        var circleDistance = createVector(0, 0);
        
        circleDistance.x = abs(this.pos.x - (rect.pos.x + rect.size.x /2));
        circleDistance.y = abs(this.pos.y - (rect.pos.y + rect.size.y /2));

        if (circleDistance.x > (rect.size.x/2 + (this.size.x/2))) { return false; }
        if (circleDistance.y > (rect.size.y/2 + (this.size.x/2))) { return false; }

        if (circleDistance.x <= (rect.size.x/2)) { return true; } 
        if (circleDistance.y <= (rect.size.y/2)) { return true; }

        var cornerDistance_sq = (circleDistance.x - rect.size.x/2)^2 +
                                (circleDistance.y - rect.size.y/2)^2;

        return (cornerDistance_sq <= ((this.size.x/2)^2));

        return true;
        
    }
}
