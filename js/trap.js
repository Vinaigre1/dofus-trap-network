class Trap {
  constructor(trap, cell, caster) {
    this.trap = trap;
    this.cell = cell;
    this.caster = caster;
  }

  isInTrap(id_or_x, y) {
    let x = (y === undefined ? id_or_x % this.width : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / this.width) : y);
    let distance = Map.distance(this.cell.x, this.cell.y, x, y);

    switch (this.trap.area.type) {
      case AREA.CELL:
        return this.cell.x === x && this.cell.y === y;
      case AREA.CROSS:
        return distance.real <= this.trap.area.size && distance.x === distance.y;
      case AREA.CIRCLE:
        return distance.real <= this.trap.area.size;
      case AREA.DIAGONAL:
        return (distance.x === 0 && distance.y <= this.trap.area.size * 2) ||
               (distance.y === 0 && distance.x <= this.trap.area.size * 2);
      case AREA.RING:
        return distance.real === this.trap.area.size;
      default:
        return false;
    }
  }
}