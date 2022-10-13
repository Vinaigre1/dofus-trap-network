let map = new Map(0, 0, CANVAS_W * 0.75, CANVAS_H, () => {});
let canvas = new Canvas();
let mapGraphics;
let sidebarGraphics;
let img = [
  { name: 'Poutch Ingball', path: '/assets/img/poutch.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Sournois', path: '/assets/img/65.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège d\'Immobilisation', path: '/assets/img/69.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Répulsif', path: '/assets/img/73.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Fangeux', path: '/assets/img/75.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Insidieux', path: '/assets/img/77.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège de Masse', path: '/assets/img/79.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Mortel', path: '/assets/img/80.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Funeste', path: '/assets/img/3627.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège de Dérive', path: '/assets/img/3634.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège Scélérat', path: '/assets/img/3638.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Piège à Fragmentation', path: '/assets/img/3641.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Concentration de Chakra', path: '/assets/img/62.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Invocation Cawotte', path: '/assets/img/367.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Sort', path: '/assets/img/spellSlot.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Invocation Poutch', path: '/assets/img/3733.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Déclencher', path: '/assets/img/2778.png', asset: null, offsetX: 0, offsetY: 0 },
  { name: 'Cawotte', path: '/assets/img/Cawotte.png', asset: null, offsetX: 2, offsetY: 10 }
];
let spellData = [
  { name: 'Piège Sournois', icon: img[1], type: SPELL.TRAP, effect: TRAP.TRICKY },
  { name: 'Piège de Dérive', icon: img[9], type: SPELL.TRAP, effect: TRAP.DRIFT },
  { name: 'Piège à Fragmentation', icon: img[11], type: SPELL.TRAP, effect: TRAP.FRAGMENTATION },
  { name: 'Piège de Masse', icon: img[6], type: SPELL.TRAP, effect: TRAP.MASS },
  { name: 'Piège Mortel', icon: img[7], type: SPELL.TRAP, effect: TRAP.LETHAL },
  { name: 'Piège Funeste', icon: img[8], type: SPELL.TRAP, effect: TRAP.MALEVOLENT },
  { name: 'Piège Répulsif', icon: img[3], type: SPELL.TRAP, effect: TRAP.REPELLING },
  { name: 'Piège Insidieux', icon: img[5], type: SPELL.TRAP, effect: TRAP.INSIDIOUS },
  { name: 'Piège Fangeux', icon: img[4], type: SPELL.TRAP, effect: TRAP.MIRY },
  { name: 'Piège Scélérat', icon: img[10], type: SPELL.TRAP, effect: TRAP.SICKRAT },
  { name: 'Piège d\'Immobilisation', icon: img[2], type: SPELL.TRAP, effect: TRAP.PARALYSING },
  { name: 'Cawotte', icon: img[13], type: SPELL.ENTITY, effect: { hp: 660, image: img[17] } },
  { name: 'Poutch', icon: img[15], type: SPELL.ENTITY, effect: { hp: 50000, image: img[0] } },
  { name: 'Déclencher', icon: img[16], type: SPELL.ACTION, effect: null }
];

function preload() {
  img.forEach(item => {
    item.asset = loadImage(item.path);
  });

  mapGraphics = createGraphics(CANVAS_W * 0.75, CANVAS_H);
  loadMap(mapGraphics, 'solar');
}

function setup()
{
	createCanvas(CANVAS_W, CANVAS_H);
	frameRate(FRAMERATE);

  sidebarGraphics = createGraphics(CANVAS_W * 0.25, CANVAS_H);
  loadSidebar(sidebarGraphics, spellData);

  // map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(258)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(286)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(314)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(300)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(287)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(273)));
  // map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(271)));
  // map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(272)));
  // map.placeEntity(new Entity(10000, map.getCell(243), TEAM.ATTACKER, img[0]));
  // map.placeEntity(new Entity(10000, map.getCell(258), TEAM.DEFENDER, img[0]));
  // map.placeEntity(new Entity(10000, map.getCell(244), TEAM.DEFENDER, img[0]));
  // map.placeEntity(new Entity(10000, map.getCell(231), TEAM.DEFENDER, img[0]));
  // map.placeEntity(new Entity(10000, map.getCell(310), TEAM.DEFENDER, img[0]));
  // map.placeEntity(new Entity(10000, map.getCell(256), TEAM.DEFENDER, img[0]));
}

function draw()
{
	colorMode(RGB);
  background('rgb(0, 0, 0)');
  image(mapGraphics, 0, 0);
  image(sidebarGraphics, CANVAS_W * 0.75, 0);
  drawTraps();
  drawEntities();
  drawSelectedSpell();

  if (map.animCompletion >= 1) {
    map.animCompletion = 0;
    map.shouldTriggerStack = true;
  }
  if (map.shouldTriggerStack) {
    map.triggerStack();
    map.shouldTriggerStack = false;
  }
}
