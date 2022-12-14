import { SpellCategory, EffectType, TriggerType, Area } from "@src/enums";

export type Effect = {
  targetMask: string,
  value: number,
  min: number, // DiceNum in SpellLevels
  max: number, // DiceSide in SpellLevels
  triggers: TriggerType,
  effectType: EffectType,
  area: Area
}

export type SpellLevel = {
  apCost: number,
  maxStack: number,
  maxCastPerTurn: number,
  maxCastPerTarget: number,
  minCastInterval: number,
  initialCooldown: number,
  globalCooldown: number,
  minPlayerLevel: number,
  effects: Array<Effect>
}

export type Spell = {
  name: string,
  icon: string,
  sfx: string,
  category: SpellCategory,
  levels: Array<SpellLevel>
}

export type SpellDataType = {
  [key: number]: Spell
}
