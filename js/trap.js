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

  getBorders(id_or_x, y, no_check = true) {
    if (!no_check && !this.isInTrap(id_or_x, y)) return 0;

    let x = (y === undefined ? id_or_x % this.width : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / this.width) : y);
    let distance = Map.distance(this.cell.x, this.cell.y, x, y);

    let borders = 0;
    if (this.trap.area.size === 0) borders |= CELL_BORDER.NORTH | CELL_BORDER.EAST | CELL_BORDER.SOUTH | CELL_BORDER.WEST;

    switch (this.trap.area.type) {
      case AREA.CELL:
      case AREA.DIAGONAL:
      case AREA.RING:
        borders |= CELL_BORDER.NORTH | CELL_BORDER.EAST | CELL_BORDER.SOUTH | CELL_BORDER.WEST;
        break;
      case AREA.CROSS:
        if (distance.real === 0) break;
        if (distance.relative.x < 0 === distance.relative.y < 0) borders |= CELL_BORDER.NORTH | CELL_BORDER.SOUTH;
        else borders |= CELL_BORDER.EAST | CELL_BORDER.WEST;
        if (distance.relative.x > 0 && distance.relative.y < 0 && distance.real === this.trap.area.size) borders |= CELL_BORDER.NORTH;
        if (distance.relative.x > 0 && distance.relative.y > 0 && distance.real === this.trap.area.size) borders |= CELL_BORDER.EAST;
        if (distance.relative.x < 0 && distance.relative.y > 0 && distance.real === this.trap.area.size) borders |= CELL_BORDER.SOUTH;
        if (distance.relative.x < 0 && distance.relative.y < 0 && distance.real === this.trap.area.size) borders |= CELL_BORDER.WEST;
        break;
      case AREA.CIRCLE:
        if (distance.real < this.trap.area.size) break;
        if (distance.relative.x === this.trap.area.size)  borders |= CELL_BORDER.NORTH | CELL_BORDER.EAST;
        if (distance.relative.y === this.trap.area.size)  borders |= CELL_BORDER.SOUTH | CELL_BORDER.EAST;
        if (distance.relative.x === -this.trap.area.size) borders |= CELL_BORDER.SOUTH | CELL_BORDER.WEST;
        if (distance.relative.y === -this.trap.area.size) borders |= CELL_BORDER.NORTH | CELL_BORDER.WEST;
        break;
      default:
        break;
    }
    return borders;
  }
}