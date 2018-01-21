window.onload = function(){
  var game = new PuzzleGame();
  //game.startGame();
  setInterval(function(){game.renderGame(game)},20);
  game.startGame()

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: // izquierda
        game.thrower.move(game.board,-3);
        break;
      case 39: // derecha
        game.thrower.move(game.board,3);
        break;
    }
  };

  document.onkeyup = function(e) {
    //this.thrower.stop();
  };
};
