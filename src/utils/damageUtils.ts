import Entity from "@classes/Entity";
import { Coordinates, EffectType, SpellElement } from "@src/enums";
import { getDistance } from "./mapUtils";

export function effectToElement(effect: EffectType) {
  return {
    [EffectType.NeutralDamage]: SpellElement.Neutral,
    [EffectType.WaterDamage]: SpellElement.Water,
    [EffectType.FireDamage]: SpellElement.Fire,
    [EffectType.EarthDamage]: SpellElement.Earth,
    [EffectType.AirDamage]: SpellElement.Air
  }[effect];
}

/**
 * Returns the calculated damages without taking into account how much the target resists.
 * @param {number} value Base value
 * @param {Entity} fromEntity Entity casting the spell effect
 * @param {Coordinates} fromPos Targetted cell
 * @param {Coordinates} toPos Position of the entity when the spell was casted
 * @param {SpellElement} element Casted element
 * @param {boolean} isTrap Is the effect from a trap
 * @returns {number} Calculated damages without target resistances
 */
export function sendDamages(value: number, fromEntity: Entity, fromPos: Coordinates, toPos: Coordinates, element: SpellElement, areaMin: number, isTrap: boolean): number {
  const elemToStat = {
    [SpellElement.Neutral]: fromEntity.offensiveStats.strength,
    [SpellElement.Water]: fromEntity.offensiveStats.chance,
    [SpellElement.Fire]: fromEntity.offensiveStats.intelligence,
    [SpellElement.Earth]: fromEntity.offensiveStats.strength,
    [SpellElement.Air]: fromEntity.offensiveStats.agility
  };
  const elemToDamage = {
    [SpellElement.Neutral]: fromEntity.offensiveStats.damageNeutral,
    [SpellElement.Water]: fromEntity.offensiveStats.damageWater,
    [SpellElement.Fire]: fromEntity.offensiveStats.damageFire,
    [SpellElement.Earth]: fromEntity.offensiveStats.damageEarth,
    [SpellElement.Air]: fromEntity.offensiveStats.damageAir
  };
  const stats: number = 100 + fromEntity.offensiveStats.power + (isTrap ? fromEntity.offensiveStats.powerTrap : 0) + elemToStat[element];
  const damages: number = fromEntity.offensiveStats.damage + (isTrap ? fromEntity.offensiveStats.damageTrap : 0) + elemToDamage[element];
  const distanceMalus = 1 - Math.min(0.5, (getDistance(fromPos, toPos).real - areaMin) * 0.1);

  return Math.floor((Math.floor(Math.max(100, stats) / 100 * value) + damages) * distanceMalus);
}

/**
 * Returns the calculated damages after taking into account the target resistance.
 * 
 * This function does not take into account the caster's characteristics.
 * @param {number} value Received base value
 * @param {Entity} fromEntity Entity casting the spell effect
 * @param {Entity} toEntity Entity receiving the spell effect
 * @param {Coordinates} fromPos Targetted cell
 * @param {Coordinates} toPos Position of the entity when the spell was casted
 * @param {SpellElement} element Casted element
 * @returns {number} Final calculated damages
 */
export function receiveDamages(value: number, fromEntity: Entity, toEntity: Entity, fromPos: Coordinates, toPos: Coordinates, element: SpellElement): number {
  const typeToElem = {
    [SpellElement.Neutral]: toEntity.defensiveStats.neutral,
    [SpellElement.Water]: toEntity.defensiveStats.water,
    [SpellElement.Fire]: toEntity.defensiveStats.fire,
    [SpellElement.Earth]: toEntity.defensiveStats.earth,
    [SpellElement.Air]: toEntity.defensiveStats.air
  };
  const typeToFixed = {
    [SpellElement.Neutral]: toEntity.defensiveStats.resistanceNeutral,
    [SpellElement.Water]: toEntity.defensiveStats.resistanceWater,
    [SpellElement.Fire]: toEntity.defensiveStats.resistanceFire,
    [SpellElement.Earth]: toEntity.defensiveStats.resistanceEarth,
    [SpellElement.Air]: toEntity.defensiveStats.resistanceAir
  };
  const percent: number = typeToElem[element];
  const fixed: number = typeToFixed[element];
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

/**
 * Calculates inflicted push damages.
 * @param {number} value Received base value
 * @param {Entity} fromEntity Entity casting the spell effect
 * @param {Entity} toEntity Entity receiving the spell effect
 * @returns {number} Final inflicted damages
 */
export function receivePushDamages(value: number, fromEntity: Entity, toEntity: Entity): number {
  return Math.floor((32 + Math.floor(fromEntity.level / 2) + fromEntity.offensiveStats.damagePush - toEntity.defensiveStats.resistancePush) * value / 4);
}

/**
 * Returns the best element for the given entity.
 * @param {Entity} entity
 * @returns {SpellElement} The element
 */
export function getBestElement(entity: Entity) {
  const stats = [
    { element: 'strength', damage: 'damageEarth', effect: SpellElement.Earth },
    { element: 'strength', damage: 'damageNeutral', effect: SpellElement.Neutral },
    { element: 'intelligence', damage: 'damageFire', effect: SpellElement.Fire },
    { element: 'chance', damage: 'damageWater', effect: SpellElement.Water },
    { element: 'agility', damage: 'damageAir', effect: SpellElement.Air }
  ];

  stats.sort((a, b) => {
    if (entity.offensiveStats[a.element] > entity.offensiveStats[b.element]) {
      return -1;
    } else if (entity.offensiveStats[a.element] < entity.offensiveStats[b.element]) {
      return 1;
    } else if (entity.offensiveStats[a.damage] > entity.offensiveStats[b.damage]) {
      return -1;
    } else if (entity.offensiveStats[a.damage] < entity.offensiveStats[b.damage]) {
      return 1;
    } else {
      return 0;
    }
  });

  return stats[0].effect;
}
