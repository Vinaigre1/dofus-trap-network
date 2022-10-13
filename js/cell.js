class Cell extends Clickable {
  constructor(x, y, w, h, callback, id, type = CELL.WALKABLE) {
    super(x, y, w, h, callback);

    this.id = id;
    this.type = type;
    this.posX = x * CELL_W;
    this.posY = y * CELL_H / 2;
  }

  click(x, y) {
    if (this.type !== CELL.WALKABLE) return false;

    let relX = 2 * Math.abs(x - this.posX - (this.y % 2 === 1 ? this.w : this.w/2)) / this.w;
    let relY = 2 * Math.abs(y - this.posY - this.h/2) / this.h;

    return (relX <= 1 - relY);
  }
}