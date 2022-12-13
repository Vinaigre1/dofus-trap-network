import { SpellDataType } from "@src/@types/SpellDataType"
import { SpellCategory, SpellType, EffectType, TargetMask, AreaType, TriggerType, State } from "@src/enums"

const spells: SpellDataType = {
  [SpellType.TrickyTrap]: {
    name: "Tricky Trap",
    icon: "./assets/img/spells/TrickyTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 1001,
            max: 3,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 1002,
            max: 1,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
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
        minPlayerLevel: 107,
        effects: [
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 1003,
            max: 3,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 92,
        effects: [
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
        maxCastPerTurn: 2,
        maxCastPerTarget: 0,
        minCastInterval: 0,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 159,
        effects: [
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
  [SpellType.LethalTrap]: {
    name: "Lethal Trap",
    icon: "./assets/img/spells/LethalTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
  [SpellType.MalevolentTrap]: {
    name: "Malevolent Trap",
    icon: "./assets/img/spells/MalevolentTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
  [SpellType.RepellingTrap]: {
    name: "Repelling Trap",
    icon: "./assets/img/spells/RepellingTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
        minPlayerLevel: 122,
        effects: [
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
  [SpellType.MiryTrap]: {
    name: "Miry Trap",
    icon: "./assets/img/spells/MiryTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
  [SpellType.SickratTrap]: {
    name: "Sickrat Trap",
    icon: "./assets/img/spells/SickratTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
  [SpellType.Calamity]: {
    name: "Calamity",
    icon: "./assets/img/spells/Calamity.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 1,
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
  [SpellType.ParalysingTrap]: {
    name: "Paralysing Trap",
    icon: "./assets/img/spells/ParalysingTrap.svg",
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
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
        minCastInterval: 5,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 112,
        effects: [
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 3,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.PlaceTrap,
            min: 0,
            max: 1,
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
  [SpellType.Chakra]: {
    name: "Chakra Concentration",
    icon: "./assets/img/spells/ChakraConcentration.svg",
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
            min: 0,
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
        minCastInterval: 4,
        initialCooldown: 0,
        globalCooldown: 0,
        minPlayerLevel: 131,
        effects: [
          {
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
            min: 0,
            max: 2,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
            min: 0,
            max: 3,
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
    category: SpellCategory.Other,
    levels: []
  },
  1001: {
    name: "Tricky Trap",
    icon: null,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Pull,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Pull,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Pull,
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
    icon: null,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Push,
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
    icon: null,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.FireDamage,
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
    icon: null,
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
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.State,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
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
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.RemoveState,
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
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.State,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
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
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.RemoveState,
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
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.State,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
            min: 1004,
            max: 6,
            triggers: null,
            area: {
              type: AreaType.Cell,
              min: 0,
              max: 0
            }
          },
          {
            targetMask: `${TargetMask.Allies}`,
            effectType: EffectType.RemoveState,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},!${TargetMask.State}:${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},!${TargetMask.State}:${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},!${TargetMask.State}:${State.MassTrap}`,
            effectType: EffectType.EarthDamage,
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
    icon: null,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},${TargetMask.LifeAbove}:25`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},!${TargetMask.LifeAbove}:25`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},${TargetMask.LifeAbove}:25`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies},!${TargetMask.LifeAbove}:25`,
            effectType: EffectType.EarthDamage,
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
    name: "Tricky Trap",
    icon: null,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.Spell,
            min: 1006,
            max: 6,
            triggers: null,
            area: {
              type: AreaType.Circle,
              min: 1,
              max: 2
            }
          },
          {
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.EarthDamage,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.CancelSpell,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.BoostSpell,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.BoostSpell,
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
            targetMask: `${TargetMask.Caster}`,
            effectType: EffectType.BoostSpell,
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
    icon: null,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Push,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Push,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
            targetMask: `${TargetMask.Allies},${TargetMask.Enemies}`,
            effectType: EffectType.Push,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
    name: "Repelling Trap",
    icon: null,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.PlaceEndTurnGlyph,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.PlaceEndTurnGlyph,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.PlaceEndTurnGlyph,
            min: 1008,
            max: 6,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
            targetMask: `${TargetMask.Enemies}`,
            effectType: EffectType.AirDamage,
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
  // [SpellType.Poutch]: {
  //   name: "Poutch Ingball",
  //   icon: "./assets/img/spells/Poutch.svg",
  //   category: SpellCategory.Summon,
  //   effect: {
  //     "entity": "${EntityName.Poutch}"
  //   }
  // },
  // [SpellType.Cawwot]: {
  //   name: "Cawwot",
  //   icon: "./assets/img/spells/Cawwot.svg",
  //   category: SpellCategory.Summon,
  //   effect: {
  //     "entity": "${EntityName.Cawwot}"
  //   }
  // },
  // [SpellType.Select]: {
  //   name: "Select",
  //   icon: "./assets/img/spells/Select.svg",
  //   category: SpellCategory.Action,
  //   effect: {
  //     "action": "Select"
  //   }
  // },
  // [SpellType.Remove]: {
  //   name: "Remove",
  //   icon: "./assets/img/spells/Remove.svg",
  //   category: SpellCategory.Action,
  //   effect: {
  //     "action": "Remove"
  //   }
  // }
};

export default spells;