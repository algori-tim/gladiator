var canvas = document.getElementById("myCanvas");
var canvasContext = canvas.getContext("2d");

var enemySprite = new Image();
enemySprite.src = "./images/enemySpriteSheet.png";

var playerSpriteSheet = new Image();
playerSpriteSheet.src = "./images/playerSpriteSheet.png";

var text = "";

var dummyDead = false;

var enemyAttackStrength = 0;
var dummiesKilled = 0;

var spriteFrameWidth = 46;
var spriteFrameHeight = 46;

var playerSpriteFrameY = 0;
var enemySpriteFrameY = 0;

var playerAnimationCounter = 0;
var enemyAnimationCounter = 0;

var enemyAttackPointSetter = Math.floor(Math.random() * 13);
var enemyAttackPoint = 0;
var enemyAttackPointCounter = 0;

var dummyDeathCounter = 0;

var attackStopCount = 7;

//main game loop refreshed in the setInterval() function at end of script
function draw() {
  enemyCenterX = enemyObject.x + 23;
  enemyCenterY = enemyObject.y + 23;

  enemyObject.healthBarX = enemyObject.x;
  enemyObject.healthBarY = enemyObject.y - 10;

  playerObject.centerX = playerObject.x + 23;
  playerObject.centerY = playerObject.y + 23;

  //clears canvas on each frame
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  checkPlayerBounderies();

  if (enemyCenterY < playerObject.centerY) {
    drawEnemy();
    drawPlayer();
  } else {
    drawPlayer();
    drawEnemy();
  }

  drawStats();

  if (playerObject.isAttacking) {
    playerObject.stillAttacking = true;
    playerAnimationCounter += 0.5;

    if (playerAnimationCounter > 4.5) {
      checkForPlayerHitEnemy();
    }

    if (playerAnimationCounter > attackStopCount) {
      playerObject.isAttacking = false;
      enemyObject.takingDamageCounter = 0;
      playerObject.stillAttacking = false;
    }
  }

  if (dummyDead) {
    enemyObject.health = 20;
    enemyObject.x = 250 - 23;
    enemyObject.y = 40 - 23;

    dummyDead = false;
    dummiesKilled += 1;
    playerObject.health += 0.5;
  }

  checkForEnemyAttackInRange();

  if (
    enemyObject.attackInRange &&
    enemyObject.isAttacking == false &&
    enemyAttackPointCounter > enemyAttackPointSetter
  ) {
    enemyAnimationCounter = 0;
    enemyAttack();
  }

  if (enemyObject.isAttacking) {
    enemyAnimationCounter += 0.35;
    enemyObject.attackCounter += 1;

    if (enemyAnimationCounter > 4.5) {
      checkForEnemyHitPlayer();
    }

    if (enemyAnimationCounter > attackStopCount) {
      enemyAttackPointCounter = 0;
      enemyAttackPointSetter = Math.floor(Math.random() * 15);
      enemyObject.isAttacking = false;
      playerObject.takingDamageCounter = 0;
      enemyObject.attackCounter = 0;
      playerObject.takingDamageCounter = 0;
    }
  }

  if (playerObject.health < 1) {
    console.log("DEAD");
    alert(
      "You seem to have died... You have slain " + dummiesKilled + " warriors!"
    );
    playerObject.health = 1;
    document.location.href = "index.html";
  }

  //DEBUG code
  // document.getElementById("dummyHealth").innerHTML =
  //   "Dummy Health: " + enemyObject.health;
  // document.getElementById("playerHealth").innerHTML =
  //   "Player Health: " + playerObject.health;
  // document.getElementById("dummiesKilled").innerHTML =
  //   "Dummies Killed " + dummiesKilled;

  // if (enemyObject.isLookingUp) text = "Up";
  // if (enemyObject.isLookingDown) text = "Down";
  // if (enemyObject.isLookingLeft) text = "Left";
  // if (enemyObject.isLookingRight) text = "Right";

  // document.getElementById("text").innerHTML = "Enemy looking..." + text;
  // document.getElementById("enemyX").innerHTML =
  //   "Enemy X: " + Math.floor(enemyCenterX);
  // document.getElementById("enemyY").innerHTML =
  //   "Enemy Y: " + Math.floor(enemyCenterY);
  // document.getElementById("playerX").innerHTML =
  //   "Player X: " + Math.floor(playerObject.centerX);
  // document.getElementById("playerY").innerHTML =
  //   "Player Y: " + Math.floor(playerObject.centerY);
  // document.getElementById("attackSetter").innerHTML =
  //   "AttackSetter: " + enemyAttackPointSetter;
} //end of game loop draw()

//drawing health bars and kill count
function drawStats() {
  canvasContext.beginPath();
  canvasContext.font = "25px Times";
  canvasContext.fillText("Your Health...", 15, 32);
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.font = "25px Times";
  canvasContext.fillText("Kills..." + dummiesKilled, 385, 32);
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.rect(20, 35, 125, 10);
  canvasContext.fillRect(20, 35, playerObject.health * 5, 10);
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(
    enemyObject.healthBarX + 13,
    enemyObject.healthBarY,
    enemyObject.health,
    6
  );
  canvasContext.stroke();
}

//declaring event listeners for keyboard input
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//event handler for pressing a key
function keyDownHandler(e) {
  //player holding up key
  if (e.keyCode == 38) {
    playerObject.isMovingUp = true;
    playerSpriteFrameY = 1;

    playerLookingUp(playerObject);
  }
  //player holding down key
  if (e.keyCode == 40) {
    playerObject.isMovingDown = true;
    playerSpriteFrameY = 0;

    playerLookingDown(playerObject);
  }
  //player holding left key
  if (e.keyCode == 37) {
    playerObject.isMovingLeft = true;
    playerSpriteFrameY = 3;

    playerLookingLeft(playerObject);
  }
  //player holding right key
  if (e.keyCode == 39) {
    playerObject.isMovingRight = true;
    playerSpriteFrameY = 2;

    playerLookingRight(playerObject);
  }

  //player press space bar
  if (e.keyCode == 32) {
    playerObject.isAttacking = true;

    if (!playerObject.stillAttacking) {
      playerAnimationCounter = 0;

      if (playerObject.isLookingUp) {
        playerSpriteFrameY = 5;
      }

      if (playerObject.isLookingDown) {
        playerSpriteFrameY = 4;
      }

      if (playerObject.isLookingLeft) {
        playerSpriteFrameY = 7;
      }

      if (playerObject.isLookingRight) {
        playerSpriteFrameY = 6;
      }
    }
  }
}

//event handler for releasing a key
function keyUpHandler(e) {
  //player release up key
  if (e.keyCode == 38) {
    playerObject.isMovingUp = false;
  }
  //player release down key
  if (e.keyCode == 40) {
    playerObject.isMovingDown = false;
  }
  //player release left key
  if (e.keyCode == 37) {
    playerObject.isMovingLeft = false;
  }
  //player release right key
  if (e.keyCode == 39) {
    playerObject.isMovingRight = false;
  }

  if (e.keyCode == 32) {
    // attack = false;
  }
}

//function for refreshing screen
setInterval(draw, 30);
