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

function preload() {
  img.forEach(item => {
    item.load.call(item);
  });

  mapGraphics = createGraphics(1000, 700);
  loadMap(mapGraphics, 'solar');
}

function setup()
{
	createCanvas(1000, 700);
	frameRate(FRAMERATE);

  map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(258)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(299)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(314)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(300)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(287)));
  // map.placeTrap(new Trap(TRAP.TRICKY, map.getCell(273)));
  // map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(271)));
  // map.placeTrap(new Trap(TRAP.REPELLING, map.getCell(272)));
  map.placeEntity(new Entity(10000, map.getCell(243), TEAM.ATTACKER, img[0]));
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

function loadMap(graphics, mapID)
{
  mapData = loadJSON(`/assets/maps/${mapID}.json`, () => {
    map.initMap(mapData.Data[0].Cells);
    for (let i = 0; i < MAP_HEIGHT; i++) {
      for (let j = 0; j < MAP_WIDTH; j++) {
        switch (map.getCell(j, i).type) {
          case CELL.WALKABLE:
            drawCell(j, i, (i % 2 === 0 ? color('#8E8660') : color('#968E69')), color('#7E7961'), i * MAP_WIDTH + j, graphics);
            break;
          case CELL.LOS_WALL:
            drawCell(j, i, color(0), color(0), '', graphics);
            break;
          case CELL.WALL:
            drawWall(j, i, color('#58533C'), color('#B8B6B2'), '', graphics);
            break;
          default:
            break;
        }
      }
    }
  });
}

function drawTraps()
{
  for (let i = 0; i < MAP_WIDTH; i++) {
    for (let j = 0; j < MAP_HEIGHT; j++) {
      map.traps.forEach(trap => {
        if (trap.isInTrap(i, j)) {
          strokeWeight(4);
          drawCell(i, j, trap.trap.color.cell, trap.trap.color.stroke);
          strokeWeight(1);
        }
      });
    }
  }
}

function drawQuad(x, y, w, h, cellColor, strokeColor, graphics)
{
  if (graphics) {
    graphics.stroke(strokeColor);
    graphics.fill(cellColor);
    graphics.quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  } else {
    stroke(strokeColor);
    fill(cellColor);
    quad(x + w/2, y,
         x,       y + h/2,
         x + w/2, y + h,
         x + w,   y + h/2);
  }
}

function drawCell(x, y, cellColor, strokeColor, str, graphics)
{
  if (y % 2 === 0) {
    posX = x * cellW;
    posY = (y/2) * cellH;
  } else {
    posX = x * cellW + cellW/2;
    posY = (y/2) * cellH;
  }

  drawQuad(posX, posY, cellW, cellH, cellColor, strokeColor, graphics);

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

function drawWall(x, y, cellColor, strokeColor, str, graphics)
{
  if (y % 2 === 0) {
    posX = x * cellW;
    posY = (y/2) * cellH - cellH/2;
  } else {
    posX = x * cellW + cellW/2;
    posY = (y/2) * cellH - cellH/2;
  }

  drawQuad(posX, posY, cellW, cellH, cellColor, strokeColor, graphics);

  if (graphics) {
    graphics.quad(posX, posY + cellH/2, posX, posY + cellH, posX + cellW/2, posY + cellH*1.5, posX + cellW/2, posY + cellH);
    graphics.quad(posX + cellW/2, posY + cellH, posX + cellW/2, posY + cellH*1.5, posX + cellW, posY + cellH, posX + cellW, posY + cellH/2);
  } else {
    quad(posX, posY + cellH/2, posX, posY + cellH, posX + cellW/2, posY + cellH*1.5, posX + cellW/2, posY + cellH);
    quad(posX + cellW/2, posY + cellH, posX + cellW/2, posY + cellH*1.5, posX + cellW, posY + cellH, posX + cellW, posY + cellH/2);
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
