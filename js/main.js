let map = new Map(0, 0, CANVAS_W * 0.75, CANVAS_H, () => {});
let canvas = new Canvas();
let mapGraphics;
let sidebarGraphics;
let img = [
  { name: 'Poutch Ingball', path: './assets/img/entities/Poutch.png', asset: null, offsetX: -4, offsetY: 9, scale: 1.43 },
  { name: 'Piège Sournois', path: './assets/img/spells/65.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège d\'Immobilisation', path: './assets/img/spells/69.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Répulsif', path: './assets/img/spells/73.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Fangeux', path: './assets/img/spells/75.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Insidieux', path: './assets/img/spells/77.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège de Masse', path: './assets/img/spells/79.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Mortel', path: './assets/img/spells/80.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Funeste', path: './assets/img/spells/3627.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège de Dérive', path: './assets/img/spells/3634.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Scélérat', path: './assets/img/spells/3638.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège à Fragmentation', path: './assets/img/spells/3641.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Concentration de Chakra', path: './assets/img/spells/62.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Invocation Cawotte', path: './assets/img/spells/367.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Sort', path: './assets/img/spells/spellSlot.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Invocation Poutch', path: './assets/img/spells/3733.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Déclencher', path: './assets/img/spells/2778.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Cawotte', path: './assets/img/entities/Cawotte.png', asset: null, offsetX: 2, offsetY: 14, scale: 1.5 },
  { name: 'Piège Insidieux Sol', path: './assets/img/traps/144.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Doom', path: './assets/img/spells/415.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Sournois Sol', path: './assets/img/traps/139.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Dérive Sol', path: './assets/img/traps/4631.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Fragmentation Sol', path: './assets/img/traps/4629.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Masse Sol', path: './assets/img/traps/140.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Mortel Sol', path: './assets/img/traps/145.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Funeste Sol', path: './assets/img/traps/4644.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Insidieux Sol', path: './assets/img/traps/143.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Fosse Commune', path: './assets/img/spells/4038.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Calamité', path: './assets/img/spells/3622.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Fangeux Sol', path: './assets/img/traps/4867.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège Scélérat Sol', path: './assets/img/traps/4613.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Calamité Sol', path: './assets/img/traps/4647.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Piège d\'Immobilisation Sol', path: './assets/img/traps/142.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 },
  { name: 'Fosse Commune', path: './assets/img/traps/4635.png', asset: null, offsetX: 0, offsetY: 0, scale: 1 }
];
let spellData = [
  { name: 'Piège Sournois', icon: img[1], type: SPELL.TRAP, effects: { trap: { ...TRAP.TRICKY, image: img[20] } } },
  { name: 'Piège de Dérive', icon: img[9], type: SPELL.TRAP, effects: { trap: { ...TRAP.DRIFT, image: img[21] } } },
  { name: 'Piège à Fragmentation', icon: img[11], type: SPELL.TRAP, effects: { trap: { ...TRAP.FRAGMENTATION, image: img[22] } } },
  { name: 'Piège de Masse', icon: img[6], type: SPELL.TRAP, effects: { trap: { ...TRAP.MASS, image: img[23] } } },
  { name: 'Piège Mortel', icon: img[7], type: SPELL.TRAP, effects: { trap: { ...TRAP.LETHAL, image: img[24] } } },
  { name: 'Piège Funeste', icon: img[8], type: SPELL.TRAP, effects: { trap: { ...TRAP.MALEVOLENT, image: img[25] } } },
  { name: 'Piège Répulsif', icon: img[3], type: SPELL.TRAP, effects: { trap: { ...TRAP.REPELLING, image: img[18] } } },
  { name: 'Piège Insidieux', icon: img[5], type: SPELL.TRAP, effects: { trap: { ...TRAP.INSIDIOUS, image: img[26] } } },
  { name: 'Piège Fangeux', icon: img[4], type: SPELL.TRAP, effects: { trap: { ...TRAP.MIRY, image: img[29] } } },
  { name: 'Piège Scélérat', icon: img[10], type: SPELL.TRAP, effects: { trap: { ...TRAP.SICKRAT, image: img[30] } } },
  { name: 'Calamité', icon: img[28], type: SPELL.TRAP, effects: { trap: { ...TRAP.CALAMITY, image: img[31] } } },
  { name: 'Piège d\'Immobilisation', icon: img[2], type: SPELL.TRAP, effects: { trap: { ...TRAP.PARALYSING, image: img[32] } } },
  { name: 'Fosse Commune', icon: img[27], type: SPELL.TRAP, effects: { trap: { ...TRAP.MASS_GRAVE, image: img[33] } } },
  { name: 'Cawotte', icon: img[13], type: SPELL.ENTITY, effects: { hp: 660, image: img[17], movable: false } },
  { name: 'Poutch', icon: img[15], type: SPELL.ENTITY, effects: { hp: 50000, image: img[0], movable: true } },
  { name: 'Concentration de Chakra', icon: img[12], type: SPELL.CHAKRA, effects: null },
  { name: 'Doom', icon: img[19], type: SPELL.KILL, effects: null },
  { name: 'Déclencher', icon: img[16], type: SPELL.TRIGGER, effects: null }
];

function preload() {
  img.forEach(item => {
    item.asset = loadImage(item.path);
  });
}

function setup()
{
	createCanvas(CANVAS_W, CANVAS_H);
	frameRate(FRAMERATE);

  map.loadMapGraphics(CANVAS_W * 0.75, CANVAS_H, 'empty');

  sidebarGraphics = createGraphics(CANVAS_W * 0.25, CANVAS_H);
  loadSidebar(sidebarGraphics, spellData);

  canvas.addElement(sidebarGraphics, 0, 0, CANVAS_W * 0.75, 0, CANVAS_W * 0.25, CANVAS_H);
}

function draw()
{
	colorMode(RGB);
  background('rgb(0, 0, 0)');
  if (map.animating)
    animateEntities();
  canvas.drawElements();
  drawSpellShadow();
  drawSelectedSpell();

  drawActionStack();

  if (map.animCompletion >= 1) {
    map.animCompletion = 0;
    map.shouldTriggerStack = true;
  }
  if (map.shouldTriggerStack) {
    map.triggerStack();
    map.shouldTriggerStack = false;
  }
}
