import { CellBorders, Color, Coordinates } from "@src/enums";
import Trap from "./Trap";

class TrapCell {
  pos: Coordinates;
  id: number;
  color: Color;
  borders: CellBorders;
  trap: Trap;

  constructor(pos: Coordinates, color: Color, borders: CellBorders, trap: Trap) {
    this.pos = pos;
    this.color = color;
    this.borders = borders;
    this.trap = trap;
  }
}

export default TrapCell;