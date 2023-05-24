import Entity from "@classes/Entity";
import { Coordinates, EffectType } from "@src/enums";
import { getDistance } from "./mapUtils";
import { Effect } from "@src/@types/SpellDataType";

/**
 * Returns the inflicted damages without taking into account how much the target resists.
 * @param {number} value Base value
 * @param {Entity} fromEntity Entity casting the spell effect
 * @param {Entity} toEntity Entity receiving the spell effect
 * @param {Coordinates} fromPos Targetted cell
 * @param {Coordinates} toPos Position of the entity when the spell was casted
 * @param {Effect} effect Casted effect
 * @param {boolean} isTrap Is the effect from a trap
 * @returns {number} Inflicted damages without target resistances
 */
export function sendDamages(value: number, fromEntity: Entity, toEntity: Entity, fromPos: Coordinates, toPos: Coordinates, effect: Effect, isTrap: boolean): number {
  const typeToElem = {
    [EffectType.NeutralDamage]: fromEntity.offensiveStats.strength,
    [EffectType.WaterDamage]: fromEntity.offensiveStats.chance,
    [EffectType.FireDamage]: fromEntity.offensiveStats.intelligence,
    [EffectType.EarthDamage]: fromEntity.offensiveStats.strength,
    [EffectType.AirDamage]: fromEntity.offensiveStats.agility
  };
  const typeToDamage = {
    [EffectType.NeutralDamage]: fromEntity.offensiveStats.damageNeutral,
    [EffectType.WaterDamage]: fromEntity.offensiveStats.damageWater,
    [EffectType.FireDamage]: fromEntity.offensiveStats.damageFire,
    [EffectType.EarthDamage]: fromEntity.offensiveStats.damageEarth,
    [EffectType.AirDamage]: fromEntity.offensiveStats.damageAir
  };
  const stats: number = 100 + fromEntity.offensiveStats.power + (isTrap ? fromEntity.offensiveStats.powerTrap : 0) + typeToElem[effect.effectType];
  const damages: number = fromEntity.offensiveStats.damage + (isTrap ? fromEntity.offensiveStats.damageTrap : 0) + typeToDamage[effect.effectType];
  const distanceMalus = 1 - Math.min(0.5, (getDistance(fromPos, toPos).real - effect.area.min) * 0.1);

  return Math.floor((Math.floor(Math.max(100, stats) / 100 * value) + damages) * distanceMalus);
}

/**
 * 
 * @param {number} value Received base value
 * @param {Entity} fromEntity Entity casting the spell effect
 * @param {Entity} toEntity Entity receiving the spell effect
 * @param {Coordinates} fromPos Targetted cell
 * @param {Coordinates} toPos Position of the entity when the spell was casted
 * @param {Effect} effect Casted effect
 * @returns {number} Final inflicted damages
 */
export function receiveDamages(value: number, fromEntity: Entity, toEntity: Entity, fromPos: Coordinates, toPos: Coordinates, effect: Effect): number {
  const typeToElem = {
    [EffectType.NeutralDamage]: toEntity.defensiveStats.neutral,
    [EffectType.WaterDamage]: toEntity.defensiveStats.water,
    [EffectType.FireDamage]: toEntity.defensiveStats.fire,
    [EffectType.EarthDamage]: toEntity.defensiveStats.earth,
    [EffectType.AirDamage]: toEntity.defensiveStats.air
  };
  const typeToFixed = {
    [EffectType.NeutralDamage]: toEntity.defensiveStats.resistanceNeutral,
    [EffectType.WaterDamage]: toEntity.defensiveStats.resistanceWater,
    [EffectType.FireDamage]: toEntity.defensiveStats.resistanceFire,
    [EffectType.EarthDamage]: toEntity.defensiveStats.resistanceEarth,
    [EffectType.AirDamage]: toEntity.defensiveStats.resistanceAir
  };
  const percent: number = typeToElem[effect.effectType];
  const fixed: number = typeToFixed[effect.effectType];
  const isDistance: boolean = getDistance(fromPos, toPos).real > 1;

  const received: number = Math.floor((value - fixed) * (1 - percent / 100));
  // TODO: Calculate resistance triggers here
  const multiplier = (1 + fromEntity.offensiveStats.damageFinal / 100)
                   * (1 + fromEntity.offensiveStats.damageSpell / 100)
                   * (1 + (isDistance ? fromEntity.offensiveStats.damageRanged : fromEntity.offensiveStats.damageMelee) / 100)
                   * (1 - toEntity.defensiveStats.resistanceSpell / 100)
                   * (1 - (isDistance ? toEntity.defensiveStats.resistanceRanged : toEntity.defensiveStats.resistanceMelee) / 100);
  return Math.floor(received * multiplier);
}

export function receivePushDamages(value: number, fromEntity: Entity, toEntity: Entity): number {
  return Math.floor((32 + Math.floor(fromEntity.level / 2) + fromEntity.offensiveStats.damagePush - toEntity.defensiveStats.resistancePush) * value / 4);
}
