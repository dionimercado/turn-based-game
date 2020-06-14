export default class Game {
  constructor(players) {
    this.players = players;
    this.currentPlayer = null;
  }

  newGame() {
    this.reset();

    this.currentPlayer = this.detectTurn();

    this.players.map(player => {
      console.log(player);
      document.querySelector(`aside#player${player.id}`).innerHTML = `
        <div>
          ${player.avatar}
          <h4>${player.name}</h4>
        </div>
        <div class="box">
          <span>${player.health}</span>
          <h4>Health</h4>
        </div>
        <div class="box">
          ${player.weapon.image}
          <span>${player.weapon.damage}</span>
          <h4>Damage</h4>
        </div>
        <div class="box">
          <img src="images/shield.png" alt="Shield" style="margin-bottom: 10px;opacity: ${
            player.shield ? 1 : 0.5
          };" />
          <h4>${
            player.shield
              ? '<span style="color: green">Protected</span>'
              : "Unprotected"
          }</h4>
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
