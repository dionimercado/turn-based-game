export default class Player {
  constructor(name, avatar, lastId) {
    this.id = lastId + 1 || 1;
    this.avatar = avatar;
    this.name = name;
  }

  generate() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      position: {
        col: 0,
        row: 0
      },
      health: 100,
      weapon: {
        image:
          '<img src="images/weapon-1.png" class="weapon" data-damage="10" alt="Default Weapon" />',
        damage: 10,
        oldWeapon: ""
      },
      shield: false
    };
  }
}
