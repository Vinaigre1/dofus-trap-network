import { Coordinates, EntityType, SpellTrigger, State, OffensiveStats, Team, DefensiveStats, TriggerType, Buff } from "@src/enums";
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
  initialStates: State;
  triggers: Array<SpellTrigger>;
  health: {
    initial: {
      shield: number;
      max: number;
      current: number;
    };
    shield: number;
    max: number;
    current: number;
  };
  level: number;
  buffs: Array<Buff>;
  offensiveStats: OffensiveStats;
  defensiveStats: DefensiveStats;
  lastDamageTaken: number;

  constructor(pos: Coordinates, team: Team, type: EntityType) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.initialPos = pos;
    this.team = team;
    this.data = Entities[type];
    this.animPos = undefined;
    this.states = 0;
    this.initialStates = this.states;
    this.triggers = [];
    this.health = {
      initial: {
        shield: 0,
        current: 10000,
        max: 10000
      },
      shield: 0,
      current: 10000,
      max: 10000
    };
    this.level = 200; // TODO
    this.buffs = [];
    this.offensiveStats = {
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
      damageSpell: 0,
      damageFinal: 0
    };
    this.defensiveStats = {
      neutral: 0,
      earth: 0,
      water: 0,
      fire: 0,
      air: 0,
      resistanceEarth: 0,
      resistanceWater: 0,
      resistanceFire: 0,
      resistanceAir: 0,
      resistanceNeutral: 0,
      resistancePush: 0,
      resistanceRanged: 0,
      resistanceMelee: 0,
      resistanceSpell: 0
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
    this.states = this.initialStates;
    this.component?.show();
    this.health.current = this.health.initial.current;
    this.health.max = this.health.initial.max;
    this.buffs = [];
    return true;
  }

  /**
   * Removes a state from the entity
   * 
   * @param {State} state State to remove
   */
  removeState(state: State) {
    this.states &= ~state;
    if (!Game.isRunning) {
      this.initialStates &= ~state;
    }
  }

  /**
   * Adds a state to the entity
   * 
   * @param {State} state State to add
   */
  addState(state: State) {
    this.states |= state;
    if (!Game.isRunning) {
      this.initialStates |= state;
    }
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
   * Checks if the entity has a trigger with the given spellId and spellLevel
   * 
   * @param {number} spellId ID of the spell to check
   * @param {number} spellLevel ID of the spellLevel to check
   */
  hasTrigger(spellId: number, spellLevel: number) {
    return this.triggers.some((trigger) => trigger.spellId === spellId && trigger.spellLevel === spellLevel);
  }

  /**
   * Triggers all spells listening to the corresponding trigger
   * 
   * @param {TriggerType} trigger Type of the trigger
   * @param {Trap} originTrap Trap triggering the trigger
   */
  trigger(trigger: TriggerType, originTrap: Trap) {
    for (let i: number = 0; i < this.triggers.length; i++) {
      if (this.triggers[i].triggers.includes(trigger)) {
        Game.executeSpell(SpellData[this.triggers[i].spellId].levels[this.triggers[i].spellLevel], this.pos, this.triggers[i].caster, originTrap);
      }
    }
  }

  /**
   * Removes all triggers with the given spellId and spellLevel
   * 
   * @param {number} spellId ID of the spell to remove from triggers
   * @param {number} spellLevel ID of the spellLevel to remove from triggers
   */
  removeTrigger(spellId: number, spellLevel: number) {
    this.triggers = this.triggers.filter((trigger) => trigger.spellId !== spellId || trigger.spellLevel !== spellLevel);
  }

  /**
   * Reduces the entity's health
   * 
   * @param {number} amount how many health is lost
   */
  loseHealth(amount: number) {
    if (amount < 0) return;

    this.health.current -= amount;
    this.lastDamageTaken = amount;
  }

  /**
   * Increases the entity's health
   * 
   * @param {number} amount how many health is gained
   */
  gainHealth(amount: number) {
    if (amount < 0) return;

    this.health.current += amount;
  }

  /**
   * Adds a buff to the buffs list
   * 
   * @param {Buff} buff Buff to add
   */
  addBuff(buff: Buff) {
    this.buffs.push(buff);
  }

  /**
   * Removes all buffs that have the given spellId
   * 
   * @param spellId spellId of all the buffs to remove
   */
  removeBuff(spellId: number) {
    this.buffs = this.buffs.filter((buff) => buff.spell !== spellId);
  }

  /**
   * Changes the coordinates of the entity
   * 
   * @param {Coordinates} pos Coordinates of the new position
   */
  setPosition(pos: Coordinates) {
    this.initialPos = pos;
    this.pos = pos;
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
      str += this.triggers[i].caster.uuid + "|";
    }
    str += this.initialStates + "|";
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

    const entity = new Entity(_pos, _team, _type);

    for (let i: number = 0; i < _triggersLength; i++) {
      const _trtrLength: number = parseInt(parts[n++]);
      const _trtr: Array<TriggerType> = [];
      for (let j: number = 0; j < _trtrLength; j++) {
        _trtr.push(parseInt(parts[n++]));
      }
      _triggers.push({
        triggers: _trtr,
        spellId: parseInt(parts[n++]),
        spellLevel: parseInt(parts[n++]),
        caster: undefined,
        _casterUuid: parts[n++]
      });
    }

    const _states = parseInt(parts[n++]);

    entity.uuid = _uuid;
    entity.triggers = _triggers;
    entity.initialStates = _states;
    entity.states = _states;
    return entity;
  }
}

export default Entity;