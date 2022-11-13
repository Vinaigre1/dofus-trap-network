import { SpellType, SpellCategory } from "@src/enums";

export type SpellDataType = {
  [key in SpellType]: {
    "icon": string,
    "category": SpellCategory
  }
}