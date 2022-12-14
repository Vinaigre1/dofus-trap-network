export type EntityData = {
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
