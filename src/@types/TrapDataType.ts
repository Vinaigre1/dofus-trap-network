import { Area, EffectType, TrapType } from "@src/enums"

export type TrapDataType = {
  [key in TrapType]: {
    "image": string,
    "area": {
      "type": Area,
      "size": number
    },
    "effects": Array<{
      "type": EffectType,
      "value": {
        "min": number,
        "max": number
      },
      "area": {
        "type": Area,
        "size": number
      }
    }>
  }
}