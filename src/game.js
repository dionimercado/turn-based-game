export default class Game {
  constructor(players) {
    this.players = players;
    this.currentPlayer = null;
  }

  newGame() {
    this.reset();

    this.currentPlayer = this.detectTurn();

    console.log("current player:", this.currentPlayer.name);

    this.players.map(player => {
      document.querySelector(`aside#player${player.id}`).innerHTML = `
        <div>
          ${player.avatar}
          <h4>${player.name}</h4>
        </div>
      `;

      return "";
    });
  }

  reset() {
    console.clear();
  }

  detectTurn() {
    const randomPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];

    document.querySelector("aside.active").classList.remove("active");
    document
      .querySelector(`aside#player${randomPlayer.id}`)
      .classList.add("active");

    return randomPlayer;
  }
}
