import { EntityType } from "@src/enums";

export type EntityData = {
  type: EntityType;
  name: string;
  image: string;
  offsetX: number;
  offsetY: number;
  defaultScale: number;
  movable: boolean;
}

export type EntityDataType = {
  [key: number]: EntityData
}
