import { CellType } from "@src/enums";

class Cell {
  type: CellType;

  constructor(type: CellType) {
    this.type = type;
  }
}

export default Cell;