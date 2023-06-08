import { EntityDataType } from "@src/@types/EntityDataType"
import { EntityType } from "@src/enums"

const entities: EntityDataType = {
  [EntityType.Cawwot]: {
    "type": EntityType.Cawwot,
    "name": "Cawwot",
    "image": "./assets/img/entities/Cawwot.png",
    "offsetX": 0.03,
    "offsetY": 0.15,
    "defaultScale": 1.48,
    "movable": false
  },
  [EntityType.Poutch]: {
    "type": EntityType.Poutch,
    "name": "Poutch",
    "image": "./assets/img/entities/Poutch.png",
    "offsetX": -0.05,
    "offsetY": 0.05,
    "defaultScale": 1.46,
    "movable": true
  },
  [EntityType.Player]: {
    "type": EntityType.Player,
    "name": "Player",
    "image": "./assets/img/entities/Sram.png",
    "offsetX": 0,
    "offsetY": 0.05,
    "defaultScale": 1.1,
    "movable": true
  },
  [EntityType.Ally]: {
    "type": EntityType.Ally,
    "name": "Ally",
    "image": "./assets/img/entities/Ally.png",
    "offsetX": 0,
    "offsetY": 0.05,
    "defaultScale": 1.1,
    "movable": true
  }
}

export default entities;