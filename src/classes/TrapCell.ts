import { CellBorders, CellType, Coordinates, TrapType } from "@src/enums";

class TrapCell {
  pos: Coordinates;
  id: number;
  type: TrapType;
  borders: CellBorders;

  constructor(pos: Coordinates, type: TrapType, borders: CellBorders) {
    this.pos = pos;
    this.type = type;
    this.borders = borders;
  }
}

export default TrapCell;