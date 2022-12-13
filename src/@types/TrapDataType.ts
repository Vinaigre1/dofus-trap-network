import { AreaType, EffectType, TrapType } from "@src/enums"

export type TrapDataType = {
  [key in TrapType]: {
    "image": string,
    "area": {
      "type": AreaType,
      "size": number
    },
    "effects": Array<{
      "type": EffectType,
      "value": {
        "min": number,
        "max": number
      },
      "area": {
        "type": AreaType,
        "size": number
      }
    }>
  }
}