import "../css/styles.css";
import Game from "./game";
import Player from "./player";

import { player1, player2 } from "./assets";

const newGame = document.querySelector("#newGame");



Game.map('#map', 81)

newGame.addEventListener("click", () => {

  const playerOne = new Player(
    "Red Apple",
    player1
  ).generate();
  const playerTwo = new Player(
    "Green Apple",
    player2,
    playerOne.id
  ).generate();

  const game = new Game([playerOne, playerTwo]);


  game.newGame()
});

// console.log("current player:", game.detectTurn().name);