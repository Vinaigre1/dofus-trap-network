import Entity from "@classes/Entity";

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
  Select,
  SpellAsTarget,
  SpellAsCaster,
  State,
  RemoveState,
  CancelSpell,
  BoostSpell,
  HealLastDamage,
  PlaceEndTurnGlyph,
  SymmetricalTeleport,
  Toggle
}

export enum EffectCategory {
  Meta,
  Movement,
  Damage,
  State,
  Secondary,
  Spell
}

export enum AreaType {
  Cell,
  Cross,
  Circle,
  Diagonal,
  Square,
  Star
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
  Northwest,
  None
}

export enum EntityType {
  Player,
  Cawwot,
  Poutch,
  Ally
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
  None = 0,
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
  Ally,
  Poutch,
  Cawwot,
  Chakra,
  TestTrap,
  StartPoint,
  Remove,
  Desynchronisation,
  Select,
  Leukide
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
  Ally = "a",
  Enemy = "A",
  NotClass  = "b",
  Class  = "B",
  Caster = "c",
  CasterEverywhere = "C",
  SidekickAlly = "d",
  SidekickEnemy = "D",
  State  = "e",
  NotState  = "E",
  NotMonster  = "f",
  Monster  = "F",
  AllyNotCaster = "g",
  PlayerAlly = "h",
  PlayerEnemy = "H",
  NotStaticSummonAlly = "i",
  NotStaticSummonEnemy = "I",
  SummonAlly = "j",
  SummonEnemy = "J",
  Carried = "K",
  PlayerSidekickAlly = "l",
  PlayerSidekickEnemy = "L",
  MonsterAlly = "m",
  MonsterEnemy = "M",
  Triggerer = "o",
  TriggererEverywhere = "O",
  NotSummonGroup = "p",
  SummonGroup = "P",
  CanSummon = "q",
  CannotSummon = "Q",
  NotBehindPortal = "r",
  BehindPortal = "R",
  StaticSummonAlly = "s",
  StaticSummonEnemy = "S",
  Telefragged = "T",
  PlayerSummon = "u",
  JustAppeared = "U",
  LifeAbove = "v",
  NotLifeAbove = "V",
  FailedTeleport = "W",
  Sidekick  = "Z",
  NotSidekick = "z"
}

export enum TriggerType {
  onDamage,
  onTrapDamage
}

export enum State {
  None = 0,
  MassTrap = 1,
  Gravity = 2,
  Chakra = 4
}

export enum SpellElement {
  Neutral,
  Earth,
  Fire,
  Water,
  Air
}

export enum BuffType {
  BoostSpell
}

export const StateName = {
  [State.MassTrap]: "Mass Trap",
  [State.Gravity]: "Gravity"
}

// Hardcoded colors
export const TrapClasses: { [key: number]: string } = {
  12128795: 'fire',
  5911580: 'earth',
  1798857: 'water',
  9895830: 'air',
  3222918: 'utility',
  16777215: 'test',
  0: 'desynchro',
};

export const EffectTypeCategory = {
  [EffectType.Pull]: EffectCategory.Movement,
  [EffectType.Push]: EffectCategory.Movement,
  [EffectType.WaterDamage]: EffectCategory.Damage,
  [EffectType.FireDamage]: EffectCategory.Damage,
  [EffectType.EarthDamage]: EffectCategory.Damage,
  [EffectType.AirDamage]: EffectCategory.Damage,
  [EffectType.NeutralDamage]: EffectCategory.Damage,
  [EffectType.PushDamage]: EffectCategory.Damage,
  [EffectType.IndirectPushDamage]: EffectCategory.Damage,
  [EffectType.MPDamage]: EffectCategory.Secondary,
  [EffectType.DodgeDamage]: EffectCategory.Secondary,
  [EffectType.StealBestElement]: EffectCategory.Damage,
  [EffectType.PlaceTrap]: EffectCategory.Meta,
  [EffectType.CreateEntity]: EffectCategory.Meta,
  [EffectType.StartPoint]: EffectCategory.Meta,
  [EffectType.Remove]: EffectCategory.Meta,
  [EffectType.SpellAsTarget]: EffectCategory.Spell,
  [EffectType.SpellAsCaster]: EffectCategory.Spell,
  [EffectType.State]: EffectCategory.State,
  [EffectType.RemoveState]: EffectCategory.State,
  [EffectType.CancelSpell]: EffectCategory.Secondary,
  [EffectType.BoostSpell]: EffectCategory.Secondary,
  [EffectType.HealLastDamage]: EffectCategory.Secondary,
  [EffectType.PlaceEndTurnGlyph]: EffectCategory.Secondary
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

export interface Mask {
  onCaster: boolean;
  mask: string;
  param: number;
}

export interface SpellTrigger {
  triggers: Array<TriggerType>;
  spellId: number;
  spellLevel: number;
  caster: Entity;
  _casterUuid?: string;
}

export interface GameOptions {
  leukide: boolean;
}

export interface OffensiveStats {
  vitality: number;
  strength: number;
  chance: number;
  intelligence: number;
  agility: number;
  power: number;
  powerTrap: number;
  damage: number;
  damageEarth: number;
  damageWater: number;
  damageFire: number;
  damageAir: number;
  damageNeutral: number;
  damagePush: number;
  damageTrap: number;
  damageRanged: number;
  damageMelee: number;
  damageSpell: number;
  damageFinal: number;
}

export interface DefensiveStats {
  neutral: number;
  earth: number;
  water: number;
  fire: number;
  air: number;
  resistanceEarth: number;
  resistanceWater: number;
  resistanceFire: number;
  resistanceAir: number;
  resistanceNeutral: number;
  resistancePush: number;
  resistanceRanged: number;
  resistanceMelee: number;
  resistanceSpell: number;
  damageSustained: number;
  erosion: number;
}

export interface Buff {
  spell: number;
  type: BuffType;
  params: Array<number>;
}
