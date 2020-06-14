import "./styles.css";
import Game from "./game";
import Map from "./map";
import data from "./data";

const newGame = document.querySelector("#newGame");

const map = new Map("#map", 100);

const game = new Game(data.players);
newGame.addEventListener("click", () => {
  game.newGame();
});

// console.log("current player:", game.detectTurn().name);

map.generate();
