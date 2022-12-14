import { Area, Color, Coordinates } from "@src/enums";
import TrapCell from "@classes/TrapCell";
import { getBorders, getCellsInArea, isInArea } from "@src/utils/mapUtils";
import Entity from "@classes/Entity";
import { v4 as uuidv4 } from "uuid";
import TrapComponent from "@components/TrapComponent";
import SpellData from "@json/Spells";
import { intToColor } from "@src/utils/utils";

class Trap {
  uuid: string;
  pos: Coordinates;
  spellId: number;
  spellLevel: number;
  area: Area;
  caster: Entity;
  color: Color;
  component: TrapComponent;
  imgComponent: SVGImageElement;
  active: boolean;

  constructor(pos: Coordinates, caster: Entity, spellId: number, spellLevel: number, area: Area, value: number) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.area = area;
    this.caster = caster;
    this.spellId = spellId;
    this.spellLevel = spellLevel;
    this.color = intToColor(value);
    this.component = undefined;
    this.active = true;
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
    const cells: Array<Coordinates> = getCellsInArea({ x: this.pos.x, y: this.pos.y }, this.area);

    for (let i = 0; i < cells.length; i++) {
      trapCells.push(new TrapCell(cells[i], this.color, getBorders(this.pos, cells[i], this.area), this));
    }

    return trapCells;
  }

  isInTrap(pos: Coordinates) {
    if (!this.active) return false;
    return isInArea(pos, this.area, this.pos);
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
    return SpellData[this.spellId].icon;
  }
}

export default Trap;