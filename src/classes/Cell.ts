import { CellType } from "@src/enums";
import Game from "./Game";

class Cell {
  type: CellType;
  x: number;
  y: number;
  id: number;

  constructor(type: CellType, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.id = y * Game.width + x;
  }
}

export default Cell;