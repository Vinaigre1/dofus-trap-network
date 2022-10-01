let map = new Map();
let cellW = 68;
let cellH = 34;
let mapGraphics;
let img = [{
  name: 'Poutch Ingball',
  path: '/assets/img/poutch.png',
  load: function() { this.asset = loadImage(this.path); },
  asset: null,
  offsetX: 0,
  offsetY: 0
}];
map.placeTrap(new Trap(TRAP.TEST, map.getCell(271)));
// map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(299)));
// map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(314)));
// map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(300)));
// map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(287)));
// map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(273)));
// map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(271)));
// map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(272)));
map.placeEntity(new Entity(10000, map.getCell(258), TEAM.ATTACKER, img[0]));
map.placeEntity(new Entity(10000, map.getCell(285), TEAM.DEFENDER, img[0]));
map.placeEntity(new Entity(10000, map.getCell(257), TEAM.DEFENDER, img[0]));
map.placeEntity(new Entity(10000, map.getCell(286), TEAM.DEFENDER, img[0]));
// map.placeEntity(new Entity(10000, map.getCell(310), TEAM.DEFENDER, img[0]));
// map.placeEntity(new Entity(10000, map.getCell(256), TEAM.DEFENDER, img[0]));

function preload() {
  img.forEach(item => {
    item.load.call(item);
  });
}

function setup()
{
	createCanvas(1000, 700);
	frameRate(FRAMERATE);
  mapGraphics = createGraphics(1000, 700);
  createMap(mapGraphics);
}

function draw()
{
	colorMode(RGB);
  background('rgb(0, 0, 0)');
  image(mapGraphics, 0, 0);
  drawTraps();
  drawEntities();

  if (map.animCompletion >= 1) {
    map.animCompletion = 0;
    map.shouldTriggerStack = true;
  }
  if (map.shouldTriggerStack) {
    map.triggerStack();
    map.shouldTriggerStack = false;
  }
}

function createMap(graphics)
{
  for (let i = 0; i < map.width; i++) {
    for (let j = 0; j < map.height; j++) {
      drawCell(i, j, (j % 2 === 0 ? color(100, 100, 110) : color(130, 130, 140)), j * map.width + i, graphics);
    }
  }
}

function drawTraps()
{
  for (let i = 0; i < map.width; i++) {
    for (let j = 0; j < map.height; j++) {
      map.traps.forEach(trap => {
        if (trap.isInTrap(i, j)) {
          stroke(trap.trap.color.stroke);
          strokeWeight(4);
          drawCell(i, j, trap.trap.color.cell);
          strokeWeight(1);
          stroke(0);
        }
      });
    }
  }
}

function drawQuad(x, y, w, h, color, graphics)
{
  if (graphics) {
    graphics.fill(color);
    graphics.quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  } else {
    fill(color);
    quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  }

}

function drawCell(x, y, color, str, graphics)
{
  if (y % 2 === 0) {
    posX = x * cellW;
    posY = (y/2) * cellH;
  } else {
    posX = x * cellW + cellW/2;
    posY = (y/2) * cellH;
  }

  drawQuad(posX, posY, cellW, cellH, color, graphics);

  if (str !== undefined) {
    if (graphics) {
      graphics.fill(0);
      graphics.textAlign('center', 'center');
      graphics.noStroke();
      graphics.text(str, posX + cellW/2, posY + cellH/2);
      graphics.stroke(0);
    } else {
      fill(0);
      textAlign('center', 'center');
      noStroke();
      text(str, posX + cellW/2, posY + cellH/2);
      stroke(0);
    }
  }
}

function getEntityPos(x, y) {
  if (y % 2 === 0) {
    posX = x * cellW + cellW/2;
    posY = (y/2) * cellH + cellH/2;
  } else {
    posX = x * cellW + cellW;
    posY = (y/2) * cellH + cellH/2;
  }

  return { x: posX, y: posY };
}

function drawEntities()
{
  map.entities.forEach(entity => {
    let pos = getEntityPos(entity.cell.x, entity.cell.y);
    let nextPos;
    if (entity.nextCell) { // Should only have 1 entity.nextCell defined in the entire array
      nextPos = getEntityPos(entity.nextCell.x, entity.nextCell.y);
      pos.x = pos.x * (1 - map.animCompletion) + nextPos.x * map.animCompletion;
      pos.y = pos.y * (1 - map.animCompletion) + nextPos.y * map.animCompletion;
      map.animCompletion += map.animSpeed / FRAMERATE;
    }

    strokeWeight(4);
    stroke(entity.team.color.stroke);
    fill(entity.team.color.cell);
    ellipse(pos.x, pos.y, cellW * 0.7, cellH * 0.7);
    strokeWeight(1);

    let width = cellW;
    let height = width * (entity.image.asset.height / entity.image.asset.width);

    image(
      entity.image.asset,
      pos.x + entity.image.offsetX - width/2,
      pos.y + entity.image.offsetY - height,
      width,
      height
    );
  });
}
