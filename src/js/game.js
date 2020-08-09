import { shield } from './assets'

export default class Game {
  constructor(players) {
    this.players = players;
    this.currentPlayer = null;
  }

  static map = (node, tiles) => {
    let column = 0;
    let row = 1;

    for (let col = 0; col < tiles; col++) {
      column++;

      document.querySelector(
        node
      ).innerHTML += `<div data-row="${row}" data-col="${column}"></div>`;

      if (column === Math.sqrt(tiles)) {
        row++;
        column = 0;
      }
    }
  }

  newGame() {
    this.reset();

    this.currentPlayer = this.detectTurn();

  }

  reset() {
    this.players.map(player => {
      console.log(player)
      document.querySelector(`#avatar${player.id}`).innerHTML = `
        ${player.avatar}
        <h4>${player.name}</h4>
      `;
      document.querySelector(`#health${player.id}`).innerHTML = `
        <span>${player.health}</span>
        <h4>Health</h4>
      `;
      document.querySelector(`#weapon${player.id}`).innerHTML = `
        ${player.weapon.image}
        <span>${player.weapon.damage}</span>
        <h4>Damage</h4>
      `;
      document.querySelector(`#shield${player.id}`).innerHTML = `
      <img src="${shield}" alt="Shield" />
        <h4>${player.shield ? "Protected" : "Unprotected"}</h4>
      `;
    })
  }

  detectTurn() {
    const randomPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];

    for (const panel of document.querySelectorAll(".panel")) {
      panel.classList.remove("active")
    }

    document
      .querySelector(`aside#player${randomPlayer.id}`)
      .classList.add("active");

    return randomPlayer;
  }
}
