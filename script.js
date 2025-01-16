// Get the square element
const square = document.getElementById('square');

// Set initial position and velocity
let posX = 200;
let posY = 0;
let velocityY = 0;
let isJumping = false;

// Square movement speed
const moveSpeed = 5;
const jumpStrength = 15;
const gravity = 1;

// Function to update position
function updatePosition() {
  // Apply gravity
  if (posY > 0 || velocityY < 0) {
    velocityY += gravity; // Gravity pulls the square down
  } else {
    // Reset when it hits the "ground"
    velocityY = 0;
    posY = 0; // Position it on the "floor"
    isJumping = false;
  }

  posY += velocityY;
  square.style.left = `${posX}px`;
  square.style.bottom = `${posY}px`;
}

// Listen for keydown events to move the square
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    posX -= moveSpeed;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    posX += moveSpeed;
  } else if ((e.key === 'ArrowUp' || e.key === 'w') && !isJumping) {
    velocityY = -jumpStrength; // Start jumping with an upward velocity
    isJumping = true;
  }
});

// Update the square's position every frame
function gameLoop() {
  updatePosition();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
