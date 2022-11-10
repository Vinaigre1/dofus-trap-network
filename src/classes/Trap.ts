import { Area, CellBorders, TrapType } from "@src/enums";
import Effect from "./Effect";
import TrapCell from "./TrapCell";
import { TrapDataType } from "@src/@types/TrapDataType";
import _TrapData from "@json/Traps.json";
const TrapData: TrapDataType = _TrapData as unknown as TrapDataType;

class Trap {
  x: number;
  y: number;
  type: TrapType;
  effects: Array<Effect>;
  area: Area;
  size: number;

  constructor(x: number, y: number, type: TrapType) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.area = TrapData[this.type].area.size;
  }

  getTrapCells(): Array<TrapCell> {
    return [ // WIP
      new TrapCell(this.x - 1, this.y - this.area, this.type, CellBorders.North | CellBorders.West | CellBorders.South),
      new TrapCell(this.x, this.y - 1, this.type, CellBorders.North | CellBorders.West | CellBorders.East),
      new TrapCell(this.x, this.y, this.type, 0),
      new TrapCell(this.x - 1, this.y + 1, this.type, CellBorders.South | CellBorders.East | CellBorders.West),
      new TrapCell(this.x, this.y + 1, this.type, CellBorders.South | CellBorders.East | CellBorders.North)
    ];
  }
}

export default Trap;