var playerObject = {
  x: canvas.width / 2 - 23,
  y: canvas.height / 2 - 23,
  centerX: this.x - 23,
  centerY: this.y - 23,
  
  isMovingUp: false,
  isMovingDown: false,
  isMovingLeft: false,
  isMovingRight: false,

  isLookingUp: false,
  isLookingDown: true,
  isLookingLeft: false,
  isLookingRight: false,
  
  takingDamageCounter: 0,
  health: 25,

  isAttacking: false,
  stillAttacking: false,
  attackStrength: 0
}

function drawPlayer() {
  var anumationMod = 0;

  //checking for "movement" of player to initiate animation frames
  if(playerObject.isMovingUp || playerObject.isMovingDown || playerObject.isMovingLeft || playerObject.isMovingRight){
    playerAnimationCounter += .5;
  } 
  
  anumationMod = Math.floor(playerAnimationCounter) % 7;

  canvasContext.drawImage(playerSpriteSheet,
    (anumationMod * spriteFrameWidth), (playerSpriteFrameY * spriteFrameHeight),
    spriteFrameWidth, spriteFrameHeight,
    playerObject.x, playerObject.y,
    46, 46);
    
}

function checkPlayerBounderies(){
  if(playerObject.isMovingRight && playerObject.x < canvas.clientWidth - 51){
    playerObject.x += 6;
  }
  
  //setting left outer boundary for player
  if(playerObject.isMovingLeft && playerObject.x > 5) {
        playerObject.x -= 6;      
  }
  
  //setting bottom outer boundary for player
  if(playerObject.isMovingDown && playerObject.y < canvas.clientHeight - 61){
    playerObject.y += 6;
  }
  
  //setting top outer boundary for player
  if(playerObject.isMovingUp && playerObject.y > 16){
    playerObject.y -= 6; 
  }
}

function checkForPlayerHitEnemy(){
  var attackInRange = false;
  
  if(playerObject.isLookingUp){
    if(playerObject.centerY - enemyCenterY < 15 && playerObject.centerY - enemyCenterY > 5 && Math.abs(enemyCenterX - playerObject.centerX) < 12){
      attackInRange = true;
      enemyObject.takingDamageCounter += 1;
    }
  }
  
  if(playerObject.isLookingDown){
    if(enemyCenterY - playerObject.centerY < 15 && enemyCenterY - playerObject.centerY > 5 && Math.abs(enemyCenterX - playerObject.centerX) < 12){
      attackInRange = true;
      enemyObject.takingDamageCounter += 1;
    }
  }
  
  if(playerObject.isLookingLeft){
    if(playerObject.centerX - enemyCenterX < 15 && playerObject.centerX - enemyCenterX > 5 && Math.abs(enemyCenterY - playerObject.centerY) < 12){
      attackInRange = true;
      enemyObject.takingDamageCounter += 1;
    }
  }
  
  if(playerObject.isLookingRight){
    if(enemyCenterX - playerObject.centerX  < 15 && enemyCenterX - playerObject.centerX > 5 && Math.abs(enemyCenterY - playerObject.centerY) < 12){
      attackInRange = true;
      enemyObject.takingDamageCounter += 1;
    }
  }
  
  if(attackInRange){
     
    playerObject.attackStrength = Math.floor(Math.random() * 5) + 2;

    if(enemyObject.takingDamageCounter < 2){
      enemyObject.health -= playerObject.attackStrength;
    }

    if(enemyObject.health < 0){
      dummyDead = true;
    }
  }

}

function playerLookingUp(player){
  player.isLookingUp = true;
  player.isLookingDown = false;
  player.isLookingLeft = false;
  player.isLookingRight = false;
}

function playerLookingDown(player){
  player.isLookingUp = false;
  player.isLookingDown = true;
  player.isLookingLeft = false;
  player.isLookingRight = false;
}

function playerLookingLeft(player){
  player.isLookingUp = false;
  player.isLookingDown = false;
  player.isLookingLeft = true;
  player.isLookingRight = false;
}

function playerLookingRight(player){
  player.isLookingUp = false;
  player.isLookingDown = false;
  player.isLookingLeft = false;
  player.isLookingRight = true;
}