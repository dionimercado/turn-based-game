import { shield, obstacle, weapons } from './assets'

export default class Game {
  constructor(players) {
    this.gridSquares = document.querySelectorAll('#map>div');
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

    for (let i = 0; i < 15; i++) {
      this.placeItem(`<img src="${obstacle}" alt="" />`, 'obstacle');
    }

    weapons.map((weapon, i) => this.placeItem(`<img src="${weapon}" alt="" data-damage="${i > 1 ? i * 10 : 10}" />`, 'weapon'));

    this.players.map((player) => this.placeItem(player, 'player'))

    // console.log('obstacles:', document.querySelectorAll('.obstacle').length)
    // console.log('players:', document.querySelectorAll('.player').length)
    // console.log('weapons:', document.querySelectorAll('.weapon').length)
  }

  reset() {

    // Clean map tiles
    for (const item of this.gridSquares) {
      item.innerHTML = '' // remove elements inside a of a tile
      item.removeAttribute('class'); // remove all classes of a tile
    }

    // Reset players panels
    this.players.map(player => {

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

  placeItem = (item, type) => {
    const randomSquare = Math.floor(Math.random() * this.gridSquares.length);
    const { row, col } = this.gridSquares[randomSquare].dataset

    const cList = this.gridSquares[randomSquare].classList;



    if (!cList.contains('player') && !cList.contains('obstacle') && !cList.contains('weapon')) {

      if (type === 'player') {
        this.players[item.id - 1].location = { row, col };
        this.gridSquares[randomSquare].innerHTML = item.avatar;
        this.gridSquares[randomSquare].classList.add(type);
      } else {
        this.gridSquares[randomSquare].innerHTML = item;
        this.gridSquares[randomSquare].classList.add(type);
      }


    } else {
      this.placeItem(item, type)
    }

  }

  movesHihglights = () => {

  }

  detectTurn() {
    const randomPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];



    for (const panel of document.querySelectorAll(".panel")) {
      panel.classList.remove("active")
    }

    document
      .querySelector(`#player${randomPlayer.id}`)
      .classList.add("active");

    return randomPlayer;
  }
}
