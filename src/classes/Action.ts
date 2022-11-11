import Effect from "@classes/Effect";
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

  apply() {
    switch (this.type) {
      case EffectType.Pull:
        console.log(`Applying effect ${EffectType.Pull} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.Push:
        if (!this.targetEntity.isMovable()) break;
        const dir: Direction = getDirection(this.originPos, this.targetPos);
        const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);
        for (let i: number = 0; i < (diagonal ? Math.ceil(this.value / 2) : this.value); i++) {
          const nextCell: Coordinates = moveInDirection(this.targetEntity.pos, dir, 1);
          console.log(this.targetEntity.pos, nextCell);
          if (Game.isMovementPossible(this.targetEntity.pos, nextCell, dir)) {
            this.targetEntity.pos = nextCell;
            if (Game.triggerTraps(nextCell)) {
              break;
            }
          } else {
            Game.addToActionStack(new Action(this.originEntity, this.targetEntity, this.targetEntity.pos, nextCell, EffectType.PushDamage, diagonal ? (this.value - i) * 2 : (this.value - i)));
            break;
          }
        }
        break;
      case EffectType.WaterDamage:
        console.log(`Applying effect ${EffectType.WaterDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.FireDamage:
        console.log(`Applying effect ${EffectType.FireDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.EarthDamage:
        console.log(`Applying effect ${EffectType.EarthDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.AirDamage:
        console.log(`Applying effect ${EffectType.AirDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.PushDamage:
        // Create here the IndirectPushDamage action
        console.log(`Applying effect ${EffectType.PushDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.IndirectPushDamage:
        console.log(`Applying effect ${EffectType.IndirectPushDamage} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.MalusMP:
        console.log(`Applying effect ${EffectType.MalusMP} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.InsidiousGlyph:
        console.log(`Applying effect ${EffectType.InsidiousGlyph} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.MalevolentBoost:
        console.log(`Applying effect ${EffectType.MalevolentBoost} to ${this.targetEntity.data.name}`);
        break;
      case EffectType.MiryHeal:
        console.log(`Applying effect ${EffectType.MiryHeal} to ${this.targetEntity.data.name}`);
        break;
    }
  }
}