import { CellBorders, CellType, TrapType } from "@src/enums";

class TrapCell {
  x: number;
  y: number;
  id: number;
  type: TrapType;
  borders: CellBorders;

  constructor(x: number, y: number, type: TrapType, borders: CellBorders) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.borders = borders;
  }
}

export default TrapCell;