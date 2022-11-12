import Entity from "@classes/Entity";
import { Coordinates, Direction, EffectType } from "@src/enums";
import { getDirection, moveInDirection } from "@src/utils/mapUtils";
import Game from "./Game";

export default class Action {
  originEntity: Entity;
  targetEntity: Entity;
  originPos: Coordinates;
  targetPos: Coordinates;
  type: EffectType;
  value: number;

  constructor(originEntity: Entity, targetEntity: Entity, originPos: Coordinates, targetPos: Coordinates, type: EffectType, value: number) {
    this.originEntity = originEntity;
    this.targetEntity = targetEntity;
    this.originPos = originPos;
    this.targetPos = targetPos;
    this.type = type;
    this.value = value;
  }

  /**
   * Applies the action from the originEntity to the targetEntity.
   */
  *apply() {
    switch (this.type) {
      case EffectType.Pull: {
        if (!this.targetEntity.isMovable()) break;
        const dir: Direction = getDirection(this.targetPos, this.originPos);
        const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);
        for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
          const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
          if (Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) {
            this.targetEntity.animPos = nextCell;
            yield this.targetEntity; // Yield for animation
            this.targetEntity.pos = this.targetEntity.animPos;
            this.targetEntity.animPos = undefined;
            if (Game.triggerTraps(nextCell)) {
              break;
            }
          } else {
            Game.addToActionStack(new Action(this.originEntity, this.targetEntity, this.targetEntity.pos, nextCell, EffectType.PushDamage, diagonal ? (this.value - i) * 2 : (this.value - i)));
            break;
          }
        }
        break;
      }
      case EffectType.Push: {
        if (!this.targetEntity.isMovable()) break;
        const dir: Direction = getDirection(this.originPos, this.targetPos);
        const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);
        for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
          const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
          if (Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) {
            this.targetEntity.animPos = nextCell;
            yield this.targetEntity; // Yield for animation
            this.targetEntity.pos = this.targetEntity.animPos;
            this.targetEntity.animPos = undefined;
            if (Game.triggerTraps(nextCell)) {
              break;
            }
          } else {
            break;
          }
        }
        break;
      }
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
      }
        break;
      case EffectType.IndirectPushDamage: {
        console.log(`Applying effect "IndirectPushDamage" to ${this.targetEntity.data.name}`);
        break;
      }
      case EffectType.MalusMP: {
        console.log(`Applying effect "MalusMP" to ${this.targetEntity.data.name}`);
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
      case EffectType.MiryHeal: {
        console.log(`Applying effect "MiryHeal" to ${this.targetEntity.data.name}`);
        break;
      }
    }
  }
}