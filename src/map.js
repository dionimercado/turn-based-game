export default class Map {
  constructor(node, tiles) {
    this.node = node;
    this.tiles = tiles;
  }

  generate() {
    let column = 0;
    let row = 1;

    for (let col = 0; col < this.tiles; col++) {
      column++;

      document.querySelector(
        this.node
      ).innerHTML += `<div data-row="${row}" data-col="${column}"></div>`;

      if (column === 9) {
        row++;
        column = 0;
      }
    }
  }
}
