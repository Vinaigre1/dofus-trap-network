class Cell {
  constructor(id, x, y, type = CELL.WALKABLE) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
  }
}