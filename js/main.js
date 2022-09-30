let map = new Map();
let cellW = 68;
let cellH = 34;
var runDraw = true;
let img = [{
  name: 'Poutch Ingball',
  path: '/assets/img/poutch.png',
  load: function() { this.asset = loadImage(this.path); },
  asset: null,
  offsetX: 0,
  offsetY: 0
}];
map.placeTrap(new Trap(TRAP.DRIFT, map.getCell(242)));
map.placeEntity(new Entity(10000, map.getCell(243), TEAM.ATTACKER, img[0]));
map.placeEntity(new Entity(10000, map.getCell(244), TEAM.DEFENDER, img[0]));
map.placeEntity(new Entity(10000, map.getCell(245), TEAM.DEFENDER, img[0]));
// map.placeEntity(new Entity(10000, map.getCell(296), TEAM.DEFENDER, img[0]));
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
}

function draw()
{
	colorMode(RGB);
  if (runDraw || map.animating) {
    runDraw = false;
    background('rgb(0, 0, 0)');
    drawMap();
    drawTraps();
    drawEntities();
    if (map.animCompletion >= 1) {
      // map.animating = false;
      map.animCompletion = 0;
      map.shouldTriggerStack = true;
    }
  }
  if (map.shouldTriggerStack) {
    map.triggerStack();
    map.shouldTriggerStack = false;
  }
}

function drawMap()
{
  for (let i = 0; i < map.width; i++) {
    for (let j = 0; j < map.height; j++) {
      drawCell(i, j, (j % 2 === 0 ? color(100, 100, 110) : color(130, 130, 140)), j * map.width + i);
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

function drawQuad(x, y, w, h, color)
{
  fill(color);

  quad(x + w/2, y,
       x,       y + h/2,
       x + w/2, y + h,
       x + w,   y + h/2);
}

function drawCell(x, y, color, str)
{
  if (y % 2 === 0) {
    posX = x * cellW;
    posY = (y/2) * cellH;
  } else {
    posX = x * cellW + cellW/2;
    posY = (y/2) * cellH;
  }

  drawQuad(posX, posY, cellW, cellH, color);

  if (str !== undefined) {
    fill(0);
    textAlign('center', 'center');
    noStroke();
    text(str, posX + cellW/2, posY + cellH/2);
    stroke(0);
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
