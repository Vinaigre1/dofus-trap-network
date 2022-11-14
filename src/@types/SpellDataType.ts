import { SpellType, SpellCategory, TrapType } from "@src/enums";

export type SpellDataType = {
  [key in SpellType]: {
    "icon": string,
    "category": SpellCategory,
    "effect": {
      "trap": TrapType
    }
  }
}