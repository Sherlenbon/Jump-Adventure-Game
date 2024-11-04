let isGameRunning = false;
let score = 0;
let isJumping = false;
let doubleJump = false;
let gameLoop;

const startButton = document.getElementById('startButton');
const character = document.getElementById('character');
const scoreDisplay = document.getElementById('score');
const groundObstacle = document.getElementById('groundObstacle');
const flyingObstacle = document.getElementById('flyingObstacle');
const higherFlyingObstacle = document.getElementById('higherFlyingObstacle');

startButton.addEventListener('click', startGame);

function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
  startButton.style.display = 'none';

  gameLoop = setInterval(() => {
    checkCollisions();
    updateScore();
  }, 100);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp') {
    if (!isJumping) {
      isJumping = true;
      character.style.animation = 'jump 0.5s ease';
      setTimeout(() => {
        isJumping = false;
        character.style.animation = '';
      }, 500);
    } else if (!doubleJump) {
      doubleJump = true;
      character.style.animation = 'doublejump 0.5s ease';
      setTimeout(() => {
        doubleJump = false;
        character.style.animation = '';
      }, 500);
    }
  }
});

function updateScore() {
  const characterRect = character.getBoundingClientRect();

  const groundObstacleRect = groundObstacle.getBoundingClientRect();
  if (
    characterRect.right > groundObstacleRect.left &&
    characterRect.left < groundObstacleRect.right &&
    characterRect.bottom > groundObstacleRect.top &&
    characterRect.top < groundObstacleRect.bottom
  ) {
    score += 1;
  }

  const flyingObstacleRect = flyingObstacle.getBoundingClientRect();
  if (
    characterRect.right > flyingObstacleRect.left &&
    characterRect.left < flyingObstacleRect.right &&
    characterRect.bottom > flyingObstacleRect.top &&
    characterRect.top < flyingObstacleRect.bottom
  ) {
    score += 2;
  }

  const higherFlyingObstacleRect = higherFlyingObstacle.getBoundingClientRect();
  if (
    characterRect.right > higherFlyingObstacleRect.left &&
    characterRect.left < higherFlyingObstacleRect.right &&
    characterRect.bottom > higherFlyingObstacleRect.top &&
    characterRect.top < higherFlyingObstacleRect.bottom
  ) {
    score += 3;
  }

  scoreDisplay.innerText = `Score: ${score}`;
}

function checkCollisions() {
  const characterRect = character.getBoundingClientRect();
  const obstacles = [groundObstacle, flyingObstacle, higherFlyingObstacle];

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
      characterRect.right > obstacleRect.left &&
      characterRect.left < obstacleRect.right &&
      characterRect.bottom > obstacleRect.top &&
      characterRect.top < obstacleRect.bottom
    ) {
      endGame();
    }
  });
}

function endGame() {
  isGameRunning = false;
  clearInterval(gameLoop);
  startButton.style.display = 'block';
  startButton.innerText = 'Restart Game';
  alert(`Game Over! Final Score: ${score}`);
}
