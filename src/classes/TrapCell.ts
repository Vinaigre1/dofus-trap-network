import { CellBorders, CellType, Coordinates, TrapType } from "@src/enums";
import Trap from "./Trap";

class TrapCell {
  pos: Coordinates;
  id: number;
  type: TrapType;
  borders: CellBorders;
  trap: Trap;

  constructor(pos: Coordinates, type: TrapType, borders: CellBorders, trap: Trap) {
    this.pos = pos;
    this.type = type;
    this.borders = borders;
    this.trap = trap;
  }
}

export default TrapCell;