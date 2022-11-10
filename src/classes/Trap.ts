import { Area, CellBorders, Coordinates, TrapType } from "@src/enums";
import Effect from "./Effect";
import TrapCell from "./TrapCell";
import { TrapDataType } from "@src/@types/TrapDataType";
import _TrapData from "@json/Traps.json";
import { getBorders, getCellsInArea } from "@src/utils/mapUtils";
const TrapData: TrapDataType = _TrapData as unknown as TrapDataType;

class Trap {
  pos: Coordinates;
  type: TrapType;
  effects: Array<Effect>;
  area: Area;
  size: number;

  constructor(pos: Coordinates, type: TrapType) {
    this.pos = pos;
    this.type = type;
    this.area = TrapData[this.type].area.type;
    this.size = TrapData[this.type].area.size;

    this.effects = [];
    for (let i = 0; i < TrapData[this.type].effects.length; i++) {
      this.effects.push(new Effect(
        TrapData[this.type].effects[i].type,
        TrapData[this.type].effects[i].area.type,
        TrapData[this.type].effects[i].area.size,
        TrapData[this.type].effects[i].value.min,
        TrapData[this.type].effects[i].value.max
      ));
    }
  }

  getTrapCells(): Array<TrapCell> {
    let trapCells: Array<TrapCell> = [];
    const cells: Array<Coordinates> = getCellsInArea({ x: this.pos.x, y: this.pos.y }, this.area, this.size);

    for (let i = 0; i < cells.length; i++) {
      trapCells.push(new TrapCell(cells[i], this.type, getBorders(this.pos, cells[i], this.area, this.size)));
    }

    console.log(trapCells);
    return trapCells;
  }
}

export default Trap;