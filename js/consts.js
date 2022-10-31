const CANVAS_W = 1380;
const CANVAS_H = 700;
const SIDEBAR_X = CANVAS_W * 0.75;
const CELL_W = 68;
const CELL_H = 34;
const FRAMERATE = 30;
const MAP_WIDTH = 14;
const MAP_HEIGHT = 40;
const SIDEBAR_WIDTH = 2;
const CELL = {
  WALKABLE: 0,
  LOS_WALL: 1,
  WALL: 2,
};
const EFFECT = {
  PULL: 0,
  PUSH: 1,
  DAMAGE: {
    WATER: 2,
    FIRE: 3,
    EARTH: 4,
    AIR: 5,
    PUSH: 6,
    INDIRECT_PUSH: 7
  },
  MP: 8,
  INSIDIOUS_GLYPH: 9,
  MIRY_HEAL: 10,
  MALEVOLENT_BOOST: 11
};
const AREA = {
  CELL: 0,
  CROSS: 1,
  CIRCLE: 2,
  DIAGONAL: 3,
  RING: 4,
  SQUARE: 5
};
const TRAP = {
  NONE:          { id: 0,  color: { stroke: 'rgb(  0,   0,   0)', cell: 'rgba(  0,   0,   0, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [] },
  TRICKY:        { id: 1,  color: { stroke: 'rgb(185,  18,  27)', cell: 'rgba(185,  18,  27, 0.3)' }, area: { type: AREA.CROSS,    size: 1 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.FIRE,      value: { min: 26, max: 28 }, area: { type: AREA.CROSS,    size: 1 } }, { type: EFFECT.PULL,         value: { min: 1,   max: 1 },   area: { type: AREA.CROSS,    size: 1 } }] },
  INSIDIOUS:     { id: 2,  color: { stroke: 'rgb(150, 255, 150)', cell: 'rgba(150, 255, 150, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.INSIDIOUS_GLYPH,  value: { min: 48, max: 52 }, area: { type: AREA.CIRCLE,   size: 3 } }] },
  MIRY:          { id: 3,  color: { stroke: 'rgb( 64, 131, 164)', cell: 'rgba( 64, 131, 164, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.WATER,     value: { min: 33, max: 37 }, area: { type: AREA.CELL,     size: 0 } }, { type: EFFECT.MIRY_HEAL,    value: { min: 0.5, max: 0.5 }, area: { type: AREA.CIRCLE,   size: 2 } }] },
  MASS:          { id: 4,  color: { stroke: 'rgb( 90,  52,  28)', cell: 'rgba( 90,  52,  28, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.EARTH,     value: { min: 34, max: 38 }, area: { type: AREA.CIRCLE,   size: 3 } }] },
  DRIFT:         { id: 5,  color: { stroke: 'rgb(185,  18,  27)', cell: 'rgba(185,  18,  27, 0.3)' }, area: { type: AREA.DIAGONAL, size: 1 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.FIRE,      value: { min: 17, max: 19 }, area: { type: AREA.DIAGONAL, size: 1 } }, { type: EFFECT.PUSH,         value: { min: 2,   max: 2 },   area: { type: AREA.DIAGONAL, size: 1 } }] },
  MALEVOLENT:    { id: 6,  color: { stroke: 'rgb( 90,  52,  28)', cell: 'rgba( 90,  52,  28, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.MALEVOLENT_BOOST, value: { min: 20, max: 20 }, area: { type: AREA.CIRCLE,   size: 2 } }, { type: EFFECT.DAMAGE.EARTH, value: { min: 28,  max: 32 },  area: { type: AREA.CELL,     size: 0 } }] },
  FRAGMENTATION: { id: 7,  color: { stroke: 'rgb(185,  18,  27)', cell: 'rgba(185,  18,  27, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: false, effects: [{ type: EFFECT.DAMAGE.FIRE,      value: { min: 13, max: 17 }, area: { type: AREA.CELL,     size: 0 } }, { type: EFFECT.DAMAGE.FIRE,  value: { min: 27,  max: 31 },  area: { type: AREA.RING,     size: 1 } }, { type: EFFECT.DAMAGE.FIRE, value: { min: 37, max: 41 }, area: { type: AREA.RING, size: 2 } }, { type: EFFECT.DAMAGE.FIRE, value: { min: 47, max: 51 }, area: { type: AREA.RING, size: 3 } }] },
  PARALYSING:    { id: 8,  color: { stroke: 'rgb( 49,  45, 134)', cell: 'rgba( 49,  45, 134, 0.3)' }, area: { type: AREA.CIRCLE,   size: 3 }, degressive: true,  effects: [{ type: EFFECT.MP,               value: { min: 4,  max: 4 },  area: { type: AREA.CIRCLE,   size: 3 } }] },
  REPELLING:     { id: 9,  color: { stroke: 'rgb(150, 255, 150)', cell: 'rgba(150, 255, 150, 0.3)' }, area: { type: AREA.CROSS,    size: 1 }, degressive: true,  effects: [{ type: EFFECT.PUSH,             value: { min: 2,  max: 2 },  area: { type: AREA.CROSS,    size: 1 } }, { type: EFFECT.DAMAGE.AIR,   value: { min: 12,  max: 12 },  area: { type: AREA.CROSS,    size: 1 } }] },
  SICKRAT:       { id: 10, color: { stroke: 'rgb( 64, 131, 164)', cell: 'rgba( 64, 131, 164, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.PULL,             value: { min: 3,  max: 3 },  area: { type: AREA.CROSS,    size: 3 } }, { type: EFFECT.DAMAGE.WATER, value: { min: 17,  max: 19 },  area: { type: AREA.CROSS,    size: 3 } }] },
  LETHAL:        { id: 11, color: { stroke: 'rgb( 90,  52,  28)', cell: 'rgba( 90,  52,  28, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.EARTH,     value: { min: 39, max: 43 }, area: { type: AREA.CELL,     size: 0 } }] },
  CALAMITY:      { id: 12, color: { stroke: 'rgb( 64, 131, 164)', cell: 'rgba( 64, 131, 164, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [{ type: EFFECT.DAMAGE.WATER,     value: { min: 33, max: 37 }, area: { type: AREA.SQUARE,   size: 1 } }] },
  MASS_GRAVE:    { id: 13, color: { stroke: 'rgb( 49,  45, 134)', cell: 'rgba( 49,  45, 134, 0.3)' }, area: { type: AREA.CELL,     size: 0 }, degressive: true,  effects: [] },
  TEST:          { id: 14, color: { stroke: 'rgb(255, 255, 255)', cell: 'rgba(255, 255, 255, 0.3)' }, area: { type: AREA.CROSS,    size: 1 }, degressive: true,  effects: [{ type: EFFECT.PUSH,      value: { min: 2,  max: 2 },  area: { type: AREA.CROSS,    size: 2 } }, { type: EFFECT.PULL,  value: { min: 2,   max: 2 },   area: { type: AREA.CROSS,    size: 1 } }] }
};
const TEAM = {
  ATTACKER: { id: 0, color: { stroke: 'rgb(192,   0,   0)', cell: 'rgba(192,   0,   0, 0.25)' } },
  DEFENDER: { id: 1, color: { stroke: 'rgb(  0,   0, 255)', cell: 'rgba(  0,   0, 255, 0.25)' } }
};
const DIRECTION = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2, 
  WEST: 3,
  NORTHEAST: 4,
  SOUTHEAST: 5,
  SOUTHWEST: 6,
  NORTHWEST: 7,
  NONE: 8
};
const SPELL = {
  TRAP: 0,
  ENTITY: 1,
  TRIGGER: 2,
  CHAKRA: 3,
  KILL: 4
};
const CELL_BORDER = { // Use with binary operators
  NORTH: 1,
  EAST: 2,
  SOUTH: 4,
  WEST: 8
};
const SUBLAYERS = {
  MAP: 0,
  TRAP: 1,
  TRAP_ICON: 2,
  UI: 3,
  ENTITY: 4
};
