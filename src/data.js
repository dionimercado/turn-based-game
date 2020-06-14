export default {
  players: [
    {
      id: 1,
      name: "Red Apple",
      avatar: '<img src="images/player-1.png" class="player1" />',
      position: {
        col: 0,
        row: 0
      },
      health: 100,
      weapon: {
        image:
          '<img src="images/explodinginktransparent.gif" class="weapon" data-damage="10" alt="Default Weapon" />',
        damage: 10,
        oldWeapon: ""
      },
      shield: true
    },
    {
      id: 2,
      name: "Green Apple",
      avatar:
        '<img src="images/player-2.png" class="player2" alt="Player Two" />',
      position: {
        col: 0,
        row: 0
      },
      health: 100,
      weapon: {
        image:
          '<img src="images/groupwhalkillers.gif" class="weapon bluewhale" data-damage="10" alt="Default Weapon" />',
        damage: 10,
        oldWeapon: ""
      },
      shield: true
    }
  ],
  weapon: [
    '<img src="./images/weapon-1.png" class="Weapon 1" />',
    '<img src="./images/weapon-2.png" class="Weapon 2" />',
    '<img src="./images/weapon-3.png" class="Weapon 3" />'
  ]
};
