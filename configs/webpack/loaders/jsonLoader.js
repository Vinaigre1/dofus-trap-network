module.exports = function (source) {
  // const options = this.getOptions();

  const enumValues = {
    CellType: {
      Ground: 0,
      Empty: 1,
      Wall: 2,
      Trap: 3
    },
    EffectType: {
      Pull: 0,
      Push: 1,
      WaterDamage: 2,
      FireDamage: 3,
      EarthDamage: 4,
      AirDamage: 5,
      PushDamage: 6,
      IndirectPushDamage: 7,
      MalusMP: 8,
      InsidiousGlyph: 9,
      MalevolentBoost: 10,
      MiryHeal: 11
    },
    Area: {
      Cell: 0,
      Cross: 1,
      Circle: 2,
      Diagonal: 3,
      Ring: 4,
      Square: 5
    },
    Team: {
      Attacker: 0,
      Defender: 1
    },
    Direction: {
      North: 0,
      East: 1,
      South: 2,
      West: 3,
      Northeast: 4,
      Southeast: 5,
      Southwest: 6,
      Northwest: 7
    },
    EntityName: {
      Player: "Player",
      Cawwot: "Cawwot",
      Poutch: "Poutch"
    },
    TrapType: {
      Tricky: 0,
      Insidious: 1,
      Miry: 2,
      Mass: 3,
      Drift: 4,
      Malevolent: 5,
      Fragmentation: 6,
      Paralysing: 7,
      Repelling: 8,
      Sickrat: 9,
      Lethal: 10,
      Calamity: 11,
      MassGrave: 12,
      Test: 13
    },
    CellBorders: {
      North: 1,
      East: 2,
      South: 4,
      West: 8
    },
    SpellCategory: {
      WaterTrap: 0,
      FireTrap: 1,
      EarthTrap: 2,
      AirTrap: 3,
      MalusTrap: 4,
      Summon: 5,
      Other: 6
    },
    SpellType: {
      TrickyTrap: 0,
      DriftTrap: 1,
      FragmentationTrap: 2,
      MassTrap: 3,
      LethalTrap: 4,
      MalevolentTrap: 5,
      RepellingTrap: 6,
      InsidiousTrap: 7,
      MiryTrap: 8,
      SickratTrap: 9,
      Calamity: 10,
      ParalysingTrap: 11,
      MassGrave: 12,
      Poutch: 13,
      Cawwot: 14,
      Chakra: 15
    }
  }

  getEnumValue = (variable) => {
    const splitted = variable.split(".");
    return enumValues[splitted[0]][splitted[1]];
  }

  const regex = /\$\{([^}]+)\}/g;
  const results = [...source.matchAll(regex)];
  let formatted = "";

  for (let i = 0; i < results.length; i++) {
    const varName = results[i][1];
    const continueAt = (i === 0 ? 0 : (results[i - 1].index + results[i - 1][0].length));
    const value = getEnumValue(varName);

    if (value === undefined) {
      throw Error(`Undefined value for key: ${varName}`);
    }

    formatted += source.slice(continueAt, results[i].index);
    formatted += getEnumValue(varName);
  }

  formatted += source.slice(results.length === 0 ? 0 : results[results.length - 1].index + results[results.length - 1][0].length, source.length);

  return formatted;
}