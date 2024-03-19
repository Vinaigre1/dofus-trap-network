import { Coordinates, EntityType, SpellTrigger, State, OffensiveStats, Team, DefensiveStats, TriggerType, Buff } from "@src/enums";
import Entities from "@json/Entities";
import EntityComponent from "@components/EntityComponent";
import { v4 as uuidv4 } from "uuid";
import { EntityData } from "@src/@types/EntityDataType";
import Game from "./Game";
import SpellData from "@json/Spells";
import Trap from "./Trap";
import { BuffType } from "@src/enums";

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
      resistanceSpell: 0,
      damageSustained: 100,
      erosion: 10
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
    this.health.shield = this.health.initial.shield;
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
  loseHealth(amount: number, erodedAmount?: number) {
    this.lastDamageTaken = amount;
    if (amount < 0) return;

    const shieldDamage = Math.min(amount, this.health.shield);

    this.health.shield -= shieldDamage;
    this.health.current -= amount - shieldDamage;
    this.health.max -= Math.floor((erodedAmount ?? amount) * this.defensiveStats.erosion / 100);
    if (this.health.current > this.health.max) {
      this.health.current = this.health.max;
    }
  }

  /**
   * Increases the entity's health
   * 
   * @param {number} amount how many health is gained
   */
  gainHealth(amount: number): boolean {
    if (amount < 0) return false;

    if (this.health.current < this.health.max) {
      this.health.current += amount;
      return true;
    }

    this.health.current += amount;
    return false;
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
  serializeV2(): string {
    let str: string = "";
    str += this.initialPos.x + "|" + this.initialPos.y + "|";
    str += this.team + "|";
    str += this.data.type + "|";
    str += this.initialStates + "|";
    str += this.triggers.length + "|";
    for (let i: number = 0; i < this.triggers.length; i++) {
      str += this.triggers[i].triggers.length + "|";
      for (let j: number = 0; j < this.triggers[i].triggers.length; j++) {
        str += this.triggers[i].triggers[j] + "|";
      }
      str += this.triggers[i].spellId + "|";
      str += this.triggers[i].spellLevel + "|";
      str += Game.getEntityIndex(this.triggers[i].caster?.uuid) + "|";
    }
    str += this.health.initial.shield + "|";
    str += this.health.initial.max + "|";
    str += this.health.initial.current + "|";
    str += this.level + "|";
    str += this.buffs.length + "|";
    for (let i = 0; i < this.buffs.length; i++) {
      str += this.buffs[i].spell + "|";
      str += this.buffs[i].type + "|";
      str += this.buffs[i].params.length + "|";
      for (let j = 0; j < this.buffs[i].params.length; j++) {
        str += this.buffs[i].params[j] + "|";
      }
    }
    str += this.offensiveStats.vitality + "|";
    str += this.offensiveStats.strength + "|";
    str += this.offensiveStats.chance + "|";
    str += this.offensiveStats.intelligence + "|";
    str += this.offensiveStats.agility + "|";
    str += this.offensiveStats.power + "|";
    str += this.offensiveStats.powerTrap + "|";
    str += this.offensiveStats.damage + "|";
    str += this.offensiveStats.damageEarth + "|";
    str += this.offensiveStats.damageWater + "|";
    str += this.offensiveStats.damageFire + "|";
    str += this.offensiveStats.damageAir + "|";
    str += this.offensiveStats.damageNeutral + "|";
    str += this.offensiveStats.damagePush + "|";
    str += this.offensiveStats.damageTrap + "|";
    str += this.offensiveStats.damageRanged + "|";
    str += this.offensiveStats.damageMelee + "|";
    str += this.offensiveStats.damageSpell + "|";
    str += this.offensiveStats.damageFinal + "|";
    str += this.defensiveStats.neutral + "|";
    str += this.defensiveStats.earth + "|";
    str += this.defensiveStats.water + "|";
    str += this.defensiveStats.fire + "|";
    str += this.defensiveStats.air + "|";
    str += this.defensiveStats.resistanceEarth + "|";
    str += this.defensiveStats.resistanceWater + "|";
    str += this.defensiveStats.resistanceFire + "|";
    str += this.defensiveStats.resistanceAir + "|";
    str += this.defensiveStats.resistanceNeutral + "|";
    str += this.defensiveStats.resistancePush + "|";
    str += this.defensiveStats.resistanceRanged + "|";
    str += this.defensiveStats.resistanceMelee + "|";
    str += this.defensiveStats.resistanceSpell + "|";
    str += this.defensiveStats.damageSustained + "|";
    str += this.defensiveStats.erosion;
    return str;
  }

  /**
   * Returns a new entity from the serialized string.
   * 
   * @param {Array<string>} splits The next parts of the unserialization
   */
  static unserializeV2(splits: Array<string>): Entity {
    const _pos: Coordinates = {
      x: parseInt(splits.shift()),
      y: parseInt(splits.shift())
    };
    const _team: Team = parseInt(splits.shift());
    const _type: EntityType = parseInt(splits.shift());
    const _states: State = parseInt(splits.shift());
    const _triggersLength: number = parseInt(splits.shift());
    const _triggers: Array<SpellTrigger> = [];
    for (let i: number = 0; i < _triggersLength; i++) {
      const _triggersTriggersLength: number = parseInt(splits.shift());
      const _triggersTriggers: Array<TriggerType> = [];
      for (let j: number = 0; j < _triggersTriggersLength; j++) {
        _triggersTriggers.push(parseInt(splits.shift()));
      }
      _triggers.push({
        triggers: _triggersTriggers,
        spellId: parseInt(splits.shift()),
        spellLevel: parseInt(splits.shift()),
        caster: undefined,
        _casterId: splits.shift()
      });
    }
    const _shield: number = parseInt(splits.shift());
    const _hpMax: number = parseInt(splits.shift());
    const _hp: number = parseInt(splits.shift());
    const _level: number = parseInt(splits.shift());
    const _buffsLength: number = parseInt(splits.shift());
    const _buffs: Array<Buff> = [];
    for (let i = 0; i < _buffsLength; i++) {
      const _buffSpell: number = parseInt(splits.shift());
      const _buffType: BuffType = parseInt(splits.shift());
      const _buffsParamsLength: number = parseInt(splits.shift());
      const _buffsParams: Array<number> = [];
      for (let j = 0; j < _buffsParamsLength; j++) {
        _buffsParams.push(parseInt(splits.shift()));
      }
      _buffs.push({
        spell: _buffSpell,
        type: _buffType,
        params: _buffsParams
      });
    }
    const _offensiveStats: OffensiveStats = {
      vitality: parseInt(splits.shift()),
      strength: parseInt(splits.shift()),
      chance: parseInt(splits.shift()),
      intelligence: parseInt(splits.shift()),
      agility: parseInt(splits.shift()),
      power: parseInt(splits.shift()),
      powerTrap: parseInt(splits.shift()),
      damage: parseInt(splits.shift()),
      damageEarth: parseInt(splits.shift()),
      damageWater: parseInt(splits.shift()),
      damageFire: parseInt(splits.shift()),
      damageAir: parseInt(splits.shift()),
      damageNeutral: parseInt(splits.shift()),
      damagePush: parseInt(splits.shift()),
      damageTrap: parseInt(splits.shift()),
      damageRanged: parseInt(splits.shift()),
      damageMelee: parseInt(splits.shift()),
      damageSpell: parseInt(splits.shift()),
      damageFinal: parseInt(splits.shift())
    };
    const _defensiveStats: DefensiveStats = {
      neutral: parseInt(splits.shift()),
      earth: parseInt(splits.shift()),
      water: parseInt(splits.shift()),
      fire: parseInt(splits.shift()),
      air: parseInt(splits.shift()),
      resistanceEarth: parseInt(splits.shift()),
      resistanceWater: parseInt(splits.shift()),
      resistanceFire: parseInt(splits.shift()),
      resistanceAir: parseInt(splits.shift()),
      resistanceNeutral: parseInt(splits.shift()),
      resistancePush: parseInt(splits.shift()),
      resistanceRanged: parseInt(splits.shift()),
      resistanceMelee: parseInt(splits.shift()),
      resistanceSpell: parseInt(splits.shift()),
      damageSustained: parseInt(splits.shift()),
      erosion: parseInt(splits.shift())
    }

    const _entity = new Entity(_pos, _team, _type);
    _entity.states = _states;
    _entity.initialStates = _states;
    _entity.triggers = _triggers;
    _entity.health = {
      initial: {
        shield: _shield,
        max: _hpMax,
        current: _hp
      },
      shield: _shield,
      max: _hpMax,
      current: _hp
    };
    _entity.level = _level;
    _entity.buffs = _buffs;
    _entity.offensiveStats = _offensiveStats;
    _entity.defensiveStats = _defensiveStats;
    return _entity;
  }

  /**
   * Returns a string representing the entity.
   * 
   * @returns {string} The string representing the entity
   */
  serializeV1(): string {
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
  static unserializeV1(str: string): Entity {
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
        _casterId: parts[n++]
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