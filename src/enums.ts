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
  MalusMP,
  InsidiousGlyph,
  MalevolentBoost,
  MiryHeal
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

export enum SpellCategory {
  Water,
  Fire,
  Earth,
  Air,
  Malus,
  Summon,
  Other
}

export enum SpellType {
  TrickyTrap,
  DriftTrap,
  FragmentationTrap,
  MassTrap,
  LethalTrap,
  MalevolentTrap,
  RepellingTrap,
  InsidiousTrap,
  MiryTrap,
  SickratTrap,
  Calamity,
  ParalysingTrap,
  MassGrave
}

export enum ActionType {
  Waiting,
  Current,
  Completed
}

export const TrapClasses = {
  [TrapType.Tricky]: "tricky",
  [TrapType.Insidious]: "insidious",
  [TrapType.Miry]: "miry",
  [TrapType.Mass]: "mass",
  [TrapType.Drift]: "drift",
  [TrapType.Malevolent]: "malevolent",
  [TrapType.Fragmentation]: "fragmentation",
  [TrapType.Paralysing]: "paralysing",
  [TrapType.Repelling]: "repelling",
  [TrapType.Sickrat]: "sickrat",
  [TrapType.Lethal]: "lethal",
  [TrapType.Calamity]: "calamity",
  [TrapType.MassGrave]: "massgrave",
  [TrapType.Test]: "test-trap"
};

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
