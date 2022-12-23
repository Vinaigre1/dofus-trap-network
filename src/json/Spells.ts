import { SpellDataType } from "@src/@types/SpellDataType"
import { SpellCategory, SpellType, EffectType, TargetMask, AreaType, TriggerType, State, EntityType, Team } from "@src/enums"

const SpellData: SpellDataType = {
  [SpellType.TrickyTrap]: {
    name: "Tricky Trap",
    icon: "./assets/img/spells/TrickyTrap.svg",
    sfx: "./assets/img/traps/Tricky.svg",
    category: SpellCategory.FireTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 1,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1001,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 1,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1001,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 1,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1001,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.DriftTrap]: {
    name: "Drift Trap",
    icon: "./assets/img/spells/DriftTrap.svg",
    sfx: "./assets/img/traps/Drift.svg",
    category: SpellCategory.FireTrap,
    levels: [
      {
        apCost: 2,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 140,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1002,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Diagonal,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.FragmentationTrap]: {
    name: "Fragmentation Trap",
    icon: "./assets/img/spells/FragmentationTrap.svg",
    sfx: "./assets/img/traps/Fragmentation.svg",
    category: SpellCategory.FireTrap,
    levels: [
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 40,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1003,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 107,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1003,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 174,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 12128795,
            min: 1003,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.MassTrap]: {
    name: "Mass Trap",
    icon: "./assets/img/spells/MassTrap.svg",
    sfx: "./assets/img/traps/Mass.svg",
    category: SpellCategory.EarthTrap,
    levels: [
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 25,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1004,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 92,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1004,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 159,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1004,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.LethalTrap]: {
    name: "Lethal Trap",
    icon: "./assets/img/spells/LethalTrap.svg",
    sfx: "./assets/img/traps/Lethal.svg",
    category: SpellCategory.EarthTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 85,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1005,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 152,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1005,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.MalevolentTrap]: {
    name: "Malevolent Trap",
    icon: "./assets/img/spells/MalevolentTrap.svg",
    sfx: "./assets/img/traps/Malevolent.svg",
    category: SpellCategory.EarthTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 35,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 102,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1006,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 169,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 5911580,
            min: 1006,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.RepellingTrap]: {
    name: "Repelling Trap",
    icon: "./assets/img/spells/RepellingTrap.svg",
    sfx: "./assets/img/traps/Repelling.svg",
    category: SpellCategory.AirTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 1,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 55,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1007,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 1,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 122,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1007,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 1,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 189,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1007,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.InsidiousTrap]: {
    name: "Insidious Trap",
    icon: "./assets/img/spells/InsidiousTrap.svg",
    sfx: "./assets/img/traps/Insidious.svg",
    category: SpellCategory.AirTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 6,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1008,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 71,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1008,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 138,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 9895830,
            min: 1008,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.MiryTrap]: {
    name: "Miry Trap",
    icon: "./assets/img/spells/MiryTrap.svg",
    sfx: "./assets/img/traps/Miry.svg",
    category: SpellCategory.WaterTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 20,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1009,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 87,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1009,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 154,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1009,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.SickratTrap]: {
    name: "Sickrat Trap",
    icon: "./assets/img/spells/SickratTrap.svg",
    sfx: "./assets/img/traps/Sickrat.svg",
    category: SpellCategory.WaterTrap,
    levels: [
      {
        apCost: 2,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 75,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1011,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 2,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 142,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1011,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Calamity]: {
    name: "Calamity",
    icon: "./assets/img/spells/Calamity.svg",
    sfx: "./assets/img/traps/Calamity.svg",
    category: SpellCategory.WaterTrap,
    levels: [
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 1,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 180,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 1798857,
            min: 1012,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.ParalysingTrap]: {
    name: "Paralysing Trap",
    icon: "./assets/img/spells/ParalysingTrap.svg",
    sfx: "./assets/img/traps/Paralysing.svg",
    category: SpellCategory.MalusTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 6,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 45,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 3222918,
            min: 1013,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 5,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 112,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 3222918,
            min: 1013,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 4,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 179,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 3222918,
            min: 1013,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      }
    ]
  },
  [SpellType.MassGrave]: {
    name: "Mass Grave",
    icon: "./assets/img/spells/MassGrave.svg",
    sfx: "./assets/img/traps/MassGrave.svg",
    category: SpellCategory.MalusTrap,
    levels: [
      {
        apCost: 3,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 3,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 155,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 3222918,
            min: 1014,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Chakra]: {
    name: "Chakra Concentration",
    icon: "./assets/img/spells/ChakraConcentration.svg",
    sfx: null,
    category: SpellCategory.Other,
    levels: [
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 4,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 65,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1015,
            max: 0,
            triggers: TriggerType.onDamage,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 4,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 131,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1015,
            max: 1,
            triggers: TriggerType.onDamage,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 4,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 3,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 198,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1015,
            max: 2,
            triggers: TriggerType.onDamage,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.TestTrap]: {
    name: "Test Trap",
    icon: "./assets/img/spells/TestTrap.svg",
    sfx: "./assets/img/traps/Test.svg",
    category: SpellCategory.Other,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.PlaceTrap,
            value: 16777215,
            min: 1016,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1001: {
    name: "Tricky Trap",
    icon: "./assets/img/spells/TrickyTrap.svg",
    sfx: "./assets/img/traps/Tricky.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 18,
            max: 20,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 1,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 22,
            max: 24,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 1,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 26,
            max: 28,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 1,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1002: {
    name: "Drift Trap",
    icon: "./assets/img/spells/DriftTrap.svg",
    sfx: "./assets/img/traps/Drift.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 17,
            max: 19,
            triggers: null,
            area: {
              type: AreaType.Diagonal,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Push,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Diagonal,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1003: {
    name: "Fragmentation Trap",
    icon: "./assets/img/spells/FragmentationTrap.svg",
    sfx: "./assets/img/traps/Fragmentation.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 4,
            max: 7,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 8,
            max: 10,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 18,
            max: 20,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 2,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 28,
            max: 30,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 3,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 7,
            max: 10,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 17,
            max: 21,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 28,
            max: 31,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 2,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 38,
            max: 41,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 3,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 13,
            max: 17,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 27,
            max: 31,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 37,
            max: 41,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 2,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.FireDamage,
            value: 0,
            min: 47,
            max: 51,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 3,
              max: 3
            }
          }
        ]
      }
    ]
  },
  1004: {
    name: "Mass Trap",
    icon: "./assets/img/spells/MassTrap.svg",
    sfx: "./assets/img/traps/Mass.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.State,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1004,
            max: 3,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.RemoveState,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.State,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1004,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.RemoveState,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.State,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1004,
            max: 5,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.RemoveState,
            value: 0,
            min: State.MassTrap,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.NotState}${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 24,
            max: 28,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.NotState}${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 29,
            max: 33,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.NotState}${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 34,
            max: 38,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      }
    ]
  },
  1005: {
    name: "Lethal Trap",
    icon: "./assets/img/spells/LethalTrap.svg",
    sfx: "./assets/img/traps/Lethal.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.LifeAbove}25`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 31,
            max: 35,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.NotLifeAbove}25`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 39,
            max: 44,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.LifeAbove}25`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 39,
            max: 43,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy},${TargetMask.NotLifeAbove}25`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 49,
            max: 54,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1006: {
    name: "Malevolent Trap",
    icon: "./assets/img/spells/MalevolentTrap.svg",
    sfx: "./assets/img/traps/Malevolent.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1006,
            max: 3,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 18,
            max: 20,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1006,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 23,
            max: 26,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsCaster,
            value: 0,
            min: 1006,
            max: 5,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.EarthDamage,
            value: 0,
            min: 28,
            max: 32,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.CancelSpell,
            value: 0,
            min: 1006,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.BoostSpell,
            value: 0,
            min: 1006,
            max: 10,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.BoostSpell,
            value: 0,
            min: 1006,
            max: 15,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.CasterEverywhere}`,
            effectType: EffectType.BoostSpell,
            value: 0,
            min: 1006,
            max: 20,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  1007: {
    name: "Repelling Trap",
    icon: "./assets/img/spells/RepellingTrap.svg",
    sfx: "./assets/img/traps/Repelling.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Push,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 8,
            max: 8,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Push,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 10,
            max: 10,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Push,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 12,
            max: 12,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1008: {
    name: "Insidious Trap",
    icon: "./assets/img/spells/InsidiousTrap.svg",
    sfx: "./assets/img/traps/Insidious.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.PlaceEndTurnGlyph,
            value: 9895830,
            min: 1008,
            max: 3,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.PlaceEndTurnGlyph,
            value: 9895830,
            min: 1008,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.PlaceEndTurnGlyph,
            value: 9895830,
            min: 1008,
            max: 5,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 34,
            max: 38,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 41,
            max: 45,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.AirDamage,
            value: 0,
            min: 48,
            max: 52,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          },
        ]
      }
    ]
  },
  1009: {
    name: "Miry Trap",
    icon: "./assets/img/spells/MiryTrap.svg",
    sfx: "./assets/img/traps/Miry.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 21,
            max: 25,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 27,
            max: 31,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 33,
            max: 37,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.SpellAsTarget,
            value: 0,
            min: 1010,
            max: 1,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  1010: {
    name: "Miry Trap",
    icon: "./assets/img/spells/MiryTrap.svg",
    sfx: "./assets/img/traps/Miry.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.HealLastDamage,
            value: 0,
            min: 50,
            max: 50,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally}`,
            effectType: EffectType.HealLastDamage,
            value: 0,
            min: 50,
            max: 50,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          }
        ]
      }
    ]
  },
  1011: {
    name: "Sickrat Trap",
    icon: "./assets/img/spells/SickratTrap.svg",
    sfx: "./assets/img/traps/Sickrat.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 3,
            max: 3,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 1,
              max: 3
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 13,
            max: 15,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 3,
            max: 3,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 1,
              max: 3
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 17,
            max: 19,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 3
            }
          }
        ]
      }
    ]
  },
  1012: {
    name: "Calamity",
    icon: "./assets/img/spells/Calamity.svg",
    sfx: "./assets/img/traps/Calamity.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.WaterDamage,
            value: 0,
            min: 40,
            max: 44,
            triggers: null,
            area: {
              type: AreaType.Square,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.DodgeDamage,
            value: 0,
            min: 40,
            max: 40,
            triggers: null,
            area: {
              type: AreaType.Square,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  1013: {
    name: "Paralysing Trap",
    icon: "./assets/img/spells/ParalysingTrap.svg",
    sfx: "./assets/img/traps/Paralysing.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.MPDamage,
            value: 0,
            min: 4,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.MPDamage,
            value: 0,
            min: 4,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.MPDamage,
            value: 0,
            min: 4,
            max: 4,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 3
            }
          }
        ]
      }
    ]
  },
  1014: {
    name: "Mass Grave",
    icon: "./assets/img/spells/MassGrave.svg",
    sfx: "./assets/img/traps/MassGrave.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.State,
            value: 0,
            min: State.Gravity,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 0,
              max: 2
            }
          }
        ]
      }
    ]
  },
  1015: {
    name: "Chakra Concentration",
    icon: "./assets/img/spells/ChakraConcentration.svg",
    sfx: null,
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.StealBestElement,
            value: 0,
            min: 11,
            max: 11,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.StealBestElement,
            value: 0,
            min: 13,
            max: 13,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      },
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.StealBestElement,
            value: 0,
            min: 15,
            max: 15,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  1016: {
    name: "Test Trap",
    icon: "./assets/img/spells/TestTrap.svg",
    sfx: "./assets/img/traps/Test.svg",
    category: SpellCategory.None,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.Push,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          },
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 2,
            max: 2,
            triggers: null,
            area: {
              type: AreaType.Cross,
              min: 0,
              max: 1
            }
          }
        ]
      }
    ]
  },
  [SpellType.Poutch]: {
    name: "Poutch Ingball",
    icon: "./assets/img/spells/Poutch.svg",
    sfx: "./assets/img/entities/Poutch.png",
    category: SpellCategory.Entity,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.CreateEntity,
            value: EntityType.Poutch,
            min: Team.Defender,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Player]: {
    name: "Sram",
    icon: "./assets/img/spells/Double.svg",
    sfx: "./assets/img/entities/Sram.png",
    category: SpellCategory.Entity,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.CreateEntity,
            value: EntityType.Player,
            min: Team.Attacker,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Cawwot]: {
    name: "Cawwot",
    icon: "./assets/img/spells/Cawwot.svg",
    sfx: "./assets/img/entities/Cawwot.png",
    category: SpellCategory.Entity,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.CreateEntity,
            value: EntityType.Cawwot,
            min: Team.Attacker,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.StartPoint]: {
    name: "Start point",
    icon: "./assets/img/spells/StartPoint.svg",
    sfx: null,
    category: SpellCategory.Action,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.StartPoint,
            value: 0,
            min: 0,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Remove]: {
    name: "Remove",
    icon: "./assets/img/spells/Remove.svg",
    sfx: null,
    category: SpellCategory.Action,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Ally},${TargetMask.Enemy}`,
            effectType: EffectType.Remove,
            value: 0,
            min: 0,
            max: 0,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          }
        ]
      }
    ]
  },
  [SpellType.Leukide]: {
    name: "Leukide",
    icon: null,
    sfx: null,
    category: null,
    levels: [
      {
        apCost: 0,
        maxStack: 0,
        maxCastPerTurn: 0,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 0,
        effects: [
          {
            targetMask: `${TargetMask.Enemy}`,
            effectType: EffectType.Pull,
            value: 0,
            min: 63,
            max: 63,
            triggers: null,
            area: {
              type: AreaType.Star,
              min: 0,
              max: 63
            }
          }
        ]
      }
    ]
  }
};

export default SpellData;