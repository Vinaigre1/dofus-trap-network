import Entity from "@classes/Entity";
import { CellType, Coordinates, Direction, EffectType, Mask, SpellElement, TargetMask, TriggerType } from "@src/enums";
import { getDirection, moveInDirection } from "@src/utils/mapUtils";
import Game from "@classes/Game";
import ActionComponent from "@components/ActionComponent";
import { v4 as uuidv4 } from "uuid";
import Trap from "./Trap";
import { Effect, SpellLevel } from "@src/@types/SpellDataType";
import SpellData from "@json/Spells";
import { strToMaskArray } from "@src/utils/utils";
import Cell from "./Cell";
import { receiveDamages, sendDamages, receivePushDamages, getBestElement, effectToElement } from "@src/utils/damageUtils";

export default class Action {
  uuid: string;
  caster: Entity;
  target: Entity;
  originPos: Coordinates;
  targetPos: Coordinates;
  type: EffectType;
  value: number;
  effect: Effect;
  component: ActionComponent;
  originTrap?: Trap;
  targetMask?: Array<Mask>;
  passedMask: boolean;
  cancelled: boolean;

  constructor(caster: Entity, target: Entity, originPos: Coordinates, targetPos: Coordinates, type: EffectType, value: number, effect: Effect, originTrap?: Trap, targetMask?: string) {
    this.uuid = uuidv4();
    this.caster = caster;
    this.target = target;
    this.originPos = originPos;
    this.targetPos = targetPos;
    this.type = type;
    this.value = value;
    this.effect = effect;
    this.originTrap = originTrap;
    this.passedMask = true;
    this.cancelled = false;
    this.targetMask = strToMaskArray(targetMask);
  }

  /**
   * Groups the given array of masks in conditional groups
   * 
   * @param {Array<Mask>} masks Array of masks
   * @returns {Array<Array<Mask>>} Masks groupped in conditional groups
   */
  groupMasks(masks: Array<Mask>): Array<Array<Mask>> {
    const EXCLUSIVE_MASKS = ["b", "e", "E", "f", "K", "o", "O", "p", "P", "q", "Q", "r", "R", "T", "U", "v", "V", "W", "z"];
    const INCLUSIVE_MASKS = ["a", "A", "c", "C", "d", "D", "g", "h", "H", "i", "I", "j", "J", "l", "L", "m", "M", "s", "S"];
    const ONE_OF_MASKS = ["B", "F", "Z"];
    const sorted: Array<Array<Mask>> = [[], [], [], []];

    for (let i: number = 0; i < masks.length; i++) {
      if (EXCLUSIVE_MASKS.includes(masks[i].mask)) {
        sorted.push([masks[i]]);
      } else if (INCLUSIVE_MASKS.includes(masks[i].mask)) {
        sorted[0].push(masks[i]);
      } else if (ONE_OF_MASKS.includes(masks[i].mask)) {
        sorted[1 + ONE_OF_MASKS.indexOf(masks[i].mask)].push(masks[i]);
      } else {
        console.error(`Unknown mask: ${masks[i].mask}`);
      }
    }
    return sorted;
  }

  checkEntityMask() {
    if (!this.targetMask || !this.target) return true;

    const masks: Array<Array<Mask>> = this.groupMasks(this.targetMask);

    for (let i: number = 0; i < masks.length; i++) {
      let pass = false;
      for (let j: number = 0; j < masks[i].length; j++) {
        if (this.checkSingleMask(masks[i][j])) {
          pass = true;
        }
      }
      if (!pass && masks[i].length > 0) {
        this.passedMask = false;
        return false;
      }
    }

    this.passedMask = true;
    return true;
  }

  checkSingleMask(mask: Mask): boolean {
    switch (mask.mask) {
      case TargetMask.Ally:
        return this.caster.team === this.target.team;
        break;
      case TargetMask.Enemy:
        return this.caster.team !== this.target.team;
        break;
      case TargetMask.State:
        return this.target.hasState(mask.param);
        break;
      case TargetMask.NotState:
        return !this.target.hasState(mask.param);
        break;
      case TargetMask.LifeAbove:
        return Math.floor(this.target.currentHealth / this.target.health * 100) > mask.param;
        break;
      case TargetMask.NotLifeAbove:
        return Math.floor(this.target.currentHealth / this.target.health * 100) <= mask.param;
        break;
      case TargetMask.CasterEverywhere:
        return true; // TODO
        break;
      default:
        return true; // If mask is unknown, ignore it.
        break;
    }
  }

  /**
   * Applies the action from the caster to the target.
   */
  *apply(_yield: boolean = true) {
    if (this.cancelled) return;

    const actions = {
      [EffectType.Pull]: this.pullAction.bind(this),
      [EffectType.Push]: this.pushAction.bind(this),
      [EffectType.WaterDamage]: this.waterDamageAction.bind(this),
      [EffectType.FireDamage]: this.fireDamageAction.bind(this),
      [EffectType.EarthDamage]: this.earthDamageAction.bind(this),
      [EffectType.AirDamage]: this.airDamageAction.bind(this),
      [EffectType.PushDamage]: this.pushDamageAction.bind(this),
      [EffectType.IndirectPushDamage]: this.indirectPushDamageAction.bind(this),
      [EffectType.MPDamage]: this.MPDamageAction.bind(this),
      [EffectType.PlaceEndTurnGlyph]: this.placeEndTurnGlyphAction.bind(this),
      [EffectType.BoostSpell]: this.boostSpellAction.bind(this),
      [EffectType.HealLastDamage]: this.healLastDamageAction.bind(this),
      [EffectType.PlaceTrap]: this.placeTrapAction.bind(this),
      [EffectType.CreateEntity]: this.createEntityAction.bind(this),
      [EffectType.StartPoint]: this.startPointAction.bind(this),
      [EffectType.Remove]: this.removeAction.bind(this),
      [EffectType.Select]: this.selectAction.bind(this),
      [EffectType.NeutralDamage]: this.neutralDamageAction.bind(this),
      [EffectType.DodgeDamage]: this.dodgeDamageAction.bind(this),
      [EffectType.StealBestElement]: this.stealBestElementAction.bind(this),
      [EffectType.SpellAsTarget]: this.spellAsTargetAction.bind(this),
      [EffectType.SpellAsCaster]: this.spellAsCasterAction.bind(this),
      [EffectType.State]: this.stateAction.bind(this),
      [EffectType.RemoveState]: this.removeStateAction.bind(this),
      [EffectType.CancelSpell]: this.cancelSpellAction.bind(this),
      [EffectType.SymmetricalTeleport]: this.symmetricalTeleportAction.bind(this),
      [EffectType.Toggle]: this.toggleAction.bind(this),
    }

    if (actions[this.type])
      yield* actions[this.type](_yield);
    else
      console.error(`Unknown EffectType: ${this.type}`);
  }

  /**
   * Function executed for the *pull* action.
   * 
   * @param {boolean} _yield `true` if the function should yield a value when an animation should play.
   */
  *pullAction(_yield: boolean) {
    if (!this.target.isMovable()) return;
    this.value = this.value as number;

    const dir: Direction = getDirection(this.targetPos, this.originPos);
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);

    for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
      const nextCell: Coordinates = moveInDirection(this.target.pos, dir, 1);
      if (!Game.isMovementPossible(this.target.pos, nextCell, dir)) break;

      this.target.animPos = nextCell;
      if (_yield) yield this.target; // Yield for animation
      this.target.pos = this.target.animPos;
      this.target.animPos = undefined;

      if (Game.triggerTraps(nextCell)) break;
    }
  }

  /**
   * Function executed for the *push* action.
   * 
   * @param {boolean} _yield `true` if the function should yield a value when an animation should play.
   */
  *pushAction(_yield: boolean) {
    if (!this.target.isMovable()) return;
    this.value = this.value as number;

    const dir: Direction = getDirection(this.originPos, this.targetPos);
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);

    for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
      const nextCell: Coordinates = moveInDirection(this.target.pos, dir, 1);
      if (!Game.isMovementPossible(this.target.pos, nextCell, dir)) {
        if (dir !== Direction.None) {
          Game.addToActionStack(new Action(this.caster, this.target, this.target.pos, nextCell, EffectType.PushDamage, diagonal ? Math.ceil(this.value / 2) * 2 : (this.value - i), this.effect, this.originTrap));
        }
        break;
      }

      this.target.animPos = nextCell;
      if (_yield) yield this.target; // Yield for animation
      this.target.pos = this.target.animPos;
      this.target.animPos = undefined;

      if (Game.triggerTraps(nextCell)) break;
    }
  }

  /**
   * Function executed for the *place trap* action.
   */
  *placeTrapAction() {
    if (Game.getTrap(this.targetPos) !== undefined) return;
    // The following line is a condition used in the real game, but not on the simulator.
    // if (Game.getEntity(this.targetPos) !== undefined) return;

    Game.placeTrap(new Trap(this.targetPos, this.caster.uuid, this.effect.min, this.effect.max, this.effect.area, this.effect.value));
  }

  /**
   * Function executed for the *create entity* action.
   */
  *createEntityAction() {
    if (Game.getEntity(this.targetPos) !== undefined) return;
    // The following line is a condition used in the real game, but not on the simulator.
    // if (Game.getTrap(this.targetPos) !== undefined) return;

    Game.placeEntity(new Entity(this.targetPos, this.effect.min, this.effect.value));
  }

  /**
   * Function executed for the *start point* action.
   */
  *startPointAction() {
    Game.setStartPoint(this.targetPos);
  }

  /**
   * Function executed for the *remove* action.
   */
  *removeAction() {
    if (this.value && Game.getEntity(this.targetPos)
    || !this.value && !Game.getTrap(this.targetPos) && Game.getEntity(this.targetPos)) {
      Game.removeEntity(this.targetPos);
    } else if (Game.getTrap(this.targetPos)) {
      Game.removeTrap(this.targetPos);
    }
  }

  /**
   * Function executed for the *select* action.
   */
  *selectAction() {
    if (this.value && Game.getEntity(this.targetPos)
    || !this.value && !Game.getTrap(this.targetPos) && Game.getEntity(this.targetPos)) {
      Game.selectEntity(this.targetPos);
    } else if (Game.getTrap(this.targetPos)) {
      Game.selectTrap(this.targetPos);
    }
  }

  /**
   * Function executed for the *water damage* action.
   */
  *waterDamageAction() {
    const element = effectToElement(this.effect.effectType);
    const finalValue = receiveDamages(
      sendDamages(
        this.value,
        this.caster,
        this.originPos,
        this.targetPos,
        element,
        this.effect.area.min,
        true // TODO
      ),
      this.caster,
      this.target,
      this.originPos,
      this.targetPos,
      element
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    this.target.trigger(TriggerType.onDamage, this.originTrap);
    this.target.trigger(TriggerType.onTrapDamage, this.originTrap); // TODO: Actually check if this is a trap
  }

  /**
   * Function executed for the *fire damage* action.
   */
  *fireDamageAction() {
    const element = effectToElement(this.effect.effectType);
    const finalValue = receiveDamages(
      sendDamages(
        this.value,
        this.caster,
        this.originPos,
        this.targetPos,
        element,
        this.effect.area.min,
        true // TODO
      ),
      this.caster,
      this.target,
      this.originPos,
      this.targetPos,
      element
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    this.target.trigger(TriggerType.onDamage, this.originTrap);
    this.target.trigger(TriggerType.onTrapDamage, this.originTrap); // TODO: Actually check if this is a trap
  }

  /**
   * Function executed for the *earth damage* action.
   */
  *earthDamageAction() {
    const element = effectToElement(this.effect.effectType);
    const finalValue = receiveDamages(
      sendDamages(
        this.value,
        this.caster,
        this.originPos,
        this.targetPos,
        element,
        this.effect.area.min,
        true // TODO
      ),
      this.caster,
      this.target,
      this.originPos,
      this.targetPos,
      element
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    this.target.trigger(TriggerType.onDamage, this.originTrap);
    this.target.trigger(TriggerType.onTrapDamage, this.originTrap); // TODO: Actually check if this is a trap
  }

  /**
   * Function executed for the *air damage* action.
   */
  *airDamageAction() {
    const element = effectToElement(this.effect.effectType);
    const finalValue = receiveDamages(
      sendDamages(
        this.value,
        this.caster,
        this.originPos,
        this.targetPos,
        element,
        this.effect.area.min,
        true // TODO
      ),
      this.caster,
      this.target,
      this.originPos,
      this.targetPos,
      element
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    this.target.trigger(TriggerType.onTrapDamage, this.originTrap); // TODO: Actually check if this is a trap
    this.target.trigger(TriggerType.onDamage, this.originTrap);
  }

  /**
   * Function executed for the *push damage* action.
   */
  *pushDamageAction() {
    const remainingDistance = this.value;
    const finalValue = receivePushDamages(
      this.value,
      this.caster,
      this.target
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    
    const dir: Direction = getDirection(this.originPos, this.targetPos);
    let indirectPushValue: number = this.value;
    const pushActions: Action[] = [];
    for (let distance: number = 1; distance <= remainingDistance; distance++) {
      const nextCell: Coordinates = moveInDirection(this.originPos, dir, distance, false);
      const indirectTarget: Entity = Game.getEntity(nextCell);
      if (!indirectTarget) break;

      indirectPushValue = Math.floor(indirectPushValue / 2);
      pushActions.unshift(new Action(this.caster, indirectTarget, this.target.pos, indirectTarget.pos, EffectType.IndirectPushDamage, indirectPushValue, this.effect, this.originTrap));
    }
    Game.addToActionStack(...pushActions);
  }

  /**
   * Function executed for the *indirect push damage* action.
   */
  *indirectPushDamageAction() {
    this.target.currentHealth -= this.value;
  }

  /**
   * Function executed for the *MP damage* action.
   */
  *MPDamageAction() {
    console.log('Non-implemented function: mPDamageAction()');
  }

  /**
   * Function executed for the *place end turn glyph* action.
   */
  *placeEndTurnGlyphAction() {
    console.log('Non-implemented function: placeEndTurnGlyphAction()');
  }

  /**
   * Function executed for the *boost spell* action.
   */
  *boostSpellAction() {
    console.log('Non-implemented function: boostSpellAction()');
  }

  /**
   * Function executed for the *heal last damage* action.
   */
  *healLastDamageAction() {
    console.log('Non-implemented function: healLastDamageAction()');
  }

  /**
   * Function executed for the *neutral damage* action.
   */
  *neutralDamageAction() {
    console.log('Non-implemented function: neutralDamageAction()');
  }

  /**
   * Function executed for the *dodge damage* action.
   */
  *dodgeDamageAction() {
    console.log('Non-implemented function: dodgeDamageAction()');
  }

  /**
   * Function executed for the *steal best element* action.
   */
  *stealBestElementAction() {
    const element: SpellElement = getBestElement(this.caster);
    const finalValue = receiveDamages(
      sendDamages(
        this.value,
        this.caster,
        this.originPos,
        this.targetPos,
        element,
        this.effect.area.min,
        true // TODO
      ),
      this.caster,
      this.target,
      this.originPos,
      this.targetPos,
      element
    );
    this.value = Math.max(0, finalValue);
    this.target.currentHealth -= this.value;
    // TODO: heal caster
  }

  /**
   * Function executed for the *spell as target* action.
   */
  *spellAsTargetAction() {
    Game.executeSpell(SpellData[this.effect.min].levels[this.effect.max], this.target.pos, this.target, this.originTrap);
  }

  /**
   * Function executed for the *spell as caster* action.
   */
  *spellAsCasterAction() {
    Game.executeSpell(SpellData[this.effect.min].levels[this.effect.max], this.target.pos, this.caster, this.originTrap);
  }

  /**
   * Function executed for the *state* action.
   */
  *stateAction() {
    this.target.addState(this.effect.min);
  }

  /**
   * Function executed for the *remove state* action.
   */
  *removeStateAction() {
    this.target.removeState(this.effect.min);
  }

  /**
   * Function executed for the *cancel spell* action.
   */
  *cancelSpellAction() {
    console.log('Non-implemented function: cancelSpellAction()');
  }

  /**
   * Function executed for the *symmetrical teleport* action.
   */
  *symmetricalTeleportAction() {
    if (!this.target.isTeleportable()) return;

    const finalPos: Coordinates = { x: this.target.pos.x, y: this.target.pos.y };
    finalPos.y -= 2 * (finalPos.y - this.originPos.y);
    finalPos.x -= 2 * (finalPos.x - this.originPos.x) - (this.originPos.y % 2 - this.target.pos.y % 2);

    const finalCell: Cell = Game.getCell(finalPos);
    const finalPosEntity: Entity = Game.getEntity(finalPos);
    if (finalCell && finalCell.type === CellType.Ground && (!finalPosEntity || finalPosEntity.isTeleportable())) {
      if (finalPosEntity) {
        finalPosEntity.pos = this.target.pos;
        this.target.pos = finalPos;
        for (let i: number = 0; i < Game.actionStack.length; i++) {
          // TODO: using 'originTrap' to check if the effect has the same origin creates a bug where, when a single trap has multiple "symmetrycal teleport" effects, it can delete the wrong one.
          if (Game.actionStack[i].originTrap === this.originTrap && Game.actionStack[i].target === finalPosEntity) {
            Game.actionStack[i].cancelled = true;
            break;
          }
        }
      } else {
        this.target.pos = finalPos;
        Game.triggerTraps(finalPos);
      }
      this.target.pos = finalPos;
    }
  }

  /**
   * Function executed for the *toggle* action.
   * Toggles On and Off a spell; compatible with `EffectType.State` and triggers
   */
  *toggleAction() {
    const spell: SpellLevel = SpellData[this.effect.min].levels[this.effect.max];
    for (let i: number = 0; i < spell.effects.length; i++) {
      if (spell.effects[i].effectType === EffectType.State) {
        if (this.target.hasState(spell.effects[i].min)) {
          this.target.removeState(spell.effects[i].min);
        } else {
          this.target.addState(spell.effects[i].min);
        }
      } else if (spell.effects[i].triggers !== null) {
        if (this.target.hasTrigger(spell.effects[i].min, spell.effects[i].max)) {
          this.target.removeTrigger(spell.effects[i].min, spell.effects[i].max);
        } else {
          this.target.addTrigger({
            triggers: [spell.effects[i].triggers],
            spellId: spell.effects[i].min,
            spellLevel: spell.effects[i].max,
            caster: Game.mainCharacter
          });
        }
      }
    }
  }
}
