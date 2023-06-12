import { Area, Color, Coordinates } from "@src/enums";
import TrapCell from "@classes/TrapCell";
import { getBorders, getCellsInArea, isInArea } from "@src/utils/mapUtils";
import { v4 as uuidv4 } from "uuid";
import TrapComponent from "@components/TrapComponent";
import SpellData from "@json/Spells";
import { colorToInt, intToColor } from "@src/utils/utils";
import Game from "./Game";

class Trap {
  uuid: string;
  pos: Coordinates;
  spellId: number;
  spellLevel: number;
  area: Area;
  casterUuid: string;
  color: Color;
  component: TrapComponent;
  imgComponent: SVGImageElement;
  active: boolean;

  constructor(pos: Coordinates, casterUuid: string, spellId: number, spellLevel: number, area: Area, value: number) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.area = area;
    this.casterUuid = casterUuid;
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

  /**
   * Returns a string representing the trap.
   * 
   * @returns {string} The string representing the trap
   */
  serializeV2(): string {
    let str = "";
    str += this.pos.x + "|" + this.pos.y + "|";
    str += this.spellId + "|";
    str += this.spellLevel + "|";
    str += this.area.min + "|" + this.area.max + "|" + this.area.type + "|";
    str += Game.getEntityIndex(this.casterUuid) + "|";
    str += colorToInt(this.color);
    return str;
  }

  /**
   * Returns a new trap from the serialized string.
   * 
   * @param {Array<string>} splits The next parts of the unserialization
   */
  static unserializeV2(splits: Array<string>): { trap: Trap, caster: number } {
    const _pos: Coordinates = { x: parseInt(splits.shift()), y: parseInt(splits.shift()) };
    const _spellId: number = parseInt(splits.shift());
    const _spellLevel: number = parseInt(splits.shift());
    const _area: Area = { min: parseInt(splits.shift()), max: parseInt(splits.shift()), type: parseInt(splits.shift()) };
    const _casterId: number = parseInt(splits.shift());
    const _value: number = parseInt(splits.shift());

    const _trap = new Trap(_pos, undefined, _spellId, _spellLevel, _area, _value);
    return {
      trap: _trap,
      caster: _casterId
    };
  }

  /**
   * Returns a string representing the trap.
   * 
   * @returns {string} The string representing the trap
   */
  serializeV1(): string {
    let str = "<";
    str += this.pos.x + "|" + this.pos.y + "|";
    str += this.spellId + "|" + this.spellLevel + "|";
    str += this.area.min + "|" + this.area.max + "|" + this.area.type + "|";
    str += this.casterUuid + "|";
    str += colorToInt(this.color) + ">";
    return str;
  }

  /**
   * Returns a new trap from the serialized string.
   * 
   * @param {string} str The string representing the trap
   */
  static unserializeV1(str: string): Trap {
    const parts: Array<string> = str.split("|");
    let n: number = 0;

    const _pos: Coordinates = { x: parseInt(parts[n++]), y: parseInt(parts[n++]) };
    const _spellId: number = parseInt(parts[n++]);
    const _spellLevel: number = parseInt(parts[n++]);
    const _area: Area = { min: parseInt(parts[n++]), max: parseInt(parts[n++]), type: parseInt(parts[n++]) };
    const _caster: string = parts[n++];
    const _value: number = parseInt(parts[n++]);

    const trap = new Trap(_pos, _caster, _spellId, _spellLevel, _area, _value);
    return trap;
  }
}

export default Trap;