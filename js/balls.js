var Ball = function(posX,posY,color){
  this.radius = 30;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
}

Ball.prototype.addBall = function(game){
  game.newBall = new Ball(game.board.width / 2, game.board.height - marginBottom , "#3ec6e8");
}

Ball.prototype.renderBall = function(game,delta){
  this.updatePos(game, delta);
  game.board.ctx.beginPath();
  game.board.ctx.fillStyle = this.color;
  game.board.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
  game.board.ctx.fill();

}

Ball.prototype.updatePos = function(game){
  var correctAngle = (this.angle - 90) * Math.PI / 180;
  var bounceAngleX = (this.angle + 90) * Math.PI / 180;

  if (this.mustBounce(game)){
    this.angle = -game.newBall.angle;
    this.posX += (this.speed * Math.cos(bounceAngleX)) / 1000 * delta;
    this.posY += (this.speed * Math.sin(correctAngle)) / 1000 * delta;
  }
  else if (this.mustStop(game)){
    this.speed = 0;
    this.placeBall(this);
    game.topBalls.push(this);
    game.newBall.addBall(game);
  }
  else{
    this.posX += (this.speed * Math.cos(correctAngle)) / 1000 * delta;
    this.posY += (this.speed * Math.sin(correctAngle)) / 1000 * delta;
  }
}

Ball.prototype.mustBounce = function(game){
  return this.posX < 0 + this.radius || this.posX > game.board.width - this.radius;
}

Ball.prototype.mustStop = function(game){
  var ballDistanceY = (game.newBall.radius * Math.sqrt(3)) / 2;
  for (i = 0; i < game.topBalls.length; i++){
    if(this.posY <= game.topBalls[i].posY + ballDistanceY * 2){
      if(this.posX <= game.topBalls[i].posX + 60 && this.posX >= game.topBalls[i].posX - 60){  
        return true;
      }
    }
  }
  if(this.posY < 0 + this.radius){
    return true;
  }
  else{return false;}
}

Ball.prototype.placeBall = function(ball){
  var ballRow = Math.floor(ball.posY/60) + 1;
  var ballDistanceY = (ball.radius * Math.sqrt(3)) / 2;
  ball.posY = (ballDistanceY*2 * ballRow) - ballDistanceY;
  if (ballRow % 2 == 0){
    this.posX = (Math.floor(this.posX/60)) * 60 + 30;
  }
  else{
    this.posX = (Math.floor(this.posX/60)) * 60;
  }
}