import { SpellCategory, TrapType, EntityName, ActionName, EffectType, TriggerType, AreaType } from "@src/enums";

export type Spell = {
  name: string,
  icon: string,
  category: SpellCategory,
  effect: {
    trap: TrapType,
    entity: EntityName,
    action: ActionName
  }
}

export type SpellDataType = {
  [key: number]: {
    name: string,
    icon: string,
    category: SpellCategory,
    levels: Array<{
      apCost: number,
      maxStack: number,
      maxCastPerTurn: number,
      maxCastPerTarget: number,
      minCastInterval: number,
      initialCooldown: number,
      globalCooldown: number,
      minPlayerLevel: number,
      effects: Array<{
        targetMask: string,
        min: number, // DiceNum in SpellLevels
        max: number, // DiceSide in SpellLevels
        triggers: TriggerType,
        effectType: EffectType,
        area: {
          type: AreaType,
          min: number,
          max: number
        }
      }>
    }>
  }
}
