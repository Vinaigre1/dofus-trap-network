import { SpellType, SpellCategory, TrapType, EntityName, ActionName } from "@src/enums";

export type Spell = {
  "name": string,
  "icon": string,
  "category": SpellCategory,
  "effect": {
    "trap": TrapType,
    "entity": EntityName,
    "action": ActionName
  }
}

export type SpellDataType = {
  [key in SpellType]: Spell
}
