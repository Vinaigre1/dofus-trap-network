import Entity from "@classes/Entity";
import { Coordinates, Direction, EffectType } from "@src/enums";
import { getDirection, moveInDirection } from "@src/utils/mapUtils";
import Game from "@classes/Game";
import ActionComponent from "@components/ActionComponent";
import { v4 as uuidv4 } from "uuid";
import Trap from "./Trap";
import { Effect } from "@src/@types/SpellDataType";

export default class Action {
  uuid: string;
  originEntity: Entity;
  targetEntity: Entity;
  originPos: Coordinates;
  targetPos: Coordinates;
  type: EffectType;
  value: number | Effect;
  component: ActionComponent;
  originTrap?: Trap;

  constructor(originEntity: Entity, targetEntity: Entity, originPos: Coordinates, targetPos: Coordinates, type: EffectType, value: number | Effect, originTrap?: Trap) {
    this.uuid = uuidv4();
    this.originEntity = originEntity;
    this.targetEntity = targetEntity;
    this.originPos = originPos;
    this.targetPos = targetPos;
    this.type = type;
    this.value = value;
    this.originTrap = originTrap;
  }

  /**
   * Applies the action from the originEntity to the targetEntity.
   */
  *apply(_yield: boolean = true) {
    switch (this.type) {
      case EffectType.Pull:
        yield* this.pullAction(_yield);
        break;
      case EffectType.Push:
        yield* this.pushAction(_yield);
        break;
      case EffectType.WaterDamage: {
        console.log(`Applying effect "WaterDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.FireDamage: {
        console.log(`Applying effect "FireDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.EarthDamage: {
        console.log(`Applying effect "EarthDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.AirDamage: {
        console.log(`Applying effect "AirDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.PushDamage: {
        // Create here the IndirectPushDamage action
        console.log(`Applying effect "PushDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.IndirectPushDamage: {
        console.log(`Applying effect "IndirectPushDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.MPDamage: {
        console.log(`Applying effect "MPDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.InsidiousGlyph: {
        console.log(`Applying effect "InsidiousGlyph" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.MalevolentBoost: {
        console.log(`Applying effect "MalevolentBoost" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.HealLastDamage: {
        console.log(`Applying effect "HealLastDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.PlaceTrap:
        yield* this.placeTrapAction();
        break;
      case EffectType.CreateEntity:
        yield* this.createEntityAction();
        break;
      case EffectType.StartPoint:
        yield* this.startPointAction();
        break;
      case EffectType.Remove:
        yield* this.removeAction();
        break;
      default:
        console.log(`Unknown EffectType: ${this.type}`);
        break;
    }
  }

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

  *pushAction(_yield: boolean) {
    if (!this.targetEntity.isMovable()) return;
    this.value = this.value as number;

    const dir: Direction = getDirection(this.originPos, this.targetPos);
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);

    for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
      const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
      if (!Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) {
        Game.addToActionStack(new Action(this.originEntity, this.targetEntity, this.targetEntity.pos, nextCell, EffectType.PushDamage, diagonal ? Math.ceil(this.value / 2) * 2 : (this.value - i), this.originTrap));
        break;
      }

      this.targetEntity.animPos = nextCell;
      if (_yield) yield this.targetEntity; // Yield for animation
      this.targetEntity.pos = this.targetEntity.animPos;
      this.targetEntity.animPos = undefined;

      if (Game.triggerTraps(nextCell)) break;
    }
  }

  *placeTrapAction() {
    if (Game.getTrap(this.targetPos) !== undefined) return;
    // The following line is a condition used in the real game, but not on the simulator.
    // if (Game.getEntity(this.targetPos) !== undefined) return;

    this.value = this.value as Effect;

    Game.placeTrap(new Trap(this.targetPos, this.originEntity, this.value.min, this.value.max, this.value.area, this.value.value));
  }

  *createEntityAction() {
    if (Game.getEntity(this.targetPos) !== undefined) return;
    // The following line is a condition used in the real game, but not on the simulator.
    // if (Game.getTrap(this.targetPos) !== undefined) return;

    this.value = this.value as Effect;

    Game.placeEntity(new Entity(this.targetPos, this.value.min, this.value.value));
  }

  *startPointAction() {
    Game.setStartPoint(this.targetPos);
  }

  *removeAction() {
    if (Game.getEntity(this.targetPos)) {
      Game.removeEntity(this.targetPos);
    } else if (Game.getTrap(this.targetPos)) {
      Game.removeTrap(this.targetPos);
    }
  }
}
