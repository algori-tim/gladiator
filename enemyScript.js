var enemyObject = {
  x: 250 - 23,
  y: 40 - 23,
  centerX: 0,
  centerY: 0, 
  healthBarX: 0,
  healthBarY: 0, 
  
  isLookingUp: false,
  isLookingDown: false,
  isLookingLeft: false,
  isLookingRight: false,

  takingDamageCounter: 0,
  health: 20,

  attackTimeer: 0,
  attackCounter: 0,
  attackInRange: false,
  isAttacking: false,
  attackStrength: 2
}

function drawEnemy() {

  var enemyAnimationMod = 0;
  var dummyMoving = false;

  //enemy moving up
  if(enemyCenterY > playerObject.centerY + 10 && enemyObject.isAttacking != true){
    enemyObject.y -= 1;
    dummyMoving = true;
    enemySpriteFrameY = 1;
    enemyLookingUp(enemyObject);
  }
  //enemy moving down
  else if(enemyCenterY + 10 < playerObject.centerY && enemyObject.isAttacking != true){
    enemyObject.y += 1;
    dummyMoving = true;
    enemySpriteFrameY = 0;
    enemyLookingDown(enemyObject);
  }
  //enemy moving left
  else if(enemyCenterX > playerObject.centerX + 10 && enemyObject.isAttacking != true){
    enemyObject.x -= 1;
    dummyMoving = true;
    enemySpriteFrameY = 3;
    enemyLookingLeft(enemyObject);
  }
  //enemy moving right
  else if(enemyCenterX + 10 < playerObject.centerX && enemyObject.isAttacking != true){
    enemyObject.x += 1;
    dummyMoving = true
    enemySpriteFrameY = 2;
    enemyLookingRight(enemyObject);
  }
  else{
    dummyMoving = false;
  }

  if(dummyMoving){
    enemyAnimationCounter += .35;
  }

  enemyAnimationMod = Math.floor(enemyAnimationCounter) % 7;
  
  canvasContext.drawImage(enemySprite,
    (enemyAnimationMod * spriteFrameWidth), (enemySpriteFrameY * spriteFrameHeight),
    spriteFrameWidth, spriteFrameHeight, 
    enemyObject.x, enemyObject.y,
    46, 46);

}

function checkForEnemyAttackInRange() {
  
  if(enemyObject.isLookingUp){
    if(enemyCenterY - playerObject.centerY < 15 && enemyCenterY - playerObject.centerY > 5 && Math.abs(enemyCenterX - playerObject.centerX) < 12){
      enemyAttackInRange()
    }
    
  }
  
  if(enemyObject.isLookingDown){
    if(playerObject.centerY - enemyCenterY < 15 && playerObject.centerY - enemyCenterY > 5 && Math.abs(enemyCenterX - playerObject.centerX) < 12){
      enemyAttackInRange()
    }
   
  }
  
  if(enemyObject.isLookingLeft){
    if(enemyCenterX - playerObject.centerX  < 15 && enemyCenterX - playerObject.centerX > 5 && Math.abs(enemyCenterY - playerObject.centerY) < 12){
      enemyAttackInRange()
    }
    
  }
  
  if(enemyObject.isLookingRight){
    if(playerObject.centerX - enemyCenterX < 15 && playerObject.centerX - enemyCenterX > 5 && Math.abs(enemyCenterY - playerObject.centerY) < 12){
      enemyAttackInRange()
    }
    
  }
}

function checkForEnemyHitPlayer(){
  if(enemyAttackInRange){
    playerObject.takingDamageCounter += 1;

    if(playerObject.takingDamageCounter < 2){
      playerObject.health -= enemyObject.attackStrength;

    }
  }
}

function enemyAttackInRange(){
  enemyAttackPointCounter += .25;
  enemyObject.attackInRange = true;
  enemyAttackPoint = enemyAttackPointSetter;
}


function enemyAttack() {
  enemyObject.isAttacking = true;
  
  if(enemyObject.attackCounter == 0){
    enemySpriteFrameY = 0;
  }

  if(enemyObject.isLookingUp){
    enemySpriteFrameY = 5;
  }
  
  if(enemyObject.isLookingDown){
    enemySpriteFrameY = 4;
  }
  
  if(enemyObject.isLookingLeft){
    enemySpriteFrameY = 7;
  }
  
  if(enemyObject.isLookingRight){
    enemySpriteFrameY = 6;
  }
  
}

function enemyLookingUp(enemy){
  enemy.isLookingUp = true;
  enemy.isLookingDown = false;
  enemy.isLookingLeft = false;
  enemy.isLookingRight = false;
}

function enemyLookingDown(enemy){
  enemy.isLookingUp = false;
  enemy.isLookingDown = true;
  enemy.isLookingLeft = false;
  enemy.isLookingRight = false;
}

function enemyLookingLeft(enemy){
  enemy.isLookingUp = false;
  enemy.isLookingDown = false;
  enemy.isLookingLeft = true;
  enemy.isLookingRight = false;
}

function enemyLookingRight(enemy){
  enemy.isLookingUp = false;
  enemy.isLookingDown = false;
  enemy.isLookingLeft = false;
  enemy.isLookingRight = true;
}