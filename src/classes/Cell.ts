import { CellType, Coordinates } from "@src/enums";
import Game from "./Game";

class Cell {
  type: CellType;
  pos: Coordinates;
  id: number;

  constructor(type: CellType, pos: Coordinates) {
    this.type = type;
    this.pos = pos;
    this.id = pos.y * Game.width + pos.x;
  }
}

export default Cell;