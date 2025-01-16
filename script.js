// Get the square element
const square = document.getElementById('square');

// Set initial position and velocity
let posX = 200;
let posY = 0;
let velocityY = 0;
let isJumping = false;
let isFalling = false;
const gravity = 1;
const jumpStrength = 15;
const moveSpeed = 5;

// Platforms array
const platforms = [
  { x: 50, y: 100, width: 200, height: 20 },
  { x: 300, y: 200, width: 150, height: 20 },
  { x: 500, y: 300, width: 250, height: 20 },
];

// Create platform elements
platforms.forEach(platform => {
  const platformElement = document.createElement('div');
  platformElement.classList.add('platform');
  platformElement.style.left = `${platform.x}px`;
  platformElement.style.bottom = `${platform.y}px`;
  document.body.appendChild(platformElement);
});

// Function to check collision with platforms
function checkPlatformCollision() {
  for (let platform of platforms) {
    if (
      posX + 50 > platform.x &&
      posX < platform.x + platform.width &&
      posY <= platform.y + platform.height &&
      posY + 50 > platform.y
    ) {
      // If the square is falling and hits a platform, reset position and velocity
      if (velocityY >= 0) {
        posY = platform.y + platform.height;
        velocityY = 0;
        isJumping = false;
        isFalling = false;
        return true;
      }
    }
  }
  return false;
}

// Update position and gravity
function updatePosition() {
  // If the square is not on a platform, apply gravity
  if (!checkPlatformCollision()) {
    velocityY += gravity; // Apply gravity
    isFalling = true;
  } else {
    isFalling = false;
  }

  // Update square's position based on velocity
  posY += velocityY;

  // Ensure square stays within bounds
  if (posY < 0) posY = 0;

  square.style.left = `${posX}px`;
  square.style.bottom = `${posY}px`;
}

// Listen for keydown events to move the square
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    posX -= moveSpeed;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    posX += moveSpeed;
  } else if ((e.key === 'ArrowUp' || e.key === 'w') && !isJumping && !isFalling) {
    velocityY = -jumpStrength; // Jump upwards
    isJumping = true;
  }
});

// Game loop
function gameLoop() {
  updatePosition();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
