import "./styles.css";
import Game from "./game";
import Map from "./map";
import Player from "./player";

import data from "./data";

const newGame = document.querySelector("#newGame");

const map = new Map("#map", 81);

const player1 = new Player(
  "Red Apple",
  '<img src="images/player-1.png" class="player1" />'
).generate();
const player2 = new Player(
  "Green Apple",
  '<img src="images/player-2.png" class="player2" />',
  player1.id
).generate();

const game = new Game([player1, player2]);
newGame.addEventListener("click", () => game.newGame());

// console.log("current player:", game.detectTurn().name);

map.generate();
