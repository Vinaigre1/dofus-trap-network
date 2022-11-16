import { SpellType, SpellCategory, TrapType } from "@src/enums";

export type Spell = {
  "name": string,
  "icon": string,
  "category": SpellCategory,
  "effect": {
    "trap": TrapType
  }
}

export type SpellDataType = {
  [key in SpellType]: Spell
}
