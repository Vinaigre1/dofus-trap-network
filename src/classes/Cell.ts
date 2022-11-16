import { CellType, Coordinates } from "@src/enums";
import Game from "./Game";
import { v4 as uuidv4 } from "uuid";

class Cell {
  uuid: string;
  type: CellType;
  pos: Coordinates;
  id: number;

  constructor(type: CellType, pos: Coordinates) {
    this.uuid = uuidv4();
    this.type = type;
    this.pos = pos;
    this.id = pos.y * Game.width + pos.x;
  }
}

export default Cell;