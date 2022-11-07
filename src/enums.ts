export enum CellType {
  Ground,
  Empty,
  Wall
}

export enum Effect {
  Pull,
  Push,
  WaterDamage,
  FireDamage,
  EarthDamage,
  AirDamage,
  PushDamage,
  IndirectPushDamage,
  MaluMP
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
