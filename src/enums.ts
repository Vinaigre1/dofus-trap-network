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
  NeutralDamage,
  PushDamage,
  IndirectPushDamage,
  MPDamage,
  DodgeDamage,
  StealBestElement,
  PlaceTrap,
  CreateEntity,
  StartPoint,
  Remove,
  SpellAsTarget,
  SpellAsCaster,
  State,
  RemoveState,
  CancelSpell,
  BoostSpell,
  HealLastDamage,
  PlaceEndTurnGlyph
}

export enum AreaType {
  Cell,
  Cross,
  Circle,
  Diagonal,
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

export enum EntityType {
  Player,
  Cawwot,
  Poutch
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
  WaterTrap,
  FireTrap,
  EarthTrap,
  AirTrap,
  MalusTrap,
  Entity,
  Other,
  None,
  Action
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
  MassGrave,
  Poutch,
  Cawwot,
  Chakra,
  TestTrap,
  StartPoint,
  Remove
}

export enum ActionType {
  Waiting,
  Current,
  Completed
}

export enum ActionName {
  StartPoint = "Start Point",
  Remove = "Remove"
}

export enum TargetMask {
  Allies,
  Enemies,
  State,
  LifeAbove,
  Caster
}

export enum TriggerType {
  onDamage
}

export enum State {
  MassTrap,
  Gravity
}

// Hardcoded colors
export const TrapClasses: { [key: number]: string } = {
  12128795: 'fire',
  5911580: 'earth',
  1798857: 'water',
  9895830: 'air',
  3222918: 'utility'
};

export interface Coordinates {
  x: number;
  y: number;
}

export interface Area {
  type: AreaType,
  min: number,
  max: number
}

export interface Color {
  r: number;
  g: number;
  b: number;
}
