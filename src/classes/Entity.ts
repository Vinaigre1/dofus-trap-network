import { Coordinates, EffectType, EntityType, SpellTrigger, State, Stats, Team } from "@src/enums";
import Entities from "@json/Entities";
import EntityComponent from "@components/EntityComponent";
import { v4 as uuidv4 } from "uuid";
import { EntityData } from "@src/@types/EntityDataType";
import Game from "./Game";
import SpellData from "@json/Spells";
import Trap from "./Trap";

class Entity {
  uuid: string;
  pos: Coordinates;
  initialPos: Coordinates;
  team: Team;
  data: EntityData;
  animPos: Coordinates;
  component: EntityComponent;
  states: State;
  triggers: Array<SpellTrigger>;
  stats: Stats;

  constructor(pos: Coordinates, team: Team, type: EntityType) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.initialPos = pos;
    this.team = team;
    this.data = Entities[type];
    this.animPos = undefined;
    this.states = 0;
    this.triggers = [];
    this.stats = {
      vitality: 0,
      strength: 0,
      chance: 0,
      intelligence: 0,
      agility: 0,
      power: 0,
      powerTrap: 0,
      damage: 0,
      damageEarth: 0,
      damageWater: 0,
      damageFire: 0,
      damageAir: 0,
      damageNeutral: 0,
      damagePush: 0,
      damageTrap: 0,
      damageRanged: 0,
      damageMelee: 0,
      damageSpell: 0
    };
  }

  /**
   * Returns true if the entity is movable.
   * 
   * @returns {boolean} true if the entity is movable
   */
  isMovable(): boolean {
    return this.data.movable;
  }

  /**
   * Returns true if the entity is teleportable.
   * 
   * @returns {boolean} true if the entity is teleportable
   */
  isTeleportable(): boolean {
    return !this.hasState(State.Gravity);
  }

  /**
   * Resets the entity values.
   */
  reset() {
    this.pos = this.initialPos;
    this.states = 0;
    this.component?.show();
    return true;
  }

  /**
   * Removes a state from the entity
   * 
   * @param {State} state State to remove
   */
  removeState(state: State) {
    this.states &= ~state;
  }

  /**
   * Adds a state to the entity
   * 
   * @param {State} state State to add
   */
  addState(state: State) {
    this.states |= state;
  }

  /**
   * Checks if the entity has a given state
   * 
   * @param {State} state State to check
   * @returns {boolean} If the entity has the given state
   */
  hasState(state: State): boolean {
    return !!(this.states & state);
  }

  /**
   * Adds a trigger to the triggers list
   * 
   * @param trigger Trigger to add
   */
  addTrigger(trigger: SpellTrigger) {
    this.triggers.push(trigger);
  }

  /**
   * Triggers all spells listening to the corresponding effect
   * 
   * @param {EffectType} effect Type of the effect
   * @param {Trap} originTrap Trap triggering the effect
   */
  trigger(effect: EffectType, originTrap: Trap) {
    for (let i: number = 0; i < this.triggers.length; i++) {
      if (this.triggers[i].triggers.includes(effect)) {
        Game.executeSpell(SpellData[this.triggers[i].spellId].levels[this.triggers[i].spellLevel], this.pos, this, originTrap);
      }
    }
  }

  /**
   * Removes all triggers with the given spellId
   * 
   * @param {number} spellId ID of the spell to remove from triggers
   */
  removeTrigger(spellId: number) {
    this.triggers = this.triggers.filter((trigger) => trigger.spellId !== spellId);
  }

  /**
   * Returns a string representing the entity.
   * 
   * @returns {string} The string representing the entity
   */
  serialize(): string {
    let str: string = "<";
    str += this.uuid + "|";
    str += this.initialPos.x + "|" + this.initialPos.y + "|";
    str += this.team + "|";
    str += this.data.type + "|";
    str += this.triggers.length + "|";
    for (let i: number = 0; i < this.triggers.length; i++) {
      str += this.triggers[i].triggers.length + "|";
      for (let j: number = 0; j < this.triggers[i].triggers.length; j++) {
        str += this.triggers[i].triggers[j] + "|";
      }
      str += this.triggers[i].spellId + "|";
      str += this.triggers[i].spellLevel + "|";
    }
    return str + ">";
  }

  /**
   * Returns a new entity from the serialized string.
   * 
   * @param {string} str The string representing the entity
   */
  static unserialize(str: string): Entity {
    const parts: Array<string> = str.split("|");
    let n: number = 0;

    const _uuid: string = parts[n++];
    const _pos: Coordinates = { x: parseInt(parts[n++]), y: parseInt(parts[n++]) };
    const _team: Team = parseInt(parts[n++]);
    const _type: EntityType = parseInt(parts[n++])
    const _triggersLength: number = parseInt(parts[n++]);
    const _triggers: Array<SpellTrigger> = [];
    for (let i: number = 0; i < _triggersLength; i++) {
      const _trtrLength: number = parseInt(parts[n++]);
      const _trtr: Array<EffectType> = [];
      for (let j: number = 0; j < _trtrLength; j++) {
        _trtr.push(parseInt(parts[n++]));
      }
      _triggers.push({
        triggers: _trtr,
        spellId: parseInt(parts[n++]),
        spellLevel: parseInt(parts[n++])
      });
    }

    const entity = new Entity(_pos, _team, _type);
    entity.uuid = _uuid;
    entity.triggers = _triggers;
    return entity;
  }
}

export default Entity;