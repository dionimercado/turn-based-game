export default class Map {
  constructor(node, tiles) {
    this.node = node;
    this.tiles = tiles;
  }

  generate() {
    const columns = this.tiles / this.tiles;
    console.log(columns);

    let column = 0;
    let row = 1;

    for (let col = 0; col < this.tiles; col++) {
      column++;

      document.querySelector(
        this.node
      ).innerHTML += `<div data-row="${row}" data-col="${column}"></div>`;

      if (column === Math.sqrt(this.tiles)) {
        row++;
        column = 0;
      }
    }
  }
}
