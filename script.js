// Get the square and platform elements
const square = document.getElementById('square');
const platform = document.getElementById('platform');

// Set initial position and velocity
let posX = 200; // Starting X position of the square
let posY = 0;   // Starting Y position of the square (top of the screen)
let velocityY = 0;  // Vertical speed (for gravity and jumping)
let isJumping = false;
const gravity = 0.8;  // Gravity force
const jumpStrength = 15;  // Jump force
const moveSpeed = 5;  // Horizontal movement speed

// Platform position (1/4th up the screen)
const platformY = window.innerHeight / 4;

// Update platform position
platform.style.bottom = `${platformY}px`;

// Update square position based on X and Y
function updatePosition() {
    // Apply gravity if the square is not on the platform
    if (posY > platformY + 20 || velocityY > 0) {
        velocityY += gravity;  // Gravity pulls the square down
    } else {
        // If the square reaches the platform, stop it there
        posY = platformY + 20;
        velocityY = 0;
        isJumping = false;
    }

    // Update square position
    square.style.left = `${posX}px`;
    square.style.bottom = `${posY}px`;
}

// Listen for keydown events to move the square
let moveLeft = false;
let moveRight = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft = true; // Move left
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight = true; // Move right
    } else if ((e.key === 'ArrowUp' || e.key === 'w') && !isJumping) {
        velocityY = -jumpStrength; // Jump upwards
        isJumping = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft = false; // Stop moving left
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight = false; // Stop moving right
    }
});

// Game loop to constantly update position
function gameLoop() {
    if (moveLeft) posX -= moveSpeed; // Move left
    if (moveRight) posX += moveSpeed; // Move right

    updatePosition();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

