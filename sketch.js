var paddleColour;

// Paddles
var left;
var right;

// ball
var ball;

// Inputs
var sDown = false;
var wDown = false;

function setup() {
  
  createCanvas(600,400);

  // Make paddles
  paddleColour = color(255);
  left = new paddle(paddleColour, "left", true );
  right = new paddle(paddleColour, "right", false );

  // Make ball
  ball = new Ball(paddleColour);
  
}
var playing = true;
function draw() {

  if (playing) {
    sDown = keyIsDown(83);
    wDown = keyIsDown(87);  
    colorMode(HSB, 255);
    background(frameCount/10%255,255, 125);    
  
    left.colour = color(frameCount / 10 % 255, 50, 255);
    right.colour = color(frameCount / 10 % 255 , 50, 255);
    
    colorMode(HSB, 100);
    ball.colour = color(frameCount % 100,50, 255);
    
    ball.update();
    left.update();
    right.update();

    ball.draw();
    left.draw();
    right.draw();      
  }

}