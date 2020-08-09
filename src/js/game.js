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


  newGame = () => {
    this.reset();

    for (let i = 0; i < 15; i++) {
      this.placeItem(`<img src="${obstacle}" alt="" />`, 'obstacle');
    }

    weapons.map((weapon, i) => this.placeItem(`<img src="${weapon}" alt="" data-damage="${i > 1 ? i * 10 : 10}" />`, 'weapon'));

    this.players.map((player) => this.placeItem(player, 'player'))

    this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    this.detectTurn()

  }

  reset() {

    // Clean map tiles
    for (const item of this.gridSquares) {
      item.innerHTML = '' // remove elements inside a of a tile
      item.removeAttribute('class'); // remove all classes of a tile
    }

    // Reset players panels
    this.players.map(player => {

      document.querySelector(`#player${player.id}`).classList.remove("active")

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
    });


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
    const { row, col } = this.currentPlayer.location;


    const element = (direction, num) => {
      switch (direction) {
        case "north":
          return document.querySelector(`[data-row="${row - num}"][data-col="${col}"]`);
        case "south":
          return document.querySelector(`[data-row="${Number(row) + num}"][data-col="${col}"]`);
        case "west":
          return document.querySelector(`[data-row="${row}"][data-col="${Number(col) - num}"]`);
        case "east":
          return document.querySelector(`[data-row="${row}"][data-col="${Number(col) + num}"]`);
        default:
          break;
      }
    }


    const availability = (direction) => {

      const move1 = element(direction, 1);
      const move2 = element(direction, 2);
      const move3 = element(direction, 3);


      if (!move1) return;
      if (move1.classList.contains('obstacle') || move1.classList.contains('player')) return;
      move1.classList.add('highlight');
      move1.addEventListener('click', e => this.movePlayer(e, move1));

      if (!move2) return;
      if (move2.classList.contains('obstacle') || move2.classList.contains('player')) return;
      move2.classList.add('highlight');
      move2.addEventListener('click', e => this.movePlayer(e, move2));

      if (!move3) return;
      if (move3.classList.contains('obstacle') || move3.classList.contains('player')) return;
      move3.classList.add('highlight');
      move3.addEventListener('click', e => this.movePlayer(e, move3));


    }


    availability('north');
    availability('south');
    availability('west');
    availability('east');



  }

  movePlayer = (e, move) => {
    console.log({ e, move })
    const { row, col } = e.target.dataset;
    const oldPos = document.querySelector(`[data-row="${this.players[this.currentPlayer.id - 1].location.row}"][data-col="${this.players[this.currentPlayer.id - 1].location.col}"]`)

    oldPos.innerHTML = '';
    e.target.innerHTML = this.currentPlayer.avatar;
    this.players[this.currentPlayer.id - 1].location = { row, col };

    for (const elm of document.querySelectorAll('.highlight')) {
      elm.classList.remove('highlight');
      elm.removeEventListener('click', this.movePlayer)
    }

    this.changeTurn()
  }

  detectTurn = () => {

    console.log('detectTurn()', this.currentPlayer.id)
    console.log(document
      .querySelector(`#player${this.currentPlayer.id}`))
    document
      .querySelector(`#player${this.currentPlayer.id}`)
      .classList.add("active");

    this.movesHihglights();

  }

  changeTurn = () => {

    for (const panel of document.querySelectorAll(".panel")) {
      panel.classList.remove("active")
    }

    switch (true) {
      case this.currentPlayer.id === 1:
        this.currentPlayer = this.players[1];
        break;

      case this.currentPlayer.id === 2:
        this.currentPlayer = this.players[0];
        break;

      default:
        break;
    }


    setTimeout(this.detectTurn, 500);


  }
}
