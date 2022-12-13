import { AreaType, Coordinates, TrapType } from "@src/enums";
import Effect from "@classes/Effect";
import TrapCell from "@classes/TrapCell";
import { TrapDataType } from "@src/@types/TrapDataType";
import { getBorders, getCellsInArea, isInArea } from "@src/utils/mapUtils";
import Entity from "@classes/Entity";
import { v4 as uuidv4 } from "uuid";

import _TrapData from "@json/Traps.json";
import TrapComponent from "@components/TrapComponent";
const TrapData: TrapDataType = _TrapData as unknown as TrapDataType;

import SpellData from "@json/Spells";

class Trap {
  uuid: string;
  pos: Coordinates;
  type: TrapType;
  effects: Array<Effect>;
  area: AreaType;
  size: number;
  image: string;
  caster: Entity;
  component: TrapComponent;
  imgComponent: SVGImageElement;
  active: boolean;

  constructor(pos: Coordinates, type: TrapType, caster: Entity) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.type = type;
    this.area = TrapData[this.type].area.type;
    this.size = TrapData[this.type].area.size;
    this.image = TrapData[this.type].image;
    this.caster = caster;
    this.component = undefined;
    this.active = true;

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

  /**
   * Returns a new array of TrapCell objects corresponding to
   * all visible cells of the Trap.
   * 
   * @param {boolean} force Force the function to run when the trap is disabled
   * @returns {Array<TrapCell>} List of TrapCell objects
   */
  getTrapCells(force: boolean = false): Array<TrapCell> {
    if (!this.active && !force) return [];

    const trapCells: Array<TrapCell> = [];
    const cells: Array<Coordinates> = getCellsInArea({ x: this.pos.x, y: this.pos.y }, this.area, this.size);

    for (let i = 0; i < cells.length; i++) {
      trapCells.push(new TrapCell(cells[i], this.type, getBorders(this.pos, cells[i], this.area, this.size), this));
    }

    return trapCells;
  }

  isInTrap(pos: Coordinates) {
    if (!this.active) return false;
    return isInArea(pos, this.area, this.pos, this.size);
  }

  enable() {
    this.active = true;
    this.component?.show();
  }

  disable() {
    this.active = false;
    this.component?.hide();
  }

  getSpellIcon(): string {
    for (const type in SpellData) {
      if (SpellData[type].effect?.trap === this.type) {
        return SpellData[type].icon;
      }
    }
  }
}

export default Trap;