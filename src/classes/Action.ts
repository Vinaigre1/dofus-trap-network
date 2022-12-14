import Entity from "@classes/Entity";
import { Coordinates, Direction, EffectType } from "@src/enums";
import { getDirection, moveInDirection } from "@src/utils/mapUtils";
import Game from "@classes/Game";
import ActionComponent from "@components/ActionComponent";
import { v4 as uuidv4 } from "uuid";
import Trap from "./Trap";
import { Effect } from "@src/@types/SpellDataType";
import SpellData from "@json/Spells";

export default class Action {
  uuid: string;
  originEntity: Entity;
  targetEntity: Entity;
  originPos: Coordinates;
  targetPos: Coordinates;
  type: EffectType;
  value: number;
  effect: Effect;
  component: ActionComponent;
  originTrap?: Trap;

  constructor(originEntity: Entity, targetEntity: Entity, originPos: Coordinates, targetPos: Coordinates, type: EffectType, value: number, effect: Effect, originTrap?: Trap) {
    this.uuid = uuidv4();
    this.originEntity = originEntity;
    this.targetEntity = targetEntity;
    this.originPos = originPos;
    this.targetPos = targetPos;
    this.type = type;
    this.value = value;
    this.effect = effect;
    this.originTrap = originTrap;
  }

  /**
   * Applies the action from the originEntity to the targetEntity.
   */
  *apply(_yield: boolean = true) {
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
      [EffectType.NeutralDamage]: this.neutralDamageAction.bind(this),
      [EffectType.DodgeDamage]: this.dodgeDamageAction.bind(this),
      [EffectType.StealBestElement]: this.stealBestElementAction.bind(this),
      [EffectType.SpellOnTarget]: this.spellOnTargetAction.bind(this),
      [EffectType.SpellOnCaster]: this.spellOnCasterAction.bind(this),
      [EffectType.State]: this.stateAction.bind(this),
      [EffectType.RemoveState]: this.removeStateAction.bind(this),
      [EffectType.CancelSpell]: this.cancelSpellAction.bind(this)
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
    if (!this.targetEntity.isMovable()) return;
    this.value = this.value as number;

    const dir: Direction = getDirection(this.targetPos, this.originPos);
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);

    for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
      const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
      if (!Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) break;

      this.targetEntity.animPos = nextCell;
      if (_yield) yield this.targetEntity; // Yield for animation
      this.targetEntity.pos = this.targetEntity.animPos;
      this.targetEntity.animPos = undefined;

      if (Game.triggerTraps(nextCell)) break;
    }
  }

  /**
   * Function executed for the *push* action.
   * 
   * @param {boolean} _yield `true` if the function should yield a value when an animation should play.
   */
  *pushAction(_yield: boolean) {
    if (!this.targetEntity.isMovable()) return;
    this.value = this.value as number;

    const dir: Direction = getDirection(this.originPos, this.targetPos);
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);

    for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
      const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
      if (!Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) {
        Game.addToActionStack(new Action(this.originEntity, this.targetEntity, this.targetEntity.pos, nextCell, EffectType.PushDamage, diagonal ? Math.ceil(this.value / 2) * 2 : (this.value - i), this.effect, this.originTrap));
        break;
      }

      this.targetEntity.animPos = nextCell;
      if (_yield) yield this.targetEntity; // Yield for animation
      this.targetEntity.pos = this.targetEntity.animPos;
      this.targetEntity.animPos = undefined;

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

    Game.placeTrap(new Trap(this.targetPos, this.originEntity, this.effect.min, this.effect.max, this.effect.area, this.effect.value));
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
    if (Game.getEntity(this.targetPos)) {
      Game.removeEntity(this.targetPos);
    } else if (Game.getTrap(this.targetPos)) {
      Game.removeTrap(this.targetPos);
    }
  }

  /**
   * Function executed for the *water damage* action.
   */
  *waterDamageAction() {
    console.log('Non-implemented function: waterDamageAction()');
  }

  /**
   * Function executed for the *fire damage* action.
   */
  *fireDamageAction() {
    console.log('Non-implemented function: fireDamageAction()');
  }

  /**
   * Function executed for the *earth damage* action.
   */
  *earthDamageAction() {
    console.log('Non-implemented function: earthDamageAction()');
  }

  /**
   * Function executed for the *air damage* action.
   */
  *airDamageAction() {
    console.log('Non-implemented function: airDamageAction()');
  }

  /**
   * Function executed for the *push damage* action.
   */
  *pushDamageAction() {
    console.log('Non-implemented function: pushDamageAction()');
  }

  /**
   * Function executed for the *indirect push damage* action.
   */
  *indirectPushDamageAction() {
    console.log('Non-implemented function: indirectPushDamageAction()');
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
    console.log('Non-implemented function: stealBestElementAction()');
  }

  /**
   * Function executed for the *spell on target* action.
   */
  *spellOnTargetAction() {
    Game.executeSpell(SpellData[this.effect.min].levels[this.effect.max], this.targetEntity.pos, this.originEntity, this.originTrap);
  }

  /**
   * Function executed for the *spell on caster* action.
   */
  *spellOnCasterAction() {
    Game.executeSpell(SpellData[this.effect.min].levels[this.effect.max], this.originEntity.pos, this.originEntity, this.originTrap);
  }

  /**
   * Function executed for the *state* action.
   */
  *stateAction() {
    console.log('Non-implemented function: stateAction()');
  }

  /**
   * Function executed for the *remove state* action.
   */
  *removeStateAction() {
    console.log('Non-implemented function: removeStateAction()');
  }

  /**
   * Function executed for the *cancel spell* action.
   */
  *cancelSpellAction() {
    console.log('Non-implemented function: cancelSpellAction()');
  }

}
