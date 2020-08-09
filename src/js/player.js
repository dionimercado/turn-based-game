import { weapons } from "./assets";

export default class Player {
  constructor(name, avatar, lastId = 0) {
    this.id = lastId + 1;
    this.avatar = avatar;
    this.name = name;
  }

  generate() {
    return {
      id: this.id,
      name: this.name,
      avatar: `<img src="${this.avatar}" class="player${this.id}" />`,
      position: {
        col: 0,
        row: 0
      },
      health: 100,
      weapon: {
        image:
          `<img src="${weapons[0]}" class="weapon" data-damage="10" alt="Default Weapon" />`,
        damage: 10,
        oldWeapon: ""
      },
      shield: false
    };
  }
}
