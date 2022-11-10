export enum CellType {
  Ground,
  Empty,
  Wall,
  Trap
}

export enum EffectType {
  Pull,
  Push,
  WaterDamage,
  FireDamage,
  EarthDamage,
  AirDamage,
  PushDamage,
  IndirectPushDamage,
  MalusMP
}

export enum Area {
  Cell,
  Cross,
  Circle,
  Diagonal,
  Ring,
  Square
}

export enum Team {
  Attacker,
  Defender
}

export enum Direction {
  North,
  East,
  South,
  West,
  Northeast,
  Southeast,
  Southwest,
  Northwest
}

export enum EntityName {
  Player = "Player",
  Cawwot = "Cawwot",
  Poutch = "Poutch"
}

export enum TrapType {
  Tricky,
  Insidious,
  Miry,
  Mass,
  Drift,
  Malevolent,
  Fragmentation,
  Paralysing,
  Repelling,
  Sickrat,
  Lethal,
  Calamity,
  MassGrave,
  Test
}

export enum CellBorders {
  North = 1,
  East = 2,
  South = 4,
  West = 8
}

export interface EntityData {
  name: EntityName;
  image: string;
  offsetX: number;
  offsetY: number;
  defaultScale: number;
}

export interface Coordinates {
  x: number;
  y: number;
}
